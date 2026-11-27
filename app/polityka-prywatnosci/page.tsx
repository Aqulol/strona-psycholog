import {conversionEndpoint} from '../../lib/contact-endpoint.mjs';
import {config} from '../../lib/config';
import {Crumbs,SeeAlso} from '../../components/Site';
import {meta,paths} from '../../lib/site';
export const metadata=meta('/polityka-prywatnosci/','Polityka prywatności i cookies | Plebaniak','Zasady przetwarzania danych w gabinecie Grzegorza Plebaniaka: kontakt, odbiorcy danych, pliki cookies, prawa osób i kontakt w sprawach prywatności.');

export default function Page() {
  return (
    <main id="tresc" className="container section max-w-3xl">
      <Crumbs path="/polityka-prywatnosci/" title="Polityka prywatności"/>
      <h1 className="mt-8 text-6xl text-green">Polityka prywatności</h1>

      <h2 className="mt-8 text-3xl">Administrator</h2>
      <p className="mt-3 leading-8">
        Administratorem danych osobowych jest Grzegorz Plebaniak, prowadzący działalność gospodarczą pod nazwą
        Psycholog Grzegorz Plebaniak (NIP 8971967542), {config.address}.
      </p>
      <p className="mt-3 leading-8">
        We wszystkich sprawach dotyczących danych osobowych można skontaktować się z administratorem:
      </p>
      <ul className="mt-3 space-y-2">
        <li className="leading-8">
          e-mail:{' '}
          <a className="text-green underline" href="mailto:gpplebaniak@gmail.com">
            gpplebaniak@gmail.com
          </a>
        </li>
        <li className="leading-8">telefon: +48 693087574</li>
      </ul>
      <p className="mt-3 leading-8">
        To ten sam adres, na który można zgłaszać się w sprawach umówienia wizyty. Jeśli wiadomość dotyczy danych
        osobowych, proszę wpisać w temacie „RODO”.
      </p>

      <h2 className="mt-8 text-3xl">Jakie dane przetwarzamy</h2>
      <p className="mt-3 leading-8">W zależności od formy kontaktu możemy przetwarzać następujące dane:</p>
      <ul className="mt-3 space-y-2">
        <li className="leading-8">
          <strong>Dane podane przy kontakcie</strong> - imię, adres e-mail, opcjonalny numer telefonu i temat oraz treść
          wiadomości.
        </li>
        <li className="leading-8">
          <strong>Dane niezbędne do wystawienia faktury</strong> - imię, nazwisko, adres, a także NIP, jeśli dotyczy.
        </li>
      </ul>
      <p className="mt-3 leading-8">
        Kontakt organizacyjny nie służy do przesyłania danych o zdrowiu. Proszę nie przesyłać dokumentacji ani opisu objawów. Informacje o zdrowiu można omówić podczas pierwszej wizyty.
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
          <strong>Odpowiedź na zapytanie i umówienie wizyty</strong> - art. 6 ust. 1 lit. b RODO w przypadku kontaktu w sprawie zawarcia umowy, a przy innych pytaniach organizacyjnych art. 6 ust. 1 lit. f RODO (uzasadniony interes: obsługa korespondencji).
        </li>
        <li className="leading-8">
          <strong>Prowadzenie dokumentacji i rozliczeń, w tym wystawianie faktur</strong> - art. 6 ust. 1 lit. c RODO
          (obowiązek prawny).
        </li>
        <li className="leading-8">
          <strong>Ewentualne dochodzenie lub obrona roszczeń</strong> - art. 6 ust. 1 lit. f RODO (prawnie uzasadniony
          interes administratora).
        </li>
      </ul>

      <h2 className="mt-8 text-3xl">Odbiorcy danych</h2>
      <p className="mt-3 leading-8">Z danych mogą korzystać wyłącznie podmioty, które wspierają prowadzenie gabinetu:</p>
      <ul className="mt-3 space-y-2">
        <li className="leading-8">
          <strong>Google LLC</strong> - hosting strony (Firebase), przechowywanie archiwalnych wiadomości z dawnego formularza (Firestore); dane mogą być przekazywane do Stanów Zjednoczonych;
        </li>
        <li className="leading-8">
          <strong>Booksy</strong> - platforma, za pośrednictwem której można rezerwować wizyty online; dane podane
          podczas rezerwacji są przetwarzane zgodnie z zasadami i polityką prywatności Booksy;
        </li>
        <li className="leading-8">
          <strong>ZnanyLekarz</strong> - odnośnik do zewnętrznego profilu. Po przejściu do serwisu
          ZnanyLekarz obowiązuje jego polityka prywatności (
          <a className="text-green underline" href="https://www.znanylekarz.pl/prywatnosc" rel="noopener noreferrer">
            https://www.znanylekarz.pl/prywatnosc
          </a>
          );
        </li>
        <li className="leading-8">
          <strong>Biuro rachunkowe lub księgowość</strong> - w zakresie faktur i rozliczeń;
        </li>
        <li className="leading-8">
          <strong>Podmioty świadczące usługi informatyczne i hostingowe</strong>.
        </li>
      </ul>
      <p className="mt-3 leading-8">
        Dane nie są sprzedawane ani udostępniane w celach marketingowych.
      </p>

      <h2 className="mt-8 text-3xl">Formularz kontaktowy</h2>
      <p className="mt-3 leading-8">Po uruchomieniu wysyłki dane formularza (imię, e-mail, opcjonalny telefon i temat oraz treść) są przekazywane przez Cloudflare Workers do Resend i dalej do skrzynki gabinetu. Cloudflare przetwarza też dane połączenia, w tym adres IP na potrzeby ochrony przed spamem. Dostawcy mogą przetwarzać dane poza EOG; do transferów stosuje się odpowiednie zabezpieczenia, w tym standardowe klauzule umowne, gdy są wymagane. Witryna nie zapisuje nowych zgłoszeń w Firestore ani nie przekazuje treści do analityki.</p>
      <h2 className="mt-8 text-3xl">Okres przechowywania danych</h2>
      <ul className="mt-3 space-y-2">
        <li className="leading-8">
          <strong>Wiadomości organizacyjne</strong> - do czasu obsługi sprawy, nie dłużej niż 12 miesięcy
          od ostatniego kontaktu.
        </li>
        <li className="leading-8">
          <strong>Faktury i dokumenty księgowe</strong> - 5 lat, zgodnie z przepisami podatkowymi.
        </li>
        <li className="leading-8">
          <strong>Dokumentacja związana z terapią</strong> - zgodnie z przepisami o dokumentacji medycznej (20 lat).
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
          prawo do wycofania zgody w dowolnym momencie - bez wpływu na zgodność z prawem przetwarzania, którego
          dokonano przed jej wycofaniem.
        </li>
      </ul>
      <p className="mt-3 leading-8">
        Aby skorzystać z tych praw, proszę o wiadomość na adres{' '}
        <a className="text-green underline" href="mailto:gpplebaniak@gmail.com">
          gpplebaniak@gmail.com
        </a>
        . Odpowiadam w ciągu miesiąca od otrzymania zgłoszenia.
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

      <h2 id="cookies" className="mt-8 text-3xl">Cookies</h2>
      <p className="mt-3 leading-8">{conversionEndpoint(process.env.NEXT_PUBLIC_CONVERSION_ENDPOINT) ? 'Strona nie uruchamia narzędzi marketingowych. Pomiar skuteczności jest domyślnie wyłączony.' : 'Strona nie uruchamia analityki ani narzędzi marketingowych.'}</p>
      <p className="mt-3 leading-8">Witryna nie osadza kalendarza Booksy ani widgetów profili zewnętrznych. Po kliknięciu linku użytkownik przechodzi do serwisu dostawcy bez nagłówka Referer. Dalsze przetwarzanie podlega zasadom tego serwisu, np. <a href="https://booksy.com/pl-pl/p/privacy" rel="noreferrer">polityce prywatności Booksy</a>.</p>
      <p className="mt-3 leading-8">Mapa Google ładuje się dopiero po wybraniu opcji jej wyświetlenia. Przy wczytaniu mapy dostawca otrzymuje dane połączenia i może używać własnych plików cookies. Ustawienia cookies można zmienić w przeglądarce.</p>

      {conversionEndpoint(process.env.NEXT_PUBLIC_CONVERSION_ENDPOINT) && <>
        <h2 id="pomiar-skutecznosci" className="mt-8 text-3xl">Opcjonalny pomiar skuteczności</h2>
        <p className="mt-3 leading-8">Na podstawie osobnej zgody zliczamy kliknięcia w link do Booksy, telefon, e-mail i cennik oraz potwierdzenia przyjęcia formularza do wysyłki. Nie mierzymy rozpoczęcia ani zakończenia rezerwacji. Do Cloudflare przesyłamy wyłącznie nazwę działania, bez treści formularza, adresu odwiedzanej podstrony ani identyfikatora. Cloudflare otrzymuje techniczne dane połączenia, w tym IP, i może je przetwarzać poza EOG. Aplikacja nie zapisuje tych danych do licznika.</p>
        <p className="mt-3 leading-8">W bazie pozostaje licznik dzienny według rodzaju działania, bez historii poszczególnych osób. Liczniki w aktywnej bazie przechowujemy przez 90 dni; kopie techniczne dostawcy mogą wygasać później. Ustawienie zgody jest zapisywane w pamięci lokalnej. Można je zmienić w stopce w „Ustawieniach prywatności”. Wycofanie nie wpływa na wcześniejszy pomiar i nie usuwa sum, których nie można przypisać do osoby. Brak zgody nie ogranicza dostępu do strony, formularza ani rezerwacji.</p>
      </>}

      <h2 className="mt-8 text-3xl">Przekazywanie danych poza EOG</h2>
      <p className="mt-3 leading-8">
        Dane mogą być przekazywane do Stanów Zjednoczonych (Google LLC - hosting, Firestore).
        Przekazywanie odbywa się na podstawie decyzji o adekwatności (Data Privacy Framework) lub standardowych klauzul
        umownych. Zapewnione są odpowiednie zabezpieczenia danych.
      </p>

      <h2 className="mt-8 text-3xl">Zautomatyzowane podejmowanie decyzji</h2>
      <p className="mt-3 leading-8">
        Nie stosuję profilowania ani zautomatyzowanego podejmowania decyzji, w tym decyzji wywołujących skutki
        prawne lub istotnie wpływających na sytuację osoby.
      </p>

      <h2 className="mt-8 text-3xl">Wymóg podania danych</h2>
      <p className="mt-3 leading-8">
        Podanie danych kontaktowych jest dobrowolne, ale niezbędne, aby odpowiedzieć na zapytanie.
        Konsekwencją niepodania danych jest brak możliwości obsługi zapytania.
      </p>
      <SeeAlso links={[[paths.contact,'Kontakt'],[paths.faq,'Pytania organizacyjne']]}/>
    </main>
  );
}
