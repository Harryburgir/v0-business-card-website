"use strict";

export function sanitizeHtml(html: string): string {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateContactData(data: any): string | null {
  if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
    return "Imię jest wymagane";
  }
  
  if (!data.email || typeof data.email !== "string" || !validateEmail(data.email)) {
    return "Prawidłowy email jest wymagany";
  }
  
  if (!data.subject || typeof data.subject !== "string" || data.subject.trim().length === 0) {
    return "Temat jest wymagany";
  }
  
  if (!data.message || typeof data.message !== "string" || data.message.trim().length === 0) {
    return "Wiadomość jest wymagana";
  }
  
  return null;
}

export function getFromEmail(): string {
  return "onboarding@resend.dev";
}

export function getOwnerEmail(): string {
  return "ladebebemini@gmail.com";
}

export function validateResendConfig(): string | null {
  if (!process.env.RESEND_API_KEY) {
    return "RESEND_API_KEY is not configured";
  }
  return null;
}
