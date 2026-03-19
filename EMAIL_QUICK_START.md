# Email System - Quick Reference

## 🚀 Getting Started (5 Minut)

### Krok 1: Dodaj API Key
```
Ustawienia (⚙️) → Vars → Dodaj
RESEND_API_KEY = [Twój klucz z resend.com]
```

### Krok 2: Testuj
```
1. Przejdź do koszyka
2. Dodaj produkt
3. Złóż zamówienie
4. Sprawdź Ladebebemini@gmail.com
```

### Krok 3: (Opcjonalnie) Włącz Potwierdzenia
```
1. Zweryfikuj domenę w resend.com
2. Dodaj rekordy DNS
3. W Vars dodaj:
   EMAIL_FROM_ADDRESS = La de Bébé mini <kontakt@twojadomena.pl>
```

---

## 📧 Email Types

| Typ | Do Kogo | Kiedy | Wymaga Domeny |
|-----|---------|-------|---------------|
| **Zamówienie** | Ladebebemini@gmail.com | Po wysłaniu koszyka | ❌ Nie |
| **Potwierdzenie** | Klient | Po wysłaniu koszyka | ✅ Tak |
| **Kontakt** | Ladebebemini@gmail.com | Po wysłaniu formuł. | ❌ Nie |

---

## 🔧 API Endpoints

### POST /api/order
```json
{
  "name": "Jan Kowalski",
  "email": "jan@example.com",
  "phone": "+48 123 456 789",
  "address": "ul. Główna 1, 00-001 Warszawa",
  "items": [{ "id": "1", "title": "Sukienka", "price": "89 zł", "priceValue": 89, "quantity": 2 }],
  "totalPrice": 178,
  "deliveryMethod": "Kurier",
  "deliveryPrice": 15,
  "finalTotal": 193
}
```

### POST /api/contact
```json
{
  "name": "Maria",
  "email": "maria@example.com",
  "subject": "Pytanie o dostępność",
  "message": "Czy dostępny jest rozmiar 74?"
}
```

---

## ✅ Walidacja

| Pole | Reguła | Przykład |
|------|--------|---------|
| Email | RFC format | `john@example.com` ✅ |
| Telefon | 9 cyfr | `123456789` ✅ |
| Imię | Nie puste | Min. 1 znak ✅ |
| Adres | Nie puste | Ulica, numer, kod ✅ |

---

## 🛡️ Bezpieczeństwo

- ✅ XSS Prevention (HTML sanitization)
- ✅ Email validation
- ✅ Phone validation
- ✅ Input validation
- ✅ Type safety (TypeScript)

---

## 🐛 Troubleshooting

| Problem | Rozwiązanie |
|---------|------------|
| "Konfiguracja niepełna" | Dodaj RESEND_API_KEY |
| Brak emaila do klienta | Skonfiguruj EMAIL_FROM_ADDRESS |
| Email w spamie | Weryfikuj domenę w Resend |
| Email nie wysłany | Sprawdź limit API (100/dzień) |

---

## 📱 Polskie Formaty

**Telefon:**
- ✅ +48 123 456 789
- ✅ +48123456789
- ✅ 123 456 789
- ✅ 123456789

**Znaki specjalne:**
- ✅ ą ć ę ł ń ó ś ź ż

---

## 📊 Limity

- API Free: 100 emaili/dzień
- Rate: 100 requests/min
- Timeout: 30s

---

## 📚 Full Documentation

- 📖 `EMAIL_SYSTEM_DOCUMENTATION.md` - Pełna dokumentacja
- 🧪 `EMAIL_TESTING_GUIDE.md` - Przewodnik testowania
- 📋 `EMAIL_FIXES_SUMMARY.md` - Co zostało naprawione
- 🔧 `lib/email-utils.ts` - Kod utilitów

---

## 🎯 Files Changed

```
✅ app/api/order/route.ts        - Potwierdzenia dla klientów
✅ app/api/contact/route.ts      - Sanityzacja
✨ lib/email-utils.ts           - Nowe utilities
📖 EMAIL_SYSTEM_DOCUMENTATION.md - Nowa dokumentacja
🧪 EMAIL_TESTING_GUIDE.md       - Nowy guide
📋 EMAIL_FIXES_SUMMARY.md       - Podsumowanie
```

---

## 💡 Tips

1. **Testuj zawsze** na `Ladebebemini@gmail.com` najpierw
2. **Czekaj 24-48h** po weryfikacji domeny
3. **Sprawdzaj spam** jeśli email nie przychodzi
4. **Monitoruj logi** w konsoli serwera
5. **Backupuj** emaile ważnych zamówień

---

## 🚨 Emergency

Jeśli nic nie działa:
1. Sprawdź RESEND_API_KEY
2. Sprawdź logi konsoli (F12)
3. Czekaj 5 minut
4. Odśwież stronę
5. Kontaktuj Resend support

---

**Status:** ✅ Production Ready  
**Data:** 2026-03-19  
**Tester:** v0 System
