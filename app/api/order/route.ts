import { Resend } from "resend";
import { NextResponse } from "next/server";
import { escapeHtml, generateOrderNumber, isValidEmail } from "@/lib/email-utils";

// Your email address - where orders will be sent
const OWNER_EMAIL = "Ladebebemini@gmail.com";

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
    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Konfiguracja serwera jest niepełna." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const data: OrderData = await request.json();

    // Basic validation
    if (!data.name || !data.email || !data.address || !data.items?.length) {
      return NextResponse.json(
        { error: "Wypełnij wszystkie wymagane pola." },
        { status: 400 }
      );
    }

    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { error: "Nieprawidłowy format email." },
        { status: 400 }
      );
    }

    const orderNumber = generateOrderNumber();
    
    // Sanitize inputs
    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safePhone = data.phone ? escapeHtml(data.phone) : "";
    const safeAddress = escapeHtml(data.address);
    const safeNotes = data.notes ? escapeHtml(data.notes) : "";
    const safeDeliveryMethod = data.deliveryMethod ? escapeHtml(data.deliveryMethod) : "Nie wybrano";

    // Generate items HTML
    const itemsHtml = data.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0ede5; font-size: 14px; color: #3d3a36;">
          ${escapeHtml(item.title)}${item.size ? ` <span style="color: #8b8178;">(rozm. ${escapeHtml(item.size)})</span>` : ""}
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0ede5; text-align: center; font-size: 14px; color: #3d3a36;">
          ${item.quantity}
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0ede5; text-align: right; font-size: 14px; color: #3d3a36;">
          ${escapeHtml(item.price)}
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0ede5; text-align: right; font-size: 14px; color: #2c2825; font-weight: 500;">
          ${(item.priceValue * item.quantity).toFixed(0)} zł
        </td>
      </tr>`
      )
      .join("");

    const deliveryPrice = data.deliveryPrice ?? 0;
    const finalTotal = data.finalTotal ?? data.totalPrice;

    // Send email to shop owner
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: OWNER_EMAIL,
      replyTo: data.email,
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
                          Nowe zamówienie
                        </p>
                        <p style="margin: 12px 0 0; font-size: 13px; letter-spacing: 0.1em; color: #8b7355;">
                          Nr: <strong>${orderNumber}</strong>
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
                              <a href="mailto:${safeEmail}" style="color: #8b7355;">${safeEmail}</a>
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
                          Dostawa
                        </p>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f0ede5; padding: 16px;">
                          <tr>
                            <td style="font-size: 15px; color: #2c2825; font-weight: 500;">${safeDeliveryMethod}</td>
                            <td style="text-align: right; font-size: 15px; color: #2c2825;">
                              ${deliveryPrice === 0 ? '<span style="color: #16a34a;">Bezpłatnie</span>' : `${deliveryPrice.toFixed(2)} zł`}
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
                    ${deliveryPrice > 0 ? `
                    <tr>
                      <td style="padding-top: 12px; text-align: right;">
                        <span style="font-size: 12px; color: #8b8178; margin-right: 16px;">Produkty</span>
                        <span style="font-size: 14px; color: #5c574f;">${data.totalPrice.toFixed(0)} zł</span>
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
                          ${finalTotal.toFixed(2)} zł
                        </span>
                      </td>
                    </tr>
                  </table>

                  <!-- Footer -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e8e4de;">
                    <tr>
                      <td style="text-align: center;">
                        <p style="margin: 0; font-size: 12px; color: #8b8178;">
                          Odpowiedz na ten email, aby skontaktować się z klientem.
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

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Nie udało się wysłać zamówienia. Spróbuj ponownie." },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      orderNumber, 
      message: "Zamówienie zostało złożone",
    });
  } catch (err) {
    console.error("Order API error:", err);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera." },
      { status: 500 }
    );
  }
}
