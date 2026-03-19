# Email System - Checklist i Przewodnik Testowania

## Pre-Launch Checklist

### 1. Konfiguracja Resend ✓
- [ ] Załóż konto na [resend.com](https://resend.com)
- [ ] Skopiuj klucz API
- [ ] Dodaj `RESEND_API_KEY` do zmiennych projektu (Ustawienia → Vars)

### 2. Konfiguracja Domeny (Opcjonalne, ale Zalecane)
- [ ] Zweryfikuj domenę w panelu Resend
- [ ] Dodaj rekordy DNS (SPF, DKIM)
- [ ] Czekaj na propagację DNS (24-48h)
- [ ] Ustaw `EMAIL_FROM_ADDRESS` w zmiennych projektu

Przykład: `La de Bébé mini <kontakt@twojadomena.pl>`

### 3. Kodowanie
- [ ] Wszystkie emaile zawierają UTF-8 encoding (`<meta charset="utf-8">`)
- [ ] Polskie znaki specjalne (ą, ć, ę, ł, ń, ó, ś, ź, ż) są obsługiwane
- [ ] HTML emaili jest semantycznie poprawny

### 4. Bezpieczeństwo
- [ ] Dane użytkownika są sanityzowane (XSS prevention)
- [ ] Email jest walidowany regex
- [ ] Telefon jest walidowany pod kątem formatu polskiego
- [ ] Wszystkie pola obowiązkowe są sprawdzane

---

## Instrukcje Testowania

### Test 1: Email do Właściciela (Zawsze Działa)

**Cel:** Sprawdzić, czy powiadomienie o zamówieniu trafia do Ladebebemini@gmail.com

**Kroki:**
1. Otwórz aplikację
2. Dodaj produkt do koszyka
3. Kliknij „Przejdź do kasy"
4. Wypełnij formularz:
   - Imię i nazwisko: `Jan Testowy`
   - Email: `test@example.com`
   - Telefon: `+48 123 456 789`
   - Adres: `ul. Testowa 1, 00-001 Warszawa`
5. Wybierz metodę dostawy
6. Kliknij „Złóż zamówienie"
7. **Sprawdzenie:** Przejdź do `Ladebebemini@gmail.com`, powinien być email z powiadomieniem

**Czego Szukać:**
- Numer zamówienia (np. LDB-ABCDEFG-XYZ1)
- Dane klienta
- Lista produktów z cenami
- Całkowita kwota

---

### Test 2: Potwierdzenie dla Klienta (Wymaga Konfiguracji)

**Wymagania:**
- `EMAIL_FROM_ADDRESS` musi być ustawione
- Domena musi być zweryfikowana w Resend

**Kroki:**
1. Powtórz Test 1
2. **Sprawdzenie:** Przejdź do skrzynki odbiorczej `test@example.com`
3. Powinien być email potwierdzający zamówienie

**Czego Szukać:**
- "Dziękujemy za zamówienie"
- Numer zamówienia
- Szczegóły dostawy
- Lista produktów
- Informacja o kontakcie

---

### Test 3: Formularz Kontaktowy

**Kroki:**
1. Otwórz formularz kontaktowy na stronie
2. Wypełnij:
   - Imię i nazwisko: `Maria Kowalska`
   - Email: `maria@example.com`
   - Temat: `Pytanie o dostępność`
   - Wiadomość: `Czy dostępny jest rozmiar 74?`
3. Kliknij „Wyślij"
4. **Sprawdzenie:** Przejdź do `Ladebebemini@gmail.com`

**Czego Szukać:**
- Dane kontaktowe (imię, email)
- Temat
- Pełna wiadomość
- Możliwość odpowiedzi kliknięciem "Reply"

---

### Test 4: Walidacja Danych

**Test 4a: Pusty Email**
- Wypełnij formularz bez podania emailu
- Kliknij „Wyślij"
- Powinien być błąd: "Email jest wymagany" lub "Nieprawidłowy format email"

**Test 4b: Zły Format Emailu**
- Wprowadź: `notanemail`
- Powinien być błąd: "Nieprawidłowy format email"

**Test 4c: Zły Format Telefonu**
- Wprowadź: `123`
- Powinien być błąd: "Nieprawidłowy format numeru telefonu"

**Test 4d: Prawidłowy Format Telefonu**
- Zaakceptowane: `+48 123 456 789`, `123456789`, `+48123456789`
- Każdy powinien przejść walidację

---

## Troubleshooting

### Problem: "Konfiguracja serwera jest niepełna"

**Przyczyna:** Brak `RESEND_API_KEY`

**Rozwiązanie:**
1. Kliknij ustawienia (prawy górny róg)
2. Przejdź do sekcji "Vars"
3. Dodaj `RESEND_API_KEY` z https://resend.com/api-keys
4. Odśwież stronę

---

### Problem: Email nie trafia do klienta

**Przyczyna:** Brak konfiguracji domeny

**Rozwiązanie:**
1. Zarejestruj domenę w Resend
2. Dodaj SPF i DKIM records do DNS
3. Czekaj 24-48h
4. Dodaj `EMAIL_FROM_ADDRESS` w zmiennych projektu

**Jeśli i tak nie działa:**
- Sprawdź folder "Spam" w skrzynce klienta
- Upewnij się, że email w formularzu jest poprawny
- Sprawdź logi błędów w konsoli serwera

---

### Problem: Email trafia do spamu

**Przyczyna:** Niezweryfikowana domena lub brakujące rekordy SPF/DKIM

**Rozwiązanie:**
1. W panelu Resend zweryfikuj domę
2. Dodaj wszystkie rekordy DNS podane przez Resend
3. Czekaj na propagację
4. Testuj ponownie po 24h

**Czekaj 24-48 godzin** na pełną propagację rekordów DNS!

---

### Problem: "Nie udało się wysłać zamówienia do sklepu"

**Przyczyna:** Błąd API Resend lub serwera

**Co sprawdzić:**
1. Czy `RESEND_API_KEY` jest poprawny?
2. Czy nie przekroczyłem limitu API? (100 emaili/dzień na planie bezpłatnym)
3. Czy serwer Resend działa? (https://status.resend.com)
4. Sprawdź logi błędów w konsoli

---

### Problem: Polskie znaki wyświetlają się źle

**Przyczyna:** Brak UTF-8 encoding

**Rozwiązanie:** To jest już obsługiwane w kodzie. Jeśli problem persystuje:
1. Sprawdzić charset w nagłówkach HTTP
2. Sprawdzić, czy przeglądarki wysyłają UTF-8

---

## Monitorowanie

### Co Monitorować w Produkcji

1. **Liczba wysłanych emaili**
   - Codziennie sprawdzaj limit API (100/dzień na planie bezpłatnym)

2. **Błędy wysyłki**
   - Monitoruj logi serwera pod kątem błędów wysyłania

3. **Bounce Rate**
   - Jeśli dużo emaili wraca, sprawdź poprawność adresów

4. **Spam Rate**
   - Jeśli emaile trafiają do spamu, sprawdź rekordy DNS

---

## Metryki i KPIs

| Metrika | Cel | Działanie |
|---------|-----|----------|
| Dostarczalność | >98% | Monitoruj bounce'y |
| Czas wysyłki | <5s | Normalnie 1-2s |
| Spam rate | <5% | Weryfikuj domenę |
| Open rate | >30% | Monitoruj zaangażowanie |

---

## Escalation

Jeśli problem nie zniknie po wykonaniu kroków troubleshootingowych:

1. **Skontaktuj się z Resend Support:** https://support.resend.com
2. **Zbierz informacje:**
   - Email ID
   - Timestamp
   - Treść błędu
   - Warunki reprodukcji

---

## Changelog

| Data | Wersja | Zmiany |
|------|--------|--------|
| 2026-03-19 | 1.0 | Inicjalna wersja - obsługa zamówień i formularza |

---

**Ostatnia aktualizacja:** 2026-03-19  
**Autora:** v0 System  
**Status:** Aktywny i Testowany ✓
