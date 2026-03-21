import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  sanitizeHtml,
  validateEmail,
  validatePolishPhone,
  generateOrderNumber,
  getFromEmail,
  hasCustomDomain,
  getOwnerEmail,
  isTestMode,
  validateOrderData,
  validateResendConfig,
} from "@/lib/email-utils";

interface OrderItem {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  size?: string;
  quantity: number;
}

interface OrderData {
  name: string;
  email: string;
  phone?: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  totalPrice: number;
  deliveryMethod?: string;
  deliveryPrice?: number;
  finalTotal?: number;
}

export async function POST(request: Request) {
  try {
    // Validate configuration
    const configError = validateResendConfig();
    if (configError) {
      console.error(configError);
      return NextResponse.json(
        { error: "Konfiguracja serwera jest niepełna. Skontaktuj się z administratorem." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const data: OrderData = await request.json();

    // Validate order data
    const validationError = validateOrderData(data);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    const { name, email, phone, address, notes, items, totalPrice, deliveryMethod, deliveryPrice, finalTotal } = data;

    const orderNumber = generateOrderNumber();
    
    // Sanitize all user inputs for HTML email content
    const safeName = sanitizeHtml(name);
    const safeEmail = sanitizeHtml(email);
    const safePhone = phone ? sanitizeHtml(phone) : "";
    const safeAddress = sanitizeHtml(address);
    const safeNotes = notes ? sanitizeHtml(notes) : "";
    const safeDeliveryMethod = deliveryMethod ? sanitizeHtml(deliveryMethod) : "Nie wybrano";

    // Generate items HTML for both emails
    const itemsHtml = items
      .map(
        (item) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0ede5; font-size: 14px; color: #3d3a36;">
          ${sanitizeHtml(item.title)}${item.size ? ` <span style="color: #8b8178;">(rozm. ${sanitizeHtml(item.size)})</span>` : ""}
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0ede5; text-align: center; font-size: 14px; color: #3d3a36;">
          ${item.quantity}
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0ede5; text-align: right; font-size: 14px; color: #3d3a36;">
          ${sanitizeHtml(item.price)}
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0ede5; text-align: right; font-size: 14px; color: #2c2825; font-weight: 500;">
          ${(item.priceValue * item.quantity).toFixed(0)} zł
        </td>
      </tr>`
      )
      .join("");

    // Get owner email - in test mode this may be overridden by RESEND_TEST_EMAIL
    const ownerEmail = getOwnerEmail();
    
    // Email configuration - use custom domain if available, otherwise use Resend's test domain
    // NOTE: With onboarding@resend.dev, emails can only be sent to the verified owner email
    // To send to customers, you need to verify your own domain in Resend
    const fromEmail = getFromEmail();
    const customDomainConfigured = hasCustomDomain();
    const testMode = isTestMode();

    // 1. Send order notification to shop owner (Ladebebemini)
    const { error: ownerEmailError } = await resend.emails.send({
      from: fromEmail,
      to: [ownerEmail],
      replyTo: email,
      subject: `[La de Bébé mini] Nowe zamówienie #${orderNumber} od ${safeName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: Georgia, 'Times New Roman', serif; background-color: #faf8f5;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <tr>
                <td style="background-color: #ffffff; padding: 48px; border: 1px solid #e8e4de;">
                  <!-- Header -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="text-align: center; padding-bottom: 32px; border-bottom: 1px solid #e8e4de;">
                        <h1 style="margin: 0; font-size: 28px; font-weight: 300; color: #2c2825; letter-spacing: 0.05em;">
                          La de Bébé mini
                        </h1>
                        <p style="margin: 8px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #8b8178;">
                          Nowe zamówienie z koszyka
                        </p>
                        <p style="margin: 12px 0 0; font-size: 13px; letter-spacing: 0.1em; color: #8b7355;">
                          Nr zamówienia: <strong>${orderNumber}</strong>
                        </p>
                      </td>
                    </tr>
                  </table>

                  <!-- Customer info -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 32px;">
                    <tr>
                      <td>
                        <p style="margin: 0 0 16px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #8b8178;">
                          Dane klienta
                        </p>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #faf8f5; padding: 20px;">
                          <tr>
                            <td style="padding: 4px 0; font-size: 14px; color: #5c574f; width: 120px;">Imię i nazwisko</td>
                            <td style="padding: 4px 0; font-size: 14px; color: #2c2825;">${safeName}</td>
                          </tr>
                          <tr>
                            <td style="padding: 4px 0; font-size: 14px; color: #5c574f;">Email</td>
                            <td style="padding: 4px 0; font-size: 14px; color: #2c2825;">
                              <a href="mailto:${safeEmail}" style="color: #8b7355; text-decoration: none;">${safeEmail}</a>
                            </td>
                          </tr>
                          ${safePhone ? `<tr>
                            <td style="padding: 4px 0; font-size: 14px; color: #5c574f;">Telefon</td>
                            <td style="padding: 4px 0; font-size: 14px; color: #2c2825;">${safePhone}</td>
                          </tr>` : ""}
                          <tr>
                            <td style="padding: 4px 0; font-size: 14px; color: #5c574f;">Adres</td>
                            <td style="padding: 4px 0; font-size: 14px; color: #2c2825;">${safeAddress}</td>
                          </tr>
                          ${safeNotes ? `<tr>
                            <td style="padding: 4px 0; font-size: 14px; color: #5c574f;">Uwagi</td>
                            <td style="padding: 4px 0; font-size: 14px; color: #2c2825;">${safeNotes}</td>
                          </tr>` : ""}
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Delivery method -->
                  ${safeDeliveryMethod !== "Nie wybrano" ? `
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 24px;">
                    <tr>
                      <td>
                        <p style="margin: 0 0 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #8b8178;">
                          Metoda dostawy
                        </p>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f0ede5; padding: 16px;">
                          <tr>
                            <td style="font-size: 15px; color: #2c2825; font-weight: 500;">${safeDeliveryMethod}</td>
                            <td style="text-align: right; font-size: 15px; color: #2c2825;">
                              ${deliveryPrice === 0 ? '<span style="color: #16a34a;">Bezpłatnie</span>' : `${deliveryPrice?.toFixed(2)} zł`}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  ` : ""}

                  <!-- Products -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 32px;">
                    <tr>
                      <td>
                        <p style="margin: 0 0 16px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #8b8178;">
                          Zamówione produkty
                        </p>
                        <table width="100%" cellspacing="0" cellpadding="0">
                          <thead>
                            <tr style="border-bottom: 1px solid #e8e4de;">
                              <th style="text-align: left; padding-bottom: 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8b8178; font-weight: 400;">Produkt</th>
                              <th style="text-align: center; padding-bottom: 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8b8178; font-weight: 400;">Ilość</th>
                              <th style="text-align: right; padding-bottom: 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8b8178; font-weight: 400;">Cena</th>
                              <th style="text-align: right; padding-bottom: 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8b8178; font-weight: 400;">Razem</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${itemsHtml}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Total -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 16px; border-top: 2px solid #2c2825;">
                    ${deliveryPrice !== undefined && deliveryPrice > 0 ? `
                    <tr>
                      <td style="padding-top: 12px; text-align: right;">
                        <span style="font-size: 12px; color: #8b8178; margin-right: 16px;">Produkty</span>
                        <span style="font-size: 14px; color: #5c574f;">${totalPrice.toFixed(0)} zł</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 4px; text-align: right;">
                        <span style="font-size: 12px; color: #8b8178; margin-right: 16px;">Dostawa</span>
                        <span style="font-size: 14px; color: #5c574f;">${deliveryPrice.toFixed(2)} zł</span>
                      </td>
                    </tr>
                    ` : ""}
                    <tr>
                      <td style="padding-top: 12px; text-align: right;">
                        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #8b8178; margin-right: 16px;">
                          Do zapłaty
                        </span>
                        <span style="font-size: 22px; font-weight: 300; color: #2c2825;">
                          ${(finalTotal ?? totalPrice).toFixed(2)} zł
                        </span>
                      </td>
                    </tr>
                  </table>

                  <!-- Footer -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e8e4de;">
                    <tr>
                      <td style="text-align: center;">
                        <p style="margin: 0; font-size: 12px; color: #8b8178;">
                          Odpowiedz na ten email, aby skontaktować się z klientem i potwierdzić zamówienie.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (ownerEmailError) {
      console.error("Resend owner email error:", ownerEmailError);
      return NextResponse.json(
        { error: "Nie udało się wysłać zamówienia do sklepu. Spróbuj ponownie." },
        { status: 500 }
      );
    }

    // 2. Send confirmation email to buyer
    // Always try to send confirmation to customer
    let buyerEmailSent = false;
    let buyerEmailError = null;

    try {
      const buyerResult = await resend.emails.send({
        from: fromEmail,
        to: [email],
        replyTo: ownerEmail,
        subject: `[La de Bébé mini] Potwierdzenie zamówienia #${orderNumber}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: Georgia, 'Times New Roman', serif; background-color: #faf8f5;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <tr>
                  <td style="background-color: #ffffff; padding: 48px; border: 1px solid #e8e4de;">
                    <!-- Header -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="text-align: center; padding-bottom: 32px; border-bottom: 1px solid #e8e4de;">
                          <h1 style="margin: 0; font-size: 28px; font-weight: 300; color: #2c2825; letter-spacing: 0.05em;">
                            La de Bébé mini
                          </h1>
                          <p style="margin: 8px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #8b8178;">
                            Potwierdzenie zamówienia
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Thank you message -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 32px;">
                      <tr>
                        <td style="text-align: center;">
                          <p style="margin: 0; font-size: 18px; color: #2c2825; line-height: 1.6;">
                            Dziękujemy za zamówienie, <strong>${safeName}</strong>!
                          </p>
                          <p style="margin: 16px 0 0; font-size: 14px; color: #5c574f; line-height: 1.6;">
                            Twoje zamówienie zostało przyjęte i wkrótce się z Tobą skontaktujemy w celu potwierdzenia szczegółów.
                          </p>
                          <p style="margin: 24px 0 0; padding: 16px 24px; background: #f0ede5; display: inline-block;">
                            <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8b8178;">Numer zamówienia</span><br>
                            <span style="font-size: 20px; font-weight: 500; color: #2c2825; letter-spacing: 0.05em;">${orderNumber}</span>
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Order details -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 32px;">
                      <tr>
                        <td>
                          <p style="margin: 0 0 16px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #8b8178;">
                            Szczegóły zamówienia
                          </p>
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #faf8f5; padding: 20px;">
                            <tr>
                              <td style="padding: 4px 0; font-size: 14px; color: #5c574f; width: 120px;">Adres dostawy</td>
                              <td style="padding: 4px 0; font-size: 14px; color: #2c2825;">${safeAddress}</td>
                            </tr>
                            ${safeDeliveryMethod !== "Nie wybrano" ? `<tr>
                              <td style="padding: 4px 0; font-size: 14px; color: #5c574f;">Metoda dostawy</td>
                              <td style="padding: 4px 0; font-size: 14px; color: #2c2825;">${safeDeliveryMethod}</td>
                            </tr>` : ""}
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Products -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 32px;">
                      <tr>
                        <td>
                          <p style="margin: 0 0 16px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #8b8178;">
                            Zamówione produkty
                          </p>
                          <table width="100%" cellspacing="0" cellpadding="0">
                            <thead>
                              <tr style="border-bottom: 1px solid #e8e4de;">
                                <th style="text-align: left; padding-bottom: 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8b8178; font-weight: 400;">Produkt</th>
                                <th style="text-align: center; padding-bottom: 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8b8178; font-weight: 400;">Ilość</th>
                                <th style="text-align: right; padding-bottom: 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8b8178; font-weight: 400;">Cena</th>
                                <th style="text-align: right; padding-bottom: 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8b8178; font-weight: 400;">Razem</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${itemsHtml}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Total -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 16px; border-top: 2px solid #2c2825;">
                      ${deliveryPrice !== undefined && deliveryPrice > 0 ? `
                      <tr>
                        <td style="padding-top: 12px; text-align: right;">
                          <span style="font-size: 12px; color: #8b8178; margin-right: 16px;">Produkty</span>
                          <span style="font-size: 14px; color: #5c574f;">${totalPrice.toFixed(0)} zł</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 4px; text-align: right;">
                          <span style="font-size: 12px; color: #8b8178; margin-right: 16px;">Dostawa</span>
                          <span style="font-size: 14px; color: #5c574f;">${deliveryPrice.toFixed(2)} zł</span>
                        </td>
                      </tr>
                      ` : ""}
                      <tr>
                        <td style="padding-top: 12px; text-align: right;">
                          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #8b8178; margin-right: 16px;">
                            Do zapłaty
                          </span>
                          <span style="font-size: 22px; font-weight: 300; color: #2c2825;">
                            ${(finalTotal ?? totalPrice).toFixed(2)} zł
                          </span>
                        </td>
                      </tr>
                    </table>

                    <!-- Payment info -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 32px; background: #faf8f5; padding: 24px;">
                      <tr>
                        <td style="text-align: center;">
                          <p style="margin: 0 0 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #8b8178;">
                            Co dalej?
                          </p>
                          <p style="margin: 0; font-size: 14px; color: #3d3a36; line-height: 1.6;">
                            Skontaktujemy się z Tobą wkrótce w celu potwierdzenia zamówienia i ustalenia szczegółów płatności oraz dostawy.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Footer -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e8e4de;">
                      <tr>
                        <td style="text-align: center;">
                          <p style="margin: 0; font-size: 12px; color: #8b8178;">
                            Masz pytania? Odpowiedz na ten email lub skontaktuj się z nami przez formularz na stronie.
                          </p>
                          <p style="margin: 16px 0 0; font-size: 12px; color: #8b8178;">
                            Z serdecznymi pozdrowieniami,<br>
                            <strong style="color: #2c2825;">La de Bébé mini</strong>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      });

      if (buyerResult.error) {
        console.error("Resend buyer email error:", buyerResult.error);
        buyerEmailError = buyerResult.error;
      } else {
        buyerEmailSent = true;
      }
    } catch (buyerError) {
      console.error("Error sending buyer confirmation:", buyerError);
      buyerEmailError = buyerError;
    }

    return NextResponse.json({ 
      success: true, 
      orderNumber, 
      message: "Zamówienie zostało złożone",
      buyerEmailSent,
      ...(buyerEmailError && { buyerEmailWarning: "Nie udało się wysłać potwierdzenia do kupującego" })
    });
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json({ error: "Wystąpił błąd serwera" }, { status: 500 });
  }
}
