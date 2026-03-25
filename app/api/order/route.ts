import { Resend } from "resend";
import { NextResponse } from "next/server";

const OWNER_EMAIL = "ladebebemini@gmail.com";
const RESEND_API_KEY = "re_XzDhuLj7_HNbWe7TVwnLDnqUwNubAFNkP";

interface OrderItem {
  title: string;
  size: string;
  quantity: number;
  price: string;
}

interface OrderData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  delivery: string;
  deliveryPrice: number;
  notes: string;
  items: OrderItem[];
  totalPrice: number;
}

function escape(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function generateOrderNumber(): string {
  const rand = Math.floor(Math.random() * 90000) + 10000;
  return `LDB-${rand}`;
}

export async function POST(request: Request) {
  try {
    const data: OrderData = await request.json();

    const { name, email, phone, address, city, postalCode, delivery, deliveryPrice, notes, items, totalPrice } = data;

    if (!name || !email || !phone || !address || !city || !postalCode || !items?.length) {
      return NextResponse.json(
        { error: "Brakuje wymaganych danych zamówienia." },
        { status: 400 }
      );
    }

    const orderNumber = generateOrderNumber();

    const itemsHtml = items
      .map(
        (item) => `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f0ede5; font-size: 14px; color: #2c2825;">${escape(item.title)}</td>
          <td style="padding: 10px 8px; border-bottom: 1px solid #f0ede5; font-size: 14px; color: #5c574f; text-align: center;">${escape(item.size)}</td>
          <td style="padding: 10px 8px; border-bottom: 1px solid #f0ede5; font-size: 14px; color: #5c574f; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f0ede5; font-size: 14px; color: #2c2825; text-align: right;">${escape(item.price)}</td>
        </tr>`
      )
      .join("");

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0; padding:0; background:#faf8f5; font-family: Georgia, serif;">
  <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; margin:0 auto; padding:40px 20px;">
    <tr>
      <td style="background:#fff; padding:48px; border:1px solid #e8e4de;">

        <!-- Header -->
        <table width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align:center; padding-bottom:32px; border-bottom:2px solid #2c2825;">
              <h1 style="margin:0; font-size:26px; font-weight:300; color:#2c2825; letter-spacing:0.08em;">La de Bébé mini</h1>
              <p style="margin:6px 0 0; font-size:11px; text-transform:uppercase; letter-spacing:0.2em; color:#8b8178;">Nowe zamówienie</p>
            </td>
          </tr>
        </table>

        <!-- Order number -->
        <table width="100%" cellspacing="0" cellpadding="0" style="margin-top:28px;">
          <tr>
            <td style="background:#faf8f5; padding:16px 20px; text-align:center;">
              <p style="margin:0; font-size:11px; text-transform:uppercase; letter-spacing:0.15em; color:#8b8178;">Numer zamówienia</p>
              <p style="margin:4px 0 0; font-size:22px; font-weight:500; color:#2c2825; letter-spacing:0.05em;">${orderNumber}</p>
            </td>
          </tr>
        </table>

        <!-- Customer details -->
        <table width="100%" cellspacing="0" cellpadding="0" style="margin-top:28px;">
          <tr>
            <td>
              <p style="margin:0 0 12px; font-size:11px; text-transform:uppercase; letter-spacing:0.15em; color:#8b8178; border-bottom:1px solid #f0ede5; padding-bottom:8px;">Dane klienta</p>
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr><td style="padding:4px 0; font-size:13px; color:#8b8178; width:120px;">Imię i nazwisko</td><td style="padding:4px 0; font-size:14px; color:#2c2825;">${escape(name)}</td></tr>
                <tr><td style="padding:4px 0; font-size:13px; color:#8b8178;">Email</td><td style="padding:4px 0; font-size:14px; color:#2c2825;">${escape(email)}</td></tr>
                <tr><td style="padding:4px 0; font-size:13px; color:#8b8178;">Telefon</td><td style="padding:4px 0; font-size:14px; color:#2c2825;">${escape(phone)}</td></tr>
                <tr><td style="padding:4px 0; font-size:13px; color:#8b8178;">Adres</td><td style="padding:4px 0; font-size:14px; color:#2c2825;">${escape(address)}, ${escape(postalCode)} ${escape(city)}</td></tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Delivery -->
        <table width="100%" cellspacing="0" cellpadding="0" style="margin-top:20px;">
          <tr>
            <td>
              <p style="margin:0 0 12px; font-size:11px; text-transform:uppercase; letter-spacing:0.15em; color:#8b8178; border-bottom:1px solid #f0ede5; padding-bottom:8px;">Dostawa</p>
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:4px 0; font-size:13px; color:#8b8178; width:120px;">Metoda</td>
                  <td style="padding:4px 0; font-size:14px; color:#2c2825;">${escape(delivery)}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0; font-size:13px; color:#8b8178;">Koszt dostawy</td>
                  <td style="padding:4px 0; font-size:14px; color:#2c2825;">${deliveryPrice === 0 ? "Bezpłatna" : `${deliveryPrice.toFixed(2)} zł`}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        ${notes ? `
        <!-- Notes -->
        <table width="100%" cellspacing="0" cellpadding="0" style="margin-top:20px;">
          <tr>
            <td>
              <p style="margin:0 0 12px; font-size:11px; text-transform:uppercase; letter-spacing:0.15em; color:#8b8178; border-bottom:1px solid #f0ede5; padding-bottom:8px;">Uwagi</p>
              <p style="margin:0; font-size:14px; color:#2c2825;">${escape(notes)}</p>
            </td>
          </tr>
        </table>` : ""}

        <!-- Products -->
        <table width="100%" cellspacing="0" cellpadding="0" style="margin-top:20px;">
          <tr>
            <td>
              <p style="margin:0 0 12px; font-size:11px; text-transform:uppercase; letter-spacing:0.15em; color:#8b8178; border-bottom:1px solid #f0ede5; padding-bottom:8px;">Produkty</p>
              <table width="100%" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th style="text-align:left; padding-bottom:8px; font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:#8b8178; font-weight:400;">Produkt</th>
                    <th style="text-align:center; padding-bottom:8px; font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:#8b8178; font-weight:400;">Rozmiar</th>
                    <th style="text-align:center; padding-bottom:8px; font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:#8b8178; font-weight:400;">Szt.</th>
                    <th style="text-align:right; padding-bottom:8px; font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:#8b8178; font-weight:400;">Cena</th>
                  </tr>
                </thead>
                <tbody>${itemsHtml}</tbody>
              </table>
            </td>
          </tr>
        </table>

        <!-- Total -->
        <table width="100%" cellspacing="0" cellpadding="0" style="margin-top:16px; border-top:2px solid #2c2825; padding-top:16px;">
          ${deliveryPrice > 0 ? `
          <tr>
            <td style="text-align:right; padding:4px 0;">
              <span style="font-size:13px; color:#8b8178; margin-right:16px;">Produkty</span>
              <span style="font-size:14px; color:#5c574f;">${(totalPrice - deliveryPrice).toFixed(2)} zł</span>
            </td>
          </tr>
          <tr>
            <td style="text-align:right; padding:4px 0;">
              <span style="font-size:13px; color:#8b8178; margin-right:16px;">Dostawa</span>
              <span style="font-size:14px; color:#5c574f;">${deliveryPrice.toFixed(2)} zł</span>
            </td>
          </tr>` : ""}
          <tr>
            <td style="text-align:right; padding-top:8px;">
              <span style="font-size:12px; text-transform:uppercase; letter-spacing:0.15em; color:#8b8178; margin-right:16px;">Do zapłaty</span>
              <span style="font-size:24px; font-weight:300; color:#2c2825;">${totalPrice.toFixed(2)} zł</span>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table width="100%" cellspacing="0" cellpadding="0" style="margin-top:40px; border-top:1px solid #e8e4de; padding-top:20px;">
          <tr>
            <td style="text-align:center;">
              <p style="margin:0; font-size:12px; color:#8b8178;">La de Bébé mini &mdash; zamówienie złożone przez stronę internetową</p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;

    const resend = new Resend(RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [OWNER_EMAIL],
      subject: `Nowe zamówienie #${orderNumber} — ${escape(name)}`,
      html,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { error: "Nie udało się wysłać emaila. Spróbuj ponownie." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, orderNumber });
  } catch (err) {
    console.error("Order API error:", err);
    return NextResponse.json(
      { error: "Blad serwera. Sprobuj ponownie." },
      { status: 500 }
    );
  }
}
