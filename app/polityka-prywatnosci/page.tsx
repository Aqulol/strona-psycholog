import Link from 'next/link';

export const metadata = {
  title: 'Polityka prywatności gabinetu psychologicznego',
  description:
    'Polityka prywatności gabinetu psychologicznego Grzegorza Plebaniaka we Wrocławiu: administrator danych, cele i podstawy przetwarzania, cookies, prawa osób, skarga do UODO, kontakt.',
};

export default function Page() {
  return (
    <main id="tresc" className="container section max-w-3xl">
      <Link href="/">← Strona główna</Link>
      <h1 className="mt-8 text-6xl text-green">Polityka prywatności</h1>

      <h2 className="mt-8 text-3xl">Administrator</h2>
      <p className="mt-3 leading-8">
        Administratorem danych osobowych jest Grzegorz Plebaniak, prowadzący działalność gospodarczą pod nazwą
        Psycholog Grzegorz Plebaniak (NIP 8971967542), ul. Śliczna 28/24, 50-566 Wrocław.
      </p>
      <p className="mt-3 leading-8">
        We wszystkich sprawach dotyczących danych osobowych można skontaktować się z administratorem:
      </p>
      <ul className="mt-3 space-y-2">
        <li className="leading-8">e-mail: g.plebaniak@somentiq.pl</li>
        <li className="leading-8">telefon: +48 693087574</li>
      </ul>
      <p className="mt-3 leading-8">
        To ten sam adres, na który można zgłaszać się w sprawach umówienia wizyty. Jeśli wiadomość dotyczy danych
        osobowych, prosimy wpisać w temacie „RODO”.
      </p>

      <h2 className="mt-8 text-3xl">Jakie dane przetwarzamy</h2>
      <p className="mt-3 leading-8">W zależności od formy kontaktu możemy przetwarzać następujące dane:</p>
      <ul className="mt-3 space-y-2">
        <li className="leading-8">
          <strong>Dane podane w formularzu kontaktowym</strong> — imię, adres e-mail lub numer telefonu oraz treść
          wiadomości.
        </li>
        <li className="leading-8">
          <strong>Dane techniczne i analityczne</strong> — anonimowe statystyki odwiedzin strony zbierane przez Google
          Analytics, wyłącznie po wyrażeniu zgody w banerze cookies.
        </li>
        <li className="leading-8">
          <strong>Dane niezbędne do wystawienia faktury</strong> — imię, nazwisko, adres, a także NIP, jeśli dotyczy.
        </li>
      </ul>
      <p className="mt-3 leading-8">
        Formularz kontaktowy nie jest przeznaczony do przesyłania danych o zdrowiu. Prosimy o niewpisywanie ich w
        formularzu — szczegóły dotyczące zdrowia można omówić podczas pierwszej wizyty.
      </p>

      <h2 className="mt-8 text-3xl">Dane szczególnej kategorii (art. 9 RODO)</h2>
      <p className="mt-3 leading-8">
        Jeśli w związku z kontaktem lub terapią dojdzie do przekazania danych dotyczących zdrowia, będą one
        przetwarzane na podstawie art. 9 ust. 2 lit. h RODO, czyli w celu świadczenia usług zdrowotnych.
      </p>
      <p className="mt-3 leading-8">
        Do przetwarzania danych w związku z terapią stosuje się odrębną klauzulę informacyjną, którą pacjenci
        otrzymują przed rozpoczęciem współpracy.
      </p>

      <h2 className="mt-8 text-3xl">Cele i podstawy prawne</h2>
      <ul className="mt-3 space-y-2">
        <li className="leading-8">
          <strong>Odpowiedź na zapytanie i umówienie wizyty</strong> — art. 6 ust. 1 lit. b RODO (podjęcie działań na
          żądanie osoby przed zawarciem umowy).
        </li>
        <li className="leading-8">
          <strong>Prowadzenie dokumentacji i rozliczeń, w tym wystawianie faktur</strong> — art. 6 ust. 1 lit. c RODO
          (obowiązek prawny).
        </li>
        <li className="leading-8">
          <strong>Statystyki odwiedzin (Google Analytics 4)</strong> — art. 6 ust. 1 lit. a RODO (zgoda wyrażona przez
          akceptację cookies w banerze).
        </li>
        <li className="leading-8">
          <strong>Ewentualne dochodzenie lub obrona roszczeń</strong> — art. 6 ust. 1 lit. f RODO (prawnie uzasadniony
          interes administratora).
        </li>
      </ul>

      <h2 className="mt-8 text-3xl">Odbiorcy danych</h2>
      <p className="mt-3 leading-8">Z danych mogą korzystać wyłącznie podmioty, które wspierają prowadzenie gabinetu:</p>
      <ul className="mt-3 space-y-2">
        <li className="leading-8">
          <strong>Google LLC</strong> — hosting strony (Firebase), przechowywanie wiadomości z formularza (Firestore)
          oraz Google Analytics; dane mogą być przekazywane do Stanów Zjednoczonych;
        </li>
        <li className="leading-8">
          <strong>ZnanyLekarz</strong> — platforma rezerwacji wizyt online; w zakresie rezerwacji obowiązuje polityka
          prywatności ZnanyLekarz (
          <a className="text-green underline" href="https://www.znanylekarz.pl/prywatnosc" rel="noopener noreferrer">
            https://www.znanylekarz.pl/prywatnosc
          </a>
          );
        </li>
        <li className="leading-8">
          <strong>Biuro rachunkowe lub księgowość</strong> — w zakresie faktur i rozliczeń;
        </li>
        <li className="leading-8">
          <strong>Podmioty świadczące usługi informatyczne i hostingowe</strong>.
        </li>
      </ul>
      <p className="mt-3 leading-8">
        Dane nie są sprzedawane ani udostępniane w celach marketingowych.
      </p>

      <h2 className="mt-8 text-3xl">Okres przechowywania danych</h2>
      <ul className="mt-3 space-y-2">
        <li className="leading-8">
          <strong>Wiadomości z formularza kontaktowego</strong> — do czasu obsługi sprawy, nie dłużej niż 12 miesięcy
          od ostatniego kontaktu.
        </li>
        <li className="leading-8">
          <strong>Faktury i dokumenty księgowe</strong> — 5 lat, zgodnie z przepisami podatkowymi.
        </li>
        <li className="leading-8">
          <strong>Dokumentacja związana z terapią</strong> — zgodnie z przepisami o dokumentacji medycznej (20 lat).
        </li>
        <li className="leading-8">
          <strong>Dane analityczne (Google Analytics)</strong> — zgodnie z ustawieniami retencji Google Analytics.
        </li>
      </ul>

      <h2 className="mt-8 text-3xl">Prawa osób</h2>
      <p className="mt-3 leading-8">W związku z przetwarzaniem danych przysługują Pani/Panu następujące prawa:</p>
      <ul className="mt-3 space-y-2">
        <li className="leading-8">prawo dostępu do danych,</li>
        <li className="leading-8">prawo do sprostowania danych,</li>
        <li className="leading-8">prawo do usunięcia danych,</li>
        <li className="leading-8">prawo do ograniczenia przetwarzania,</li>
        <li className="leading-8">prawo do przenoszenia danych,</li>
        <li className="leading-8">prawo do sprzeciwu,</li>
        <li className="leading-8">
          prawo do wycofania zgody w dowolnym momencie — bez wpływu na zgodność z prawem przetwarzania, którego
          dokonano przed jej wycofaniem.
        </li>
      </ul>
      <p className="mt-3 leading-8">
        Aby skorzystać z tych praw, prosimy o wiadomość na adres g.plebaniak@somentiq.pl. Odpowiadamy w ciągu miesiąca
        od otrzymania zgłoszenia.
      </p>

      <h2 className="mt-8 text-3xl">Skarga do UODO</h2>
      <p className="mt-3 leading-8">
        Jeśli uważa Pani/Pan, że przetwarzanie danych narusza przepisy RODO, przysługuje prawo wniesienia skargi do
        Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa,{' '}
        <a className="text-green underline" href="https://uodo.gov.pl" rel="noopener noreferrer">
          https://uodo.gov.pl
        </a>
        .
      </p>

      <h2 className="mt-8 text-3xl">Cookies</h2>
      <p className="mt-3 leading-8">Na stronie używane są następujące rodzaje plików cookies:</p>
      <ul className="mt-3 space-y-2">
        <li className="leading-8">
          <strong>Cookies techniczne</strong> — niezbędne do prawidłowego działania strony.
        </li>
        <li className="leading-8">
          <strong>Cookies analityczne (Google Analytics 4)</strong> — uruchamiane dopiero po wyrażeniu zgody w banerze
          cookies.
        </li>
        <li className="leading-8">
          <strong>Cookies marketingowe</strong> — nie są stosowane.
        </li>
      </ul>
      <p className="mt-3 leading-8">
        Zgodą można zarządzać w banerze cookies na stronie, a ustawienia plików cookies można również zmienić w
        przeglądarce.
      </p>

      <h2 className="mt-8 text-3xl">Przekazywanie danych poza EOG</h2>
      <p className="mt-3 leading-8">
        Dane mogą być przekazywane do Stanów Zjednoczonych (Google LLC — hosting, Firestore, Google Analytics).
        Przekazywanie odbywa się na podstawie decyzji o adekwatności (Data Privacy Framework) lub standardowych klauzul
        umownych. Zapewnione są odpowiednie zabezpieczenia danych.
      </p>

      <h2 className="mt-8 text-3xl">Zautomatyzowane podejmowanie decyzji</h2>
      <p className="mt-3 leading-8">
        Nie stosujemy profilowania ani zautomatyzowanego podejmowania decyzji, w tym decyzji wywołujących skutki
        prawne lub istotnie wpływających na sytuację osoby.
      </p>

      <h2 className="mt-8 text-3xl">Wymóg podania danych</h2>
      <p className="mt-3 leading-8">
        Podanie danych w formularzu kontaktowym jest dobrowolne, ale niezbędne, aby odpowiedzieć na zapytanie.
        Konsekwencją niepodania danych jest brak możliwości obsługi zapytania.
      </p>
    </main>
  );
}
