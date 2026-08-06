import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Wypalenie zawodowe – objawy i kiedy warto szukać pomocy',
  description: 'Wypalenie zawodowe i jego objawy: sprawdź, czym jest przewlekłe przeciążenie, kiedy porozmawiać z psychologiem we Wrocławiu i jak wygląda wsparcie.',
};

export default function Page() {
  return (
    <main id="tresc" className="container section max-w-3xl">
      <Link href="/" className="text-green underline">← Strona główna</Link>
      <h1 className="mt-8 text-5xl leading-tight text-green md:text-6xl">Wypalenie zawodowe – objawy i kiedy warto szukać pomocy</h1>
      <p className="mt-6 leading-8 text-ink/80">Anna ma 28 lat i pracuje w korporacji. Przez długi czas radziła sobie z wymagającymi projektami, lecz ostatnio nawet rozpoczęcie dnia pracy wywołuje napięcie. Po godzinach nie ma energii na relacje ani odpoczynek. Jej doświadczenie nie oznacza słabości. Może być sygnałem przewlekłego przeciążenia, któremu warto się przyjrzeć.</p>
      <h2 className="mt-12 text-4xl text-green">Czym jest wypalenie zawodowe?</h2>
      <p className="mt-4 leading-8 text-ink/80">Wypalenie zawodowe wiąże się z długotrwałym stresem związanym z pracą. Może obejmować utratę energii, rosnący dystans do obowiązków oraz poczucie, że wykonywane zadania straciły sens. Nie pojawia się z dnia na dzień. Często rozwija się wtedy, gdy napięcie trwa długo, a możliwości odpoczynku, wpływu lub rozmowy o potrzebach są ograniczone.</p>
      <h2 className="mt-12 text-4xl text-green">Wypalenie zawodowe – objawy</h2>
      <p className="mt-4 leading-8 text-ink/80">Sygnały mogą wyglądać różnie i nie muszą występować jednocześnie. To między innymi stałe zmęczenie, trudność z regeneracją, drażliwość, zobojętnienie, problemy z koncentracją albo odkładanie prostych zadań. Niektóre osoby zauważają wycofanie z kontaktów, inne pracują coraz dłużej, aby poradzić sobie z poczuciem zaległości. Możliwe są też kłopoty ze snem lub napięcie towarzyszące myślom o pracy. Sam opis objawów nie jest diagnozą, ale może pomóc zauważyć, że potrzebne jest wsparcie.</p>
      <h2 className="mt-12 text-4xl text-green">Kiedy warto porozmawiać z psychologiem?</h2>
      <p className="mt-4 leading-8 text-ink/80">Warto rozważyć konsultację, gdy trudności utrzymują się, wpływają na codzienne funkcjonowanie albo odpoczynek przestał przynosić ulgę. Rozmowa może być dobrym krokiem także wtedy, gdy nie jest Pan/Pani pewien, czy to wypalenie. Psycholog pomaga wspólnie uporządkować sytuację i przyjrzeć się źródłom przeciążenia, bez oceniania i bez obietnic szybkiego rozwiązania.</p>
      <h2 className="mt-12 text-4xl text-green">Jak może wyglądać praca nad wypaleniem?</h2>
      <p className="mt-4 leading-8 text-ink/80">Podczas konsultacji trwającej 50 minut rozmawiamy o Pana/Pani doświadczeniu, relacji z pracą, odpoczynku i ważnych relacjach. Dalsza praca zależy od potrzeb oraz wspólnych ustaleń. Może obejmować lepsze rozumienie emocji, rozpoznawanie powtarzających się wzorców i szukanie realnych sposobów dbania o granice. Terapia jest wsparciem, nie poradą ani gwarancją konkretnego efektu.</p>
      <p className="mt-4 leading-8 text-ink/80">Jeśli szuka Pan/Pani hasła „wypalenie zawodowe psycholog Wrocław”, zapraszam do gabinetu na Gaju. Spotkania odbywają się stacjonarnie przy ul. Ślicznej 24/28 oraz online. Forma zdalna może być wygodna przy intensywnej pracy lub dla osób mieszkających poza Wrocławiem.</p>
      <p className="mt-4 leading-8 text-ink/80">Ważne jest również odróżnienie przeciążenia od chwilowo trudnego tygodnia. Liczy się czas trwania i wpływ na życie, a nie porównywanie się z innymi. Konsultacja może pomóc nazwać własne doświadczenia oraz zastanowić się, jakie zmiany i granice są możliwe w obecnej sytuacji. Nie trzeba czekać na całkowity brak sił, aby poprosić o rozmowę.</p>
    </main>
  );
}
