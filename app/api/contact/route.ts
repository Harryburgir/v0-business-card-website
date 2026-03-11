import { NextResponse } from "next/server";

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

    // Check if RESEND_API_KEY is available for sending emails
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || "hello@studionordica.pl";

    if (resendApiKey) {
      // Send email using Resend API
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Studio Nordica <onboarding@resend.dev>",
          to: recipientEmail,
          reply_to: email,
          subject: `[Kontakt] ${subject}`,
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #3d5a45; margin-bottom: 24px;">Nowa wiadomość ze strony</h2>
              
              <div style="background: #f7f5f2; padding: 24px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0;"><strong>Od:</strong> ${name}</p>
                <p style="margin: 0 0 8px 0;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 0;"><strong>Temat:</strong> ${subject}</p>
              </div>
              
              <div style="padding: 24px; border-left: 3px solid #3d5a45;">
                <h3 style="color: #666; margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em;">Wiadomość:</h3>
                <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;">
              
              <p style="color: #999; font-size: 12px;">
                Ta wiadomość została wysłana przez formularz kontaktowy na stronie Studio Nordica.
              </p>
            </div>
          `,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json();
        console.error("Resend API error:", errorData);
        return NextResponse.json(
          { error: "Nie udało się wysłać wiadomości" },
          { status: 500 }
        );
      }

      return NextResponse.json({ 
        success: true, 
        message: "Wiadomość została wysłana" 
      });
    }

    // Fallback: Log the message (for development/testing)
    console.log("=== NOWA WIADOMOŚĆ KONTAKTOWA ===");
    console.log(`Od: ${name} (${email})`);
    console.log(`Temat: ${subject}`);
    console.log(`Wiadomość: ${message}`);
    console.log("================================");

    // In production without Resend, you could:
    // 1. Save to database
    // 2. Use another email service
    // 3. Send webhook notification

    return NextResponse.json({ 
      success: true, 
      message: "Wiadomość została odebrana (tryb deweloperski - ustaw RESEND_API_KEY aby wysyłać maile)" 
    });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera" },
      { status: 500 }
    );
  }
}
