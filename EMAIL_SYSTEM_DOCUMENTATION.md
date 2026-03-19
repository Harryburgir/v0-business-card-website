# System Wysyłania Emaili - La de Bébé mini

## Przegląd

System wysyłania emaili obsługuje dwie główne funkcjonalności:

1. **Powiadomienia o zamówieniach** - Email do właściciela sklepu (Ladebebemini@gmail.com)
2. **Potwierdzenia zamówień dla kupujących** - Email do klienta (wymaga skonfigurowanej domeny)
3. **Formularz kontaktowy** - Email do właściciela sklepu

## Architektura

### Pliki API

- **`/app/api/order/route.ts`** - Obsługuje wysyłanie emaili o zamówieniach
- **`/app/api/contact/route.ts`** - Obsługuje wysyłanie emaili z formularza kontaktowego

### Konfiguracja

Wymagane zmienne środowiskowe w sekcji **Vars** (ustawienia projektu):

| Zmienna | Status | Opis |
|---------|--------|------|
| `RESEND_API_KEY` | **Wymagane** | Klucz API z [resend.com](https://resend.com) |
| `EMAIL_FROM_ADDRESS` | Opcjonalne | Adres nadawcy z weryfikowaną domeną, np. `La de Bébé mini <kontakt@twojadomena.pl>` |

## Szczegóły Implementacji

### 1. Wysyłanie Emaili do Sklepu

#### Zamówienia
Gdy klient złoży zamówienie, automatycznie wysyłany jest email do `Ladebebemini@gmail.com` z:
- Numerem zamówienia
- Danymi klienta (imię, email, telefon, adres)
- Listą produktów z cenami
- Całkowitą kwotą do zapłaty
- Metodą dostawy

**Endpoint:** `POST /api/order`

```json
{
  "name": "Jan Kowalski",
  "email": "jan@example.com",
  "phone": "+48 123 456 789",
  "address": "ul. Główna 1, 00-001 Warszawa",
  "notes": "Proszę o dyskretne opakowanie",
  "items": [
    {
      "id": "1",
      "title": "Sukienka bawełniana",
      "price": "89 zł",
      "priceValue": 89,
      "size": "92",
      "quantity": 2
    }
  ],
  "totalPrice": 178,
  "deliveryMethod": "Kurier DPD",
  "deliveryPrice": 15,
  "finalTotal": 193
}
```

#### Formularz Kontaktowy
Emails z formularza kontaktowego trafiają również do `Ladebebemini@gmail.com` z pełną wiadomością i danymi kontaktowymi.

**Endpoint:** `POST /api/contact`

```json
{
  "name": "Maria",
  "email": "maria@example.com",
  "subject": "Pytanie o dostępność",
  "message": "Czy dostępny jest rozmiar 74?"
}
```

### 2. Potwierdzenia Zamówień dla Kupujących

**WAŻNE:** Ta funkcjonalność wymaga skonfigurowanej własnej domeny w Resend!

Klient otrzymuje potwierdzenie zamówienia zawierające:
- Podziękowanie za zakup
- Numer zamówienia
- Szczegóły dostawy
- Listę zamówionych produktów
- Informację o kontakcie ze sklepem

**Warunki aktywacji:**
1. Zarejestruj konto na [resend.com](https://resend.com)
2. Zweryfikuj swoją domenę w panelu Resend
3. Ustaw zmienną `EMAIL_FROM_ADDRESS` z emailem z weryfikowanej domeny

Przykład: `La de Bébé mini <kontakt@ladebebemini.pl>`

## Bezpieczeństwo

### Sanityzacja Danych
Wszystkie dane wejściowe od użytkownika są automatycznie sanityzowane za pomocą funkcji `sanitizeHtml()`:
- Znaki specjalne HTML są zmieniane na entity (`&lt;`, `&gt;`, `&amp;`)
- Zapobiega to atakom XSS w emailach
- Dane są bezpieczne do umieszczenia w HTML emaili

### Walidacja
Każdy request zawiera walidację:
- **Email:** Sprawdzenie formatu emailu regex
- **Telefon:** Walidacja polskiego formatu numeru (9 cyfr, opcjonalnie +48)
- **Pola wymagane:** Sprawdzenie obecności wszystkich obowiązkowych pól

### Obsługa Błędów
- Błędy konfiguracji są jawnie zgłaszane
- Błędy wysyłki emaili zwracają informacyjne komunikaty dla użytkownika
- Wszystkie błędy są logowane w konsoli serwera

## Schemat Emaili

Wszystkie emaile są wysyłane w formacie HTML z:
- Eleganckim designem dostosowanym do marki La de Bébé mini
- Czcionką Georgia dla elegancji
- Paleta barw: neutralne (białe, szare) + beżowe akcenty (#8b7355, #e8e4de)
- Responsywnym layoutem (max-width: 600px)
- Polskim tekstem

## Troubleshooting

### Problem: "Konfiguracja serwera jest niepełna"
**Rozwiązanie:** Dodaj `RESEND_API_KEY` w sekcji Vars (Ustawienia → Vars)

### Problem: "Nie udało się wysłać zamówienia"
**Przyczyny:**
1. RESEND_API_KEY jest niepoprawny
2. Limit API został przekroczony
3. Serwer Resend jest niedostępny

**Rozwiązanie:** Sprawdź status Resend na [resend.com](https://resend.com)

### Problem: Potwierdzenie nie trafia do klienta
**Przyczyna:** Nie skonfigurowano `EMAIL_FROM_ADDRESS`

**Rozwiązanie:**
1. Zweryfikuj domenę w Resend
2. Dodaj `EMAIL_FROM_ADDRESS` w sekcji Vars
3. Format: `"La de Bébé mini <email@domena.com>"`

### Problem: Email trafia do spamu
**Rozwiązanie:**
1. Upewnij się, że domena jest zweryfikowana w Resend
2. Dodaj SPF i DKIM records (instrukcja w panelu Resend)
3. Czekaj 24-48h na propagację DNS

## Kodowanie Znaków Specjalnych

Wszystkie polskie znaki są obsługiwane:
- ą, ć, ę, ł, ń, ó, ś, ź, ż
- Każdy email zawiera meta tag UTF-8: `<meta charset="utf-8">`

## Testowanie

### Test 1: Zamówienie
1. Przejdź do koszyka
2. Dodaj produkt
3. Wypełnij formularz zamówienia
4. Prześlij zamówienie
5. Sprawdź `Ladebebemini@gmail.com` - powinno być powiadomienie

### Test 2: Potwierdzenie (jeśli skonfigurowano domenę)
1. Powtórz Test 1
2. Sprawdź email klienta - powinno być potwierdzenie

### Test 3: Formularz Kontaktowy
1. Przejdź do formularza kontaktowego
2. Wypełnij dane
3. Prześlij
4. Sprawdź `Ladebebemini@gmail.com`

## Limity API Resend

- Plan bezpłatny: 100 emaili dziennie
- Brak limitu dla domains z płatnym planem
- Rate limit: 100 requestów na minutę

## Wsparcie

Dla problemów z Resend: https://support.resend.com

---

**Data aktualizacji:** 2026-03-19  
**Wersja:** 1.0
