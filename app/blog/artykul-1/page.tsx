import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Jak radzić sobie z lękiem we Wrocławiu?',
  description:
    'Jak radzić sobie z lękiem we Wrocławiu? Poznaj typowe objawy lęku, proste sposoby samopomocy i sprawdź, kiedy warto umówić konsultację u psychologa na Gaju.',
};

export default function Page() {
  return (
    <main id="tresc" className="container section max-w-3xl">
      <Link href="/" className="text-green underline">
        ← Strona główna
      </Link>
      <h1 className="mt-8 text-5xl leading-tight text-green md:text-6xl">
        Jak radzić sobie z lękiem we Wrocławiu?
      </h1>
      <p className="mt-6 leading-8 text-ink/80">
        Lęk potrafi pojawić się nagle, bez wyraźnego powodu, i towarzyszyć w codziennych sytuacjach: w pracy,
        w tramwaju, wieczorem w domu. Może mieć postać napięcia, natłoku myśli albo niepokoju o przyszłość.
        Ważne jest jedno: lęk nie jest oznaką słabości. To naturalna reakcja organizmu na zagrożenie, które
        czasem trudno nazwać. Jeśli wraca często i utrudnia życie, warto przyjrzeć mu się bliżej – najlepiej ze
        wsparciem specjalisty.
      </p>

      <h2 className="mt-12 text-4xl text-green">Czym jest lęk i jak się objawia</h2>
      <p className="mt-4 leading-8 text-ink/80">
        Lęk różni się od zwykłego stresu. Stres zwykle mija, gdy znika sytuacja, która go wywołuje. Lęk bywa
        bardziej rozlany – towarzyszy nawet wtedy, gdy nie ma konkretnego zagrożenia. Ciało może reagować
        napięciem mięśni, przyspieszonym biciem serca, trudnościami ze snem albo koncentracją. Psycholog
        pomaga rozpoznać te sygnały i zrozumieć, co się za nimi kryje.
      </p>

      <h2 className="mt-12 text-4xl text-green">Jak wspierać siebie na co dzień</h2>
      <p className="mt-4 leading-8 text-ink/80">
        Nie ma jednej metody, która działa dla każdego, ale kilka prostych nawyków potrafi obniżyć napięcie:
        regularny sen, ruch na świeżym powietrzu, ograniczenie kawy i alkoholu, a przede wszystkim rozmowa o
        tym, co trudne. Warto też zauważać małe momenty wytchnienia i nie oceniać siebie za to, że lęk się
        pojawia. To nie są zamienniki terapii ani porady medycznej – to elementy, które mogą wspierać
        codzienne funkcjonowanie.
      </p>
      <p className="mt-4 leading-8 text-ink/80">
        Pomocne bywa też nazywanie emocji – zwykłe dopowiedzenie sobie, że „czuję niepokój”, a nie „coś ze mną
        nie tak”, potrafi nieco zmniejszyć zamęt w głowie. Warto szukać tego, co przynosi ulgę w konkretnej
        sytuacji: spacer po parku, oddech, telefon do bliskiej osoby. Każda osoba ma inne zasoby – celem nie
        jest idealne opanowanie lęku, lecz lepsze radzenie sobie z nim na co dzień.
      </p>

      <h2 className="mt-12 text-4xl text-green">Kiedy warto szukać wsparcia psychologa we Wrocławiu</h2>
      <p className="mt-4 leading-8 text-ink/80">
        Z pomocy psychologa warto skorzystać, gdy lęk utrzymuje się tygodniami, wpływa na sen, relacje albo
        pracę – lub gdy pojawiają się myśli, z którymi trudno zostać samemu. Wizyta u psychologa nie
        zobowiązuje do niczego: to okazja, by w spokoju opowiedzieć o swoim doświadczeniu. Gabinet na
        wrocławskim Gaju to miejsce, w którym można porozmawiać stacjonarnie lub online.
      </p>

      <h2 className="mt-12 text-4xl text-green">Jak wygląda pierwsza konsultacja</h2>
      <p className="mt-4 leading-8 text-ink/80">
        Konsultacja trwa 50 minut. Nie trzeba się do niej przygotowywać ani opowiadać wszystkiego naraz.
        Psycholog zapyta o to, co skłoniło Pana/Panią do zgłoszenia, i wspólnie zastanowicie się, jaka forma
        pomocy będzie odpowiednia. Tempo rozmowy zależy od Pana/Pani potrzeb. Psychoterapia psychodynamiczna
        pozwala przyjrzeć się emocjom, relacjom i powtarzającym się wzorcom, które mogą mieć związek z
        obecnym lękiem.
        W czasie konsultacji można spokojnie sprawdzić, jakie sytuacje nasilają napięcie i czego potrzebuje Pan/Pani,
        aby odzyskać poczucie większej stabilności. Nie trzeba mieć gotowej diagnozy ani dokładnie wiedzieć, od czego
        zacząć rozmowę.
      </p>

      <h2 className="mt-12 text-4xl text-green">O czym warto pamiętać</h2>
      <p className="mt-4 leading-8 text-ink/80">
        Lęk to trudne, ale możliwe do zrozumienia doświadczenie. Nie trzeba radzić sobie z nim w pojedynkę.
        Jeśli mieszka Pan/Pani we Wrocławiu lub okolicy, zapraszam do kontaktu – pierwszy krok bywa
        najtrudniejszy, ale może być początkiem realnej zmiany.
      </p>
    </main>
  );
}
