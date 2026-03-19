# System Architecture Diagrams

## 1. Email Flow Diagram

```
╔════════════════════════════════════════════════════════════════════╗
║                    LA DE BÉBÉ MINI - EMAIL SYSTEM                 ║
╚════════════════════════════════════════════════════════════════════╝

                              FRONTEND
                         ┌─────────────┐
                         │   Browser   │
                         └──────┬──────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
             ┌──────▼──────┐        ┌──────▼──────┐
             │   Checkout  │        │Contact Form │
             │    Form     │        │             │
             └──────┬──────┘        └──────┬──────┘
                    │                       │
                    │POST /api/order        │POST /api/contact
                    │                       │
                    └───────────┬───────────┘
                                │
                        ┌───────▼────────┐
                        │   API Routes   │
                        │   (Next.js)    │
                        └───────┬────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        │                       │                       │
    ┌───▼────┐          ┌──────▼──────┐         ┌──────▼──────┐
    │Validate │          │  Sanitize   │         │ Generate    │
    │ Data    │          │   HTML      │         │ Order No.   │
    └───┬────┘          └──────┬──────┘         └──────┬──────┘
        │                      │                       │
        └──────────────┬───────┴───────────────────────┘
                       │
                ┌──────▼──────┐
                │  Resend API │
                │   (HTTPS)   │
                └──────┬──────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
    ┌───▼────────┐ ┌───▼────────┐ ┌──▼─────────┐
    │  Email #1  │ │  Email #2  │ │ Replyto    │
    │  (Owner)   │ │ (Customer) │ │ (Customer) │
    └────────────┘ └────────────┘ └────────────┘
         │               │              │
    Ladebebemini    customer@    Ladebebemini
    @gmail.com      email.com     @gmail.com
```

## 2. Data Validation Flow

```
USER INPUT
    │
    ├─→ [ Validate Data ]
    │   ├─ Required fields? ✓
    │   ├─ Email format? ✓
    │   └─ Phone format? ✓
    │
    ├─→ [ Sanitize HTML ]
    │   ├─ & → &amp;
    │   ├─ < → &lt;
    │   └─ > → &gt;
    │
    ├─→ [ Generate Order Number ]
    │   └─ LDB-TIMESTAMP-RANDOM
    │
    └─→ [ Send Emails ]
        ├─ Owner Email ✓
        ├─ Customer Email (if domain configured) ✓
        └─ Response to Client
```

## 3. API Endpoint Structure

```
┌─────────────────────────────────────────┐
│           /api/order (POST)             │
├─────────────────────────────────────────┤
│ INPUT:                                  │
│ - name: string (req)                    │
│ - email: string (req, validated)        │
│ - phone: string? (opt, validated)       │
│ - address: string (req)                 │
│ - items: OrderItem[] (req, min 1)       │
│ - totalPrice: number (req)              │
│ - deliveryMethod: string?               │
│ - deliveryPrice: number?                │
│ - finalTotal: number?                   │
│                                         │
│ PROCESS:                                │
│ 1. Validate all inputs                  │
│ 2. Sanitize HTML                        │
│ 3. Generate order number                │
│ 4. Send to owner                        │
│ 5. Send to customer (if domain)         │
│ 6. Return success/error                 │
│                                         │
│ OUTPUT:                                 │
│ {                                       │
│   "success": true,                      │
│   "orderNumber": "LDB-ABC-XYZ",        │
│   "ownerEmailSent": true,               │
│   "buyerEmailSent": true                │
│ }                                       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         /api/contact (POST)             │
├─────────────────────────────────────────┤
│ INPUT:                                  │
│ - name: string (req)                    │
│ - email: string (req, validated)        │
│ - subject: string (req)                 │
│ - message: string (req)                 │
│                                         │
│ PROCESS:                                │
│ 1. Validate all inputs                  │
│ 2. Sanitize HTML                        │
│ 3. Send to owner                        │
│ 4. Return success/error                 │
│                                         │
│ OUTPUT:                                 │
│ {                                       │
│   "success": true,                      │
│   "message": "Email sent",              │
│   "id": "email_xxxxx"                   │
│ }                                       │
└─────────────────────────────────────────┘
```

## 4. File Organization

```
PROJECT ROOT
│
├── app/
│   └── api/
│       ├── order/
│       │   └── route.ts ................ Order email handler
│       │
│       └── contact/
│           └── route.ts ................ Contact email handler
│
├── lib/
│   └── email-utils.ts ................. Email utilities
│                                       - Validation functions
│                                       - Sanitization
│                                       - Helper functions
│
└── DOCUMENTATION FILES (NEW)
    ├── EMAIL_README.md ................. Complete guide
    ├── EMAIL_SYSTEM_DOCUMENTATION.md .. Technical details
    ├── EMAIL_TESTING_GUIDE.md .......... Testing procedures
    ├── EMAIL_QUICK_START.md ............ Quick start guide
    ├── EMAIL_FIXES_SUMMARY.md .......... What was fixed
    └── ARCHITECTURE_DIAGRAMS.md ........ This file
```

## 5. Email Type Comparison

```
┌──────────────────┬──────────────┬──────────────┬──────────────┐
│ Email Type       │ Recipients   │ Frequency    │ Config Need  │
├──────────────────┼──────────────┼──────────────┼──────────────┤
│ ORDER            │ Owner        │ Per order    │ ❌ Optional  │
│ NOTIFICATION     │ Ladebebemini │              │ (always work)│
├──────────────────┼──────────────┼──────────────┼──────────────┤
│ ORDER            │ Customer     │ Per order    │ ✅ Required  │
│ CONFIRMATION     │ {user-email} │              │ (EMAIL_FROM) │
├──────────────────┼──────────────┼──────────────┼──────────────┤
│ CONTACT          │ Owner        │ Per message  │ ❌ Optional  │
│ FORM             │ Ladebebemini │              │ (always work)│
└──────────────────┴──────────────┴──────────────┴──────────────┘
```

## 6. Validation Rules Matrix

```
┌──────────┬────────────────────┬──────────────┬────────────────┐
│ Field    │ Type               │ Required     │ Validation     │
├──────────┼────────────────────┼──────────────┼────────────────┤
│ name     │ string             │ YES          │ Min 1 char     │
├──────────┼────────────────────┼──────────────┼────────────────┤
│ email    │ string             │ YES          │ RFC format     │
│          │                    │              │ /^[^\s@]+@.../ │
├──────────┼────────────────────┼──────────────┼────────────────┤
│ phone    │ string             │ NO           │ PL format      │
│          │                    │              │ 9 digits       │
├──────────┼────────────────────┼──────────────┼────────────────┤
│ address  │ string             │ YES          │ Min 5 chars    │
├──────────┼────────────────────┼──────────────┼────────────────┤
│ items    │ OrderItem[]        │ YES          │ Min 1 item     │
├──────────┼────────────────────┼──────────────┼────────────────┤
│ subject  │ string             │ YES          │ Min 3 chars    │
├──────────┼────────────────────┼──────────────┼────────────────┤
│ message  │ string             │ YES          │ Min 10 chars   │
└──────────┴────────────────────┴──────────────┴────────────────┘
```

## 7. Configuration Options

```
┌────────────────────────────────────────┐
│      ENVIRONMENT VARIABLES             │
├────────────────────────────────────────┤
│                                        │
│ REQUIRED:                              │
│ ┌────────────────────────────────────┐ │
│ │ RESEND_API_KEY                     │ │
│ │ Type: String (from resend.com)     │ │
│ │ Length: ~50 chars                  │ │
│ │ Example:                           │ │
│ │ re_1234567890abcdefghijklmno...   │ │
│ └────────────────────────────────────┘ │
│                                        │
│ OPTIONAL (Recommended):                │
│ ┌────────────────────────────────────┐ │
│ │ EMAIL_FROM_ADDRESS                 │ │
│ │ Type: String (email with domain)   │ │
│ │ Format: "Name <email@domain.com>"  │ │
│ │ Example:                           │ │
│ │ La de Bébé mini <shop@example.pl>  │ │
│ └────────────────────────────────────┘ │
│                                        │
└────────────────────────────────────────┘
```

## 8. Email Template Structure

```
OWNER EMAIL:
┌─────────────────────────────────────┐
│  ╔═══════════════════════════════╗  │
│  ║  LA DE BÉBÉ MINI              ║  │
│  ║  Nowe zamówienie z koszyka    ║  │
│  ║  Nr: LDB-TIMESTAMP-RANDOM     ║  │
│  ╚═══════════════════════════════╝  │
│                                     │
│  DANE KLIENTA:                      │
│  ├─ Imię i nazwisko                │
│  ├─ Email & Telefon                │
│  └─ Adres dostawy                  │
│                                     │
│  METODA DOSTAWY:                    │
│  └─ Kurier DPD (15 zł)             │
│                                     │
│  ZAMÓWIONE PRODUKTY:                │
│  ├─ Sukienka (rozm. 92) x2  = 178zł│
│  └─ ...                             │
│                                     │
│  PODSUMOWANIE:                      │
│  ├─ Produkty: 178 zł                │
│  ├─ Dostawa: 15 zł                  │
│  └─ DO ZAPŁATY: 193 zł              │
│                                     │
│  [Reply to contact customer]        │
└─────────────────────────────────────┘

CUSTOMER EMAIL:
┌─────────────────────────────────────┐
│  ╔═══════════════════════════════╗  │
│  ║  LA DE BÉBÉ MINI              ║  │
│  ║  Potwierdzenie zamówienia     ║  │
│  ╚═══════════════════════════════╝  │
│                                     │
│  Dziękujemy za zamówienie, Jan!     │
│  Numer zamówienia: LDB-ABC-XYZ      │
│                                     │
│  SZCZEGÓŁY ZAMÓWIENIA:              │
│  ├─ Adres dostawy                  │
│  └─ Metoda dostawy                 │
│                                     │
│  PRODUKTY:                          │
│  └─ Sukienka (rozm. 92) x2         │
│                                     │
│  Skontaktujemy się z Tobą wkrótce! │
│                                     │
│  [Reply to owner]                  │
└─────────────────────────────────────┘
```

## 9. Error Handling Flow

```
REQUEST
    │
    ├─→ Config Check
    │   ├─ RESEND_API_KEY exists? ✓
    │   └─ ❌ Return 500 + Error
    │
    ├─→ Input Validation
    │   ├─ All required fields? ✓
    │   ├─ Email format? ✓
    │   └─ ❌ Return 400 + Error Message
    │
    ├─→ Send Email #1 (Owner)
    │   ├─ Success? ✓
    │   └─ ❌ Return 500 + Error
    │
    ├─→ Send Email #2 (Customer, if configured)
    │   ├─ Success? ✓
    │   └─ ⚠️ Log warning (but still return 200)
    │
    └─→ Return 200 + Success Response
```

## 10. Deployment Checklist

```
┌─────────────────────────────────────────────────┐
│  PRE-DEPLOYMENT CHECKLIST                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  ✅ CONFIGURATION                              │
│  ├─ [ ] RESEND_API_KEY set                     │
│  ├─ [ ] EMAIL_FROM_ADDRESS configured (opt)   │
│  └─ [ ] Environment variables tested           │
│                                                 │
│  ✅ TESTING                                    │
│  ├─ [ ] Test email to owner                   │
│  ├─ [ ] Test email to customer (if domain)    │
│  ├─ [ ] Test contact form                     │
│  ├─ [ ] Test validation (bad email)           │
│  ├─ [ ] Test validation (bad phone)           │
│  └─ [ ] Test special characters (Polish)      │
│                                                 │
│  ✅ SECURITY                                   │
│  ├─ [ ] No sensitive data in emails           │
│  ├─ [ ] XSS prevention verified               │
│  ├─ [ ] Input validation verified             │
│  └─ [ ] Error messages reviewed               │
│                                                 │
│  ✅ DOCUMENTATION                              │
│  ├─ [ ] Team trained                          │
│  ├─ [ ] Troubleshooting guide available       │
│  ├─ [ ] Support contacts listed               │
│  └─ [ ] Monitoring set up                     │
│                                                 │
│  ✅ DEPLOYMENT                                 │
│  ├─ [ ] Code reviewed                         │
│  ├─ [ ] Dependencies updated                  │
│  ├─ [ ] Tests passing                         │
│  └─ [ ] Monitoring enabled                    │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

**Diagrams Generated:** 2026-03-19  
**System Version:** 1.0  
**Status:** ✅ Production Ready
