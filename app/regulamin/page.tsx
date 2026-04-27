import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Regulamin | La de Bébé mini",
  description: "Regulamin sklepu La de Bébé mini. Zasady korzystania z serwisu i dokonywania zakupów.",
};

export default function RegulaminPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          {/* Back link */}
          <Link 
            href="/" 
            className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground animate-fade-in"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Powrót do strony głównej
          </Link>

          {/* Header */}
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Dokumenty prawne
            </p>
            <h1 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
              Regulamin
            </h1>
            <p className="mt-4 text-muted-foreground">
              Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-foreground prose-headings:font-serif prose-headings:font-light prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground animate-fade-in-up" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
            
            <section className="mb-12">
              <h2 className="text-2xl mb-4">1. Postanowienia ogólne</h2>
              <p>
                1.1. Niniejszy Regulamin określa zasady korzystania ze sklepu internetowego La de Bébé mini, 
                dostępnego pod adresem internetowym (dalej: &quot;Sklep&quot;, &quot;Serwis&quot;).
              </p>
              <p>
                1.2. Właścicielem i operatorem Sklepu jest La de Bébé mini z siedzibą we Wrocławiu 
                (dalej: &quot;Sprzedawca&quot;).
              </p>
              <p>
                1.3. Kontakt ze Sprzedawcą możliwy jest pod adresem e-mail: <strong>Ladebebemini@gmail.com</strong> 
                lub telefonicznie: <strong>+48 518 845 751</strong>.
              </p>
              <p>
                1.4. Korzystanie ze Sklepu, w tym przeglądanie oferty, składanie Zamówień oraz dokonywanie płatności,
                jest równoznaczne z zapoznaniem się i akceptacją niniejszego Regulaminu oraz{" "}
                <Link href="/polityka-prywatnosci" className="text-primary hover:underline">Polityki Prywatności</Link>.
              </p>
              <p>
                1.5. <strong>Usługodawca (La de Bébé mini) wyraża zgodę na świadczenie usług drogą elektroniczną
                na warunkach określonych niniejszym Regulaminem.</strong> Usługodawca akceptuje niniejszy Regulamin
                w całości i zobowiązuje się do jego przestrzegania w relacjach z Klientami. Akceptacja Regulaminu
                przez Usługodawcę jest niezbędnym warunkiem korzystania przez Usługodawcę z usług Operatora płatności
                oraz innych dostawców usług zewnętrznych zintegrowanych ze Sklepem.
              </p>
              <p>
                1.6. W przypadku jakichkolwiek rozbieżności pomiędzy niniejszym Regulaminem a regulaminami
                podmiotów zewnętrznych (Operatora płatności, dostawców logistycznych), w relacji między
                Sprzedawcą a Klientem pierwszeństwo stosowania mają postanowienia niniejszego Regulaminu,
                chyba że przepisy prawa stanowią inaczej.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">2. Definicje</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Klient</strong> — osoba fizyczna posiadająca pełną zdolność do czynności prawnych, osoba prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej, która korzysta ze Sklepu</li>
                <li><strong>Konsument</strong> — Klient będący osobą fizyczną dokonującą zakupu niezwiązanego bezpośrednio z jej działalnością gospodarczą lub zawodową</li>
                <li><strong>Produkt</strong> — towar prezentowany w Sklepie, przeznaczony do sprzedaży</li>
                <li><strong>Zamówienie</strong> — oświadczenie woli Klienta składane za pośrednictwem formularza kontaktowego lub systemu płatności, zmierzające do zawarcia umowy sprzedaży</li>
                <li><strong>Koszyk</strong> — funkcjonalność Sklepu umożliwiająca wybór Produktów przed złożeniem Zamówienia</li>
                <li><strong>Operator płatności</strong> — zewnętrzny dostawca usług płatniczych (m.in. Stripe lub inny podmiot wskazany przez Sprzedawcę) przetwarzający transakcje finansowe w Sklepie</li>
                <li><strong>Usługodawca</strong> — La de Bébé mini jako podmiot świadczący usługi drogą elektroniczną w rozumieniu ustawy o świadczeniu usług drogą elektroniczną z dnia 18 lipca 2002 r.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">3. Wymagania techniczne</h2>
              <p>Do korzystania ze Sklepu niezbędne są:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Urządzenie z dostępem do Internetu (komputer, tablet, smartfon)</li>
                <li>Aktualna przeglądarka internetowa obsługująca JavaScript i pliki cookies</li>
                <li>Aktywne konto poczty elektronicznej (do składania zamówień)</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">4. Produkty i ceny</h2>
              <p>
                4.1. Wszystkie Produkty prezentowane w Sklepie są fabrycznie nowe, wolne od wad fizycznych 
                i prawnych oraz zostały legalnie wprowadzone na rynek polski.
              </p>
              <p>
                4.2. Produkty La de Bébé mini wykonane są z naturalnych, niebarwionych chemicznie tkanin, 
                bezpiecznych dla wrażliwej skóry noworodków i niemowląt.
              </p>
              <p>
                4.3. Ceny Produktów podane są w złotych polskich (PLN) i zawierają podatek VAT.
              </p>
              <p>
                4.4. Ceny nie obejmują kosztów dostawy, które są podawane osobno przy składaniu Zamówienia.
              </p>
              <p>
                4.5. Sprzedawca zastrzega sobie prawo do zmiany cen Produktów. Zmiana ceny nie dotyczy 
                Zamówień złożonych przed wprowadzeniem zmiany.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">5. Składanie zamówień</h2>
              <p>
                5.1. Zamówienia można składać poprzez formularz kontaktowy dostępny na stronie Sklepu,
                system płatności online, e-mail lub telefonicznie — przez całą dobę, 7 dni w tygodniu.
              </p>
              <p>
                5.2. Złożenie Zamówienia wymaga podania danych niezbędnych do jego realizacji: imienia i nazwiska,
                adresu e-mail, adresu dostawy oraz numeru telefonu. W przypadku płatności elektronicznej Klient
                zostaje przekierowany na stronę Operatora płatności w celu sfinalizowania transakcji.
              </p>
              <p>
                5.3. Po złożeniu Zamówienia Klient otrzymuje automatyczne potwierdzenie przyjęcia Zamówienia
                na podany adres e-mail. Potwierdzenie to nie jest równoznaczne z zawarciem umowy sprzedaży.
              </p>
              <p>
                5.4. Umowa sprzedaży zostaje zawarta z chwilą potwierdzenia przyjęcia Zamówienia do realizacji
                przez Sprzedawcę (odrębna wiadomość e-mail) lub — w przypadku płatności elektronicznej —
                z chwilą potwierdzenia autoryzacji płatności.
              </p>
              <p>
                5.5. Sprzedawca zastrzega sobie prawo do odmowy realizacji Zamówienia w przypadku:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Podania nieprawidłowych lub niepełnych danych przez Klienta</li>
                <li>Braku możliwości kontaktu z Klientem</li>
                <li>Braku dostępności Produktu</li>
                <li>Odrzucenia lub cofnięcia autoryzacji płatności przez Operatora płatności</li>
                <li>Uzasadnionego podejrzenia działania niezgodnego z Regulaminem lub przepisami prawa</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">6. Płatności</h2>
              <p>
                6.1. Sklep obsługuje płatności elektroniczne realizowane za pośrednictwem zewnętrznego
                Operatora płatności. Korzystanie z płatności elektronicznych jest dobrowolne — Klient
                może wybrać alternatywną formę rozliczenia wskazaną poniżej.
              </p>
              <p>6.2. Dostępne formy płatności:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Płatność elektroniczna online</strong> — karta płatnicza (Visa, Mastercard),
                  BLIK lub inny instrument płatniczy obsługiwany przez Operatora płatności.
                  Transakcja realizowana jest w czasie rzeczywistym za pośrednictwem bezpiecznego
                  łącza szyfrowanego (SSL/TLS).
                </li>
                <li><strong>Przelew bankowy</strong> — na rachunek wskazany w potwierdzeniu Zamówienia; realizacja następuje po zaksięgowaniu wpłaty</li>
                <li><strong>Płatność przy odbiorze osobistym</strong> — gotówką lub kartą w showroomie we Wrocławiu</li>
                <li><strong>Płatność za pobraniem</strong> — przy odbiorze przesyłki od kuriera (możliwa dopłata operacyjna)</li>
              </ul>
              <p>
                6.3. <strong>Warunki korzystania z płatności elektronicznych — akceptacja przez Usługodawcę.</strong>{" "}
                Świadczenie usług płatności elektronicznych w Sklepie jest możliwe wyłącznie po uprzednim
                zawarciu przez Usługodawcę (La de Bébé mini) umowy z Operatorem płatności oraz zaakceptowaniu
                regulaminu tego Operatora. Usługodawca zobowiązuje się do przestrzegania wszystkich wymogów
                nałożonych przez Operatora płatności, w tym wymogów w zakresie bezpieczeństwa transakcji (PCI DSS),
                przeciwdziałania praniu pieniędzy (AML) i ochrony danych osobowych.
              </p>
              <p>
                6.4. Dane karty płatniczej oraz dane do przelewu elektronicznego <strong>nie są przechowywane
                przez Sprzedawcę</strong> — są przetwarzane wyłącznie przez Operatora płatności, który
                ponosi odpowiedzialność za ich bezpieczeństwo zgodnie z obowiązującymi standardami i
                własnym regulaminem.
              </p>
              <p>
                6.5. Zamówienie uważa się za opłacone w momencie:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>przy płatnościach elektronicznych — z chwilą otrzymania przez Sprzedawcę potwierdzenia autoryzacji transakcji od Operatora płatności</li>
                <li>przy przelewie bankowym — z chwilą zaksięgowania pełnej kwoty na rachunku Sprzedawcy</li>
                <li>przy płatności za pobraniem — z chwilą odbioru przesyłki i uiszczenia należności</li>
              </ul>
              <p>
                6.6. W przypadku nieudanej transakcji elektronicznej lub cofnięcia autoryzacji, Zamówienie
                zostaje anulowane, a Klient informowany jest drogą e-mail. Zwrot środków następuje automatycznie
                za pośrednictwem Operatora płatności, zgodnie z jego procedurami, nie później niż w ciągu
                <strong> 7 dni roboczych</strong>.
              </p>
              <p>
                6.7. Sprzedawca wystawia dokument sprzedaży (paragon lub fakturę VAT) na życzenie Klienta.
                Prośbę o fakturę należy zgłosić podczas składania Zamówienia, podając dane do faktury.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">7. Dostawa</h2>
              <p>
                7.1. Dostawa Produktów realizowana jest na terenie Rzeczypospolitej Polskiej.
              </p>
              <p>
                7.2. Dostępne formy dostawy:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Kurier</strong> — dostawa pod wskazany adres</li>
                <li><strong>Paczkomat InPost</strong> — odbiór w wybranym paczkomacie</li>
                <li><strong>Odbiór osobisty</strong> — w showroomie we Wrocławiu (po wcześniejszym umówieniu)</li>
              </ul>
              <p>
                7.3. Czas realizacji Zamówienia wynosi od 2 do 7 dni roboczych od momentu zaksięgowania płatności 
                lub potwierdzenia Zamówienia (w przypadku płatności za pobraniem).
              </p>
              <p>
                7.4. Koszty dostawy pokrywa Klient, chyba że Sprzedawca wskaże inaczej (np. w ramach promocji).
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">8. Prawo odstąpienia od umowy</h2>
              <p>
                8.1. Konsument ma prawo odstąpić od umowy w terminie <strong>14 dni</strong> od dnia otrzymania Produktu, 
                bez podania przyczyny.
              </p>
              <p>
                8.2. Aby skorzystać z prawa odstąpienia, Konsument powinien poinformować Sprzedawcę o swojej decyzji 
                w drodze jednoznacznego oświadczenia (np. e-mail na adres: Ladebebemini@gmail.com).
              </p>
              <p>
                8.3. W przypadku odstąpienia od umowy, Konsument zobowiązany jest zwrócić Produkt niezwłocznie, 
                nie później niż w terminie 14 dni od dnia odstąpienia.
              </p>
              <p>
                8.4. Zwracany Produkt powinien być w stanie nienaruszonym, bez śladów użytkowania, 
                w oryginalnym opakowaniu wraz z metkami.
              </p>
              <p>
                8.5. Sprzedawca zwraca wszystkie otrzymane płatności, w tym koszty dostawy (z wyjątkiem dodatkowych
                kosztów wynikających z wybranego przez Konsumenta sposobu dostawy innego niż najtańszy),
                niezwłocznie, nie później niż w terminie 14 dni od dnia otrzymania zwróconego Produktu.
                Zwrot płatności dokonanych kartą lub przelewem elektronicznym następuje na rachunek źródłowy
                za pośrednictwem Operatora płatności.
              </p>
              <p>
                8.6. Koszty zwrotu Produktu ponosi Konsument.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">9. Reklamacje</h2>
              <p>
                9.1. Sprzedawca odpowiada wobec Konsumenta za brak zgodności Produktu z umową na zasadach 
                określonych w ustawie o prawach konsumenta.
              </p>
              <p>
                9.2. Reklamację można złożyć drogą elektroniczną na adres: <strong>Ladebebemini@gmail.com</strong> 
                lub pisemnie na adres siedziby Sprzedawcy.
              </p>
              <p>
                9.3. Reklamacja powinna zawierać:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dane Klienta (imię, nazwisko, adres, e-mail)</li>
                <li>Numer Zamówienia lub dowód zakupu</li>
                <li>Opis wady Produktu</li>
                <li>Żądanie Klienta (wymiana, naprawa, obniżenie ceny, odstąpienie od umowy)</li>
              </ul>
              <p>
                9.4. Sprzedawca rozpatruje reklamację w terminie <strong>14 dni</strong> od dnia jej otrzymania.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">10. Gwarancja jakości</h2>
              <p>
                10.1. Produkty La de Bébé mini wykonane są z najwyższej jakości naturalnych materiałów 
                i objęte są gwarancją jakości.
              </p>
              <p>
                10.2. Gwarancja obejmuje wady materiałowe i wykonania, nie obejmuje uszkodzeń mechanicznych 
                ani śladów normalnego użytkowania.
              </p>
              <p>
                10.3. Gwarancja jest ważna przez okres <strong>6 miesięcy</strong> od daty zakupu.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">11. Pielęgnacja produktów</h2>
              <p>
                Aby zapewnić długotrwałą jakość i bezpieczeństwo naszych produktów, zalecamy:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pranie w temperaturze maksymalnie 40°C</li>
                <li>Używanie delikatnych środków piorących, najlepiej dedykowanych dla dzieci</li>
                <li>Unikanie wybielaczy i zmiękczaczy z silnymi substancjami chemicznymi</li>
                <li>Suszenie w pozycji rozłożonej lub na niskiej temperaturze w suszarce</li>
                <li>Prasowanie na średniej temperaturze</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">12. Ochrona danych osobowych</h2>
              <p>
                Zasady przetwarzania danych osobowych Klientów określone są w 
                <Link href="/polityka-prywatnosci" className="text-primary hover:underline"> Polityce Prywatności</Link>, 
                która stanowi integralną część niniejszego Regulaminu.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">13. Prawa własności intelektualnej</h2>
              <p>
                13.1. Wszystkie materiały zamieszczone w Sklepie (teksty, zdjęcia, grafiki, logo, znaki towarowe) 
                są własnością Sprzedawcy lub zostały użyte za zgodą właścicieli praw.
              </p>
              <p>
                13.2. Kopiowanie, rozpowszechnianie lub wykorzystywanie materiałów ze Sklepu bez pisemnej zgody 
                Sprzedawcy jest zabronione.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">14. Obowiązki Klienta</h2>
              <p>Klient zobowiązuje się do:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Korzystania ze Sklepu zgodnie z jego przeznaczeniem i niniejszym Regulaminem</li>
                <li>Podawania prawdziwych i aktualnych danych osobowych</li>
                <li>Niepodejmowania działań mogących zakłócić funkcjonowanie Sklepu</li>
                <li>Nienaruszania praw osób trzecich oraz praw Sprzedawcy</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">15. Odpowiedzialność</h2>
              <p>
                15.1. Sprzedawca nie ponosi odpowiedzialności za przerwy w działaniu Sklepu wynikające 
                z przyczyn technicznych lub niezależnych od Sprzedawcy.
              </p>
              <p>
                15.2. Sprzedawca nie ponosi odpowiedzialności za skutki nieprawidłowego korzystania ze Sklepu 
                przez Klienta.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">16. Rozwiązywanie sporów</h2>
              <p>
                16.1. Wszelkie spory wynikające z umów zawartych na podstawie niniejszego Regulaminu będą 
                rozstrzygane w pierwszej kolejności polubownie, poprzez negocjacje między stronami.
              </p>
              <p>
                16.2. Konsument ma możliwość skorzystania z pozasądowych sposobów rozpatrywania reklamacji 
                i dochodzenia roszczeń, w tym:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mediacji prowadzonej przez wojewódzkie inspektoraty Inspekcji Handlowej</li>
                <li>Platformy ODR (Online Dispute Resolution) dostępnej pod adresem: 
                  <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"> ec.europa.eu/consumers/odr</a>
                </li>
              </ul>
              <p>
                16.3. W przypadku braku polubownego rozwiązania sporu, sądem właściwym jest sąd powszechny 
                właściwy dla siedziby Sprzedawcy, z zastrzeżeniem, że w przypadku Konsumentów właściwość sądu 
                określają przepisy ogólne.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">17. Zmiany Regulaminu</h2>
              <p>
                17.1. Sprzedawca zastrzega sobie prawo do wprowadzania zmian w Regulaminie z ważnych przyczyn 
                (np. zmiany przepisów prawa, zmiany zakresu usług).
              </p>
              <p>
                17.2. O zmianach Regulaminu Klienci zostaną poinformowani poprzez zamieszczenie nowej wersji 
                na stronie Sklepu.
              </p>
              <p>
                17.3. Zmiany Regulaminu nie wpływają na Zamówienia złożone przed wejściem zmian w życie.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">18. Postanowienia końcowe</h2>
              <p>
                18.1. W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego, 
                w szczególności Kodeksu cywilnego, ustawy o prawach konsumenta oraz ustawy o świadczeniu usług 
                drogą elektroniczną.
              </p>
              <p>
                18.2. Regulamin wchodzi w życie z dniem publikacji na stronie Sklepu.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">19. Kontakt</h2>
              <p>W przypadku pytań dotyczących Regulaminu lub funkcjonowania Sklepu, skontaktuj się z nami:</p>
              <ul className="list-none pl-0 space-y-2 mt-4">
                <li><strong>Email:</strong> Ladebebemini@gmail.com</li>
                <li><strong>Telefon:</strong> +48 518 845 751</li>
                <li><strong>Adres:</strong> Wrocław</li>
              </ul>
            </section>

          </div>

          {/* Bottom navigation */}
          <div className="mt-16 flex flex-col items-center gap-4 border-t border-warm pt-8 sm:flex-row sm:justify-between">
            <Link 
              href="/" 
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Powrót do strony głównej
            </Link>
            <Link 
              href="/polityka-prywatnosci" 
              className="text-sm text-muted-foreground transition-all duration-300 hover:text-foreground link-underline"
            >
              Zobacz Politykę Prywatności
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
