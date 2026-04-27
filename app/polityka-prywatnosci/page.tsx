import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Polityka Prywatności | La de Bébé mini",
  description: "Polityka prywatności sklepu La de Bébé mini. Dowiedz się, jak przetwarzamy Twoje dane osobowe.",
};

export default function PolitykaPrywatnosciPage() {
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
              Polityka Prywatności
            </h1>
            <p className="mt-4 text-muted-foreground">
              Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-foreground prose-headings:font-serif prose-headings:font-light prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground animate-fade-in-up" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
            
            <section className="mb-12">
              <h2 className="text-2xl mb-4">1. Administrator danych osobowych</h2>
              <p>
                Administratorem Twoich danych osobowych jest La de Bébé mini z siedzibą we Wrocławiu 
                (dalej: &quot;Administrator&quot;, &quot;my&quot;, &quot;nas&quot;).
              </p>
              <p>
                Kontakt z Administratorem możliwy jest pod adresem e-mail: <strong>Ladebebemini@gmail.com</strong> 
                lub telefonicznie: <strong>+48 518 845 751</strong>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">2. Jakie dane zbieramy</h2>
              <p>W ramach działalności naszej strony internetowej możemy zbierać następujące kategorie danych osobowych:</p>
              
              <h3 className="text-xl mt-6 mb-3">2.1. Dane podawane przez Użytkownika</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Imię i nazwisko</strong> — w celu personalizacji komunikacji</li>
                <li><strong>Adres e-mail</strong> — w celu odpowiedzi na zapytania i prowadzenia korespondencji</li>
                <li><strong>Numer telefonu</strong> — opcjonalnie, w celu kontaktu telefonicznego</li>
                <li><strong>Treść wiadomości</strong> — w celu realizacji zapytań i zamówień</li>
              </ul>

              <h3 className="text-xl mt-6 mb-3">2.2. Dane zbierane automatycznie</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Adres IP</strong> — w celach bezpieczeństwa i analitycznych</li>
                <li><strong>Dane o urządzeniu</strong> — typ przeglądarki, system operacyjny</li>
                <li><strong>Dane o aktywności</strong> — odwiedzane strony, czas spędzony na stronie</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">3. Cele przetwarzania danych</h2>
              <p>Twoje dane osobowe przetwarzamy w następujących celach:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Odpowiedź na zapytania</strong> — przetwarzanie danych z formularza kontaktowego w celu udzielenia odpowiedzi na Twoje pytania (podstawa prawna: art. 6 ust. 1 lit. b RODO)</li>
                <li><strong>Realizacja zamówień</strong> — przetwarzanie danych niezbędnych do realizacji zakupów (podstawa prawna: art. 6 ust. 1 lit. b RODO)</li>
                <li><strong>Marketing bezpośredni</strong> — wysyłanie informacji o produktach i promocjach, wyłącznie za Twoją zgodą (podstawa prawna: art. 6 ust. 1 lit. a RODO)</li>
                <li><strong>Analityka</strong> — analiza ruchu na stronie w celu poprawy jakości usług (podstawa prawna: art. 6 ust. 1 lit. f RODO)</li>
                <li><strong>Obowiązki prawne</strong> — wypełnianie obowiązków wynikających z przepisów prawa (podstawa prawna: art. 6 ust. 1 lit. c RODO)</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">4. Pliki cookies</h2>
              <p>
                Nasza strona wykorzystuje pliki cookies (ciasteczka) — małe pliki tekstowe zapisywane na Twoim urządzeniu.
              </p>
              
              <h3 className="text-xl mt-6 mb-3">4.1. Rodzaje wykorzystywanych cookies</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Niezbędne</strong> — wymagane do prawidłowego działania strony (np. zapamiętanie zawartości koszyka)</li>
                <li><strong>Funkcjonalne</strong> — zapamiętują Twoje preferencje (np. język, rozmiar czcionki)</li>
                <li><strong>Analityczne</strong> — pomagają nam zrozumieć, jak korzystasz ze strony (Vercel Analytics)</li>
              </ul>

              <h3 className="text-xl mt-6 mb-3">4.2. Zarządzanie cookies</h3>
              <p>
                Możesz zarządzać plikami cookies poprzez ustawienia swojej przeglądarki. Wyłączenie niektórych 
                cookies może wpłynąć na funkcjonalność strony.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">5. Udostępnianie danych</h2>
              <p>Twoje dane osobowe mogą być udostępniane następującym kategoriom odbiorców:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Dostawcy usług hostingowych</strong> — Vercel Inc. (przechowywanie danych)</li>
                <li><strong>Dostawcy usług analitycznych</strong> — Vercel Analytics</li>
                <li><strong>Dostawcy usług kurierskich</strong> — w przypadku realizacji zamówień</li>
                <li><strong>Organy państwowe</strong> — gdy wymagają tego przepisy prawa</li>
              </ul>
              <p className="mt-4">
                Nie sprzedajemy ani nie udostępniamy Twoich danych osobowych podmiotom trzecim w celach marketingowych 
                bez Twojej wyraźnej zgody.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">6. Okres przechowywania danych</h2>
              <p>Twoje dane osobowe przechowujemy przez okres:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Dane z formularza kontaktowego</strong> — przez czas niezbędny do obsługi zapytania, nie dłużej niż 2 lata od ostatniego kontaktu</li>
                <li><strong>Dane transakcyjne</strong> — przez okres wymagany przepisami prawa podatkowego (5 lat)</li>
                <li><strong>Dane marketingowe</strong> — do momentu wycofania zgody</li>
                <li><strong>Dane analityczne</strong> — maksymalnie 26 miesięcy</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">7. Twoje prawa</h2>
              <p>W związku z przetwarzaniem Twoich danych osobowych przysługują Ci następujące prawa:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Prawo dostępu</strong> — możesz uzyskać informacje o przetwarzaniu Twoich danych</li>
                <li><strong>Prawo do sprostowania</strong> — możesz żądać poprawienia nieprawidłowych danych</li>
                <li><strong>Prawo do usunięcia</strong> — możesz żądać usunięcia Twoich danych (&quot;prawo do bycia zapomnianym&quot;)</li>
                <li><strong>Prawo do ograniczenia przetwarzania</strong> — możesz żądać ograniczenia przetwarzania w określonych sytuacjach</li>
                <li><strong>Prawo do przenoszenia danych</strong> — możesz otrzymać swoje dane w ustrukturyzowanym formacie</li>
                <li><strong>Prawo do sprzeciwu</strong> — możesz sprzeciwić się przetwarzaniu danych w celach marketingowych</li>
                <li><strong>Prawo do wycofania zgody</strong> — w dowolnym momencie, bez wpływu na zgodność z prawem przetwarzania przed jej wycofaniem</li>
              </ul>
              <p className="mt-4">
                Aby skorzystać z powyższych praw, skontaktuj się z nami pod adresem: <strong>Ladebebemini@gmail.com</strong>
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">8. Skarga do organu nadzorczego</h2>
              <p>
                Jeśli uważasz, że przetwarzanie Twoich danych osobowych narusza przepisy RODO, masz prawo 
                złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">9. Bezpieczeństwo danych</h2>
              <p>
                Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych osobowych 
                przed nieuprawnionym dostępem, utratą, zniszczeniem lub zmianą. Nasza strona wykorzystuje 
                szyfrowanie SSL/TLS dla bezpiecznej transmisji danych.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">10. Transfer danych poza EOG</h2>
              <p>
                W związku z korzystaniem z usług Vercel Inc. (siedziba w USA), Twoje dane mogą być przekazywane 
                poza Europejski Obszar Gospodarczy. Transfer odbywa się na podstawie standardowych klauzul 
                umownych zatwierdzonych przez Komisję Europejską, zapewniających odpowiedni poziom ochrony danych.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">11. Zmiany w Polityce Prywatności</h2>
              <p>
                Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. O wszelkich 
                istotnych zmianach poinformujemy poprzez zamieszczenie zaktualizowanej wersji na tej stronie. 
                Zalecamy regularne sprawdzanie treści Polityki Prywatności.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl mb-4">12. Kontakt</h2>
              <p>W przypadku pytań dotyczących Polityki Prywatności lub przetwarzania Twoich danych, skontaktuj się z nami:</p>
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
              href="/regulamin" 
              className="text-sm text-muted-foreground transition-all duration-300 hover:text-foreground link-underline"
            >
              Zobacz Regulamin
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
