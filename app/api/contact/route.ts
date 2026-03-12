import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();
    const { name, email, subject, message } = data;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Wszystkie pola są wymagane" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Nieprawidłowy format email" },
        { status: 400 }
      );
    }

    // Send email via Resend
    const { data: emailData, error } = await resend.emails.send({
      from: "La de Bébé mini <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      replyTo: email,
      subject: `[La de Bébé mini] ${subject}`,
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
                          Nowe zapytanie z formularza
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Content -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 32px;">
                    <tr>
                      <td>
                        <p style="margin: 0 0 24px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #8b8178;">
                          Od
                        </p>
                        <p style="margin: 0 0 8px; font-size: 18px; color: #2c2825;">
                          ${name}
                        </p>
                        <p style="margin: 0 0 32px; font-size: 14px; color: #5c574f;">
                          <a href="mailto:${email}" style="color: #8b7355; text-decoration: none;">${email}</a>
                        </p>
                        
                        <p style="margin: 0 0 24px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #8b8178;">
                          Temat
                        </p>
                        <p style="margin: 0 0 32px; font-size: 16px; color: #2c2825;">
                          ${subject}
                        </p>
                        
                        <p style="margin: 0 0 24px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #8b8178;">
                          Wiadomość
                        </p>
                        <div style="padding: 24px; background-color: #faf8f5; border-left: 3px solid #d4c4b0;">
                          <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #3d3a36; white-space: pre-wrap;">${message}</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Footer -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e8e4de;">
                    <tr>
                      <td style="text-align: center;">
                        <p style="margin: 0; font-size: 12px; color: #8b8178;">
                          Odpowiedz bezpośrednio na ten email, aby skontaktować się z ${name}
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
        { error: "Nie udało się wysłać wiadomości" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Wiadomość została wysłana",
      id: emailData?.id 
    });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera" },
      { status: 500 }
    );
  }
}
