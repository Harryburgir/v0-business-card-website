/**
 * Utilities for secure email handling
 * Includes sanitization, validation, and email formatting
 */

/**
 * Sanitize HTML to prevent XSS attacks in email content
 * Converts special characters to HTML entities
 */
export function sanitizeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Validate email format using regex
 * Accepts most common email formats
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Polish phone number format
 * Accepts: +48XXXXXXXXX or XXXXXXXXX (9 digits)
 * Also accepts formats with spaces, dashes, and parentheses
 */
export function validatePolishPhone(phone: string): boolean {
  const phoneClean = phone.replace(/[\s\-\(\)]/g, "");
  const phoneRegex = /^(\+48)?[0-9]{9}$/;
  return phoneRegex.test(phoneClean);
}

/**
 * Generate unique order number
 * Format: LDB-TIMESTAMP-RANDOM
 * Example: LDB-ABCDEFG-XYZ1
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LDB-${timestamp}-${random}`;
}

/**
 * Get email address for sending from
 * Falls back to test domain if custom domain not configured
 * Note: Name cannot contain special characters like accents (é, ń, etc.)
 */
export function getFromEmail(): string {
  // Use custom domain if set, otherwise use simple Resend test email
  if (process.env.EMAIL_FROM_ADDRESS) {
    return process.env.EMAIL_FROM_ADDRESS;
  }
  // Simple format without display name to avoid encoding issues
  return "onboarding@resend.dev";
}

/**
 * Check if custom domain is configured
 * Needed for sending to arbitrary customer emails
 */
export function hasCustomDomain(): boolean {
  return !!process.env.EMAIL_FROM_ADDRESS;
}

/**
 * Validate required order fields
 * Returns error message if validation fails
 */
export function validateOrderData(data: any): string | null {
  if (!data.name) return "Imię i nazwisko jest wymagane";
  if (!data.email) return "Email jest wymagany";
  if (!data.address) return "Adres dostawy jest wymagany";
  if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
    return "Zamówienie musi zawierać co najmniej jeden produkt";
  }
  
  if (!validateEmail(data.email)) {
    return "Nieprawidłowy format email";
  }
  
  if (data.phone && !validatePolishPhone(data.phone)) {
    return "Nieprawidłowy format numeru telefonu";
  }
  
  return null;
}

/**
 * Validate required contact form fields
 * Returns error message if validation fails
 */
export function validateContactData(data: any): string | null {
  if (!data.name) return "Imię i nazwisko jest wymagane";
  if (!data.email) return "Email jest wymagany";
  if (!data.subject) return "Temat jest wymagany";
  if (!data.message) return "Wiadomość jest wymagana";
  
  if (!validateEmail(data.email)) {
    return "Nieprawidłowy format email";
  }
  
  return null;
}

/**
 * Format currency for display in emails
 * Converts number to Polish zloty format
 */
export function formatCurrency(value: number): string {
  return `${value.toFixed(2)} zł`;
}

/**
 * Format phone number for display
 * Input: +48123456789 or 123456789
 * Output: +48 123 456 789 or 123 456 789
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  
  if (cleaned.startsWith("+48")) {
    return cleaned.replace(/(\+48)(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4");
  }
  
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
}

/**
 * Validate Resend API key is configured
 * Returns error message if missing
 */
export function validateResendConfig(): string | null {
  if (!process.env.RESEND_API_KEY) {
    return "RESEND_API_KEY is not configured in environment variables";
  }
  return null;
}
