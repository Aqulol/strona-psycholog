import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kiedy warto skorzystać z psychoterapii psychodynamicznej?',
  description:
    'Kiedy warto skorzystać z psychoterapii psychodynamicznej? Sprawdź, na czym polega ten nurt, komu może pomóc i kiedy warto umówić pierwszą konsultację.',
};

export default function Page() {
  return (
    <main id="tresc" className="container section max-w-3xl">
      <Link href="/" className="text-green underline">
        ← Strona główna
      </Link>
      <h1 className="mt-8 text-5xl leading-tight text-green md:text-6xl">
        Kiedy warto skorzystać z psychoterapii psychodynamicznej?
      </h1>
      <p className="mt-6 leading-8 text-ink/80">
        Psychoterapia psychodynamiczna to jedna z najlepiej udokumentowanych form terapii rozmową. Jej celem
        nie jest szybka porada, lecz lepsze rozumienie siebie: swoich emocji, relacji i powtarzających się
        wzorców. Dla kogo jest odpowiednia i kiedy warto się na nią zdecydować?
      </p>

      <h2 className="mt-12 text-4xl text-green">Na czym polega nurt psychodynamiczny</h2>
      <p className="mt-4 leading-8 text-ink/80">
        W podejściu psychodynamicznym zakładamy, że na obecne samopoczucie wpływają nie tylko bieżące
        wydarzenia, ale także wcześniejsze doświadczenia – zwłaszcza relacje z ważnymi osobami. Część tych
        wpływów pozostaje poza świadomością, dlatego w terapii przyglądamy się temu, co pojawia się w
        rozmowie: emocjom, skojarzeniom, a nawet trudnościom w kontakcie z terapeutą. To wszystko jest
        materiałem do pracy, a nie przedmiotem oceny.
      </p>
      <p className="mt-4 leading-8 text-ink/80">
        Wbrew pozorom terapia psychodynamiczna nie polega wyłącznie na rozmowie o przeszłości. Punktem wyjścia
        jest zawsze to, co dzieje się tu i teraz – w życiu oraz w samej relacji terapeutycznej. Wspólne
        zrozumienie powtarzających się wzorców bywa pierwszym krokiem do rzeczywistej zmiany, również w
        obszarach, które wydają się od dawna zamknięte.
      </p>

      <h2 className="mt-12 text-4xl text-green">Sygnały, że warto rozważyć psychoterapię</h2>
      <p className="mt-4 leading-8 text-ink/80">
        Psychoterapia może być pomocna, gdy:
      </p>
      <ul className="mt-2 list-disc space-y-2 pl-6 leading-8 text-ink/80">
        <li>odczuwa Pan/Pani długotrwały smutek, lęk lub wewnętrzną pustkę;</li>
        <li>powtarzają się trudne wzorce w relacjach – na przykład wybór osób, które ranią;</li>
        <li>pojawiają się nawracające kryzysy, trudności w pracy albo brak satysfakcji z życia;</li>
        <li>mimo zmian w otoczeniu samopoczucie się nie poprawia;</li>
        <li>chce Pan/Pani lepiej rozumieć siebie, a nie tylko doraźnie zmniejszyć objawy.</li>
      </ul>

      <h2 className="mt-12 text-4xl text-green">Czym psychoterapia różni się od rozmowy ze znajomym</h2>
      <p className="mt-4 leading-8 text-ink/80">
        Rozmowa z bliską osobą bywa bardzo ważna, ale ma inne cele. Znajomy zwykle doradza, pociesza albo
        dzieli się własnym doświadczeniem. Terapeuta nie doradza i nie ocenia – pomaga zauważać to, co w
        codziennym życiu umyka, i towarzyszy w trudnych emocjach. Regularne spotkania tworzą przestrzeń, która
        należy wyłącznie do Pana/Pani.
      </p>

      <h2 className="mt-12 text-4xl text-green">Jak przygotować się do pierwszej sesji</h2>
      <p className="mt-4 leading-8 text-ink/80">
        Nie trzeba niczego przygotowywać. Warto przyjść z tym, co aktualnie zajmuje myśli – to wystarczający
        początek. Konsultacja trwa 50 minut i służy temu, by opowiedzieć o powodach zgłoszenia oraz ustalić,
        czy psychoterapia psychodynamiczna będzie odpowiednią formą wsparcia. Jeśli zdecyduje się Pan/Pani na
        pracę, wspólnie ustalimy kontrakt: częstotliwość spotkań, zasady odwołań i płatności.
        Ustalenia te pomagają zadbać o przewidywalność i bezpieczeństwo wspólnej pracy. Można również omówić
        wątpliwości dotyczące nurtu, częstotliwości spotkań albo samej relacji terapeutycznej — takie pytania są
        ważną częścią pierwszych rozmów.
      </p>

      <h2 className="mt-12 text-4xl text-green">Kiedy psychoterapia nie wystarczy</h2>
      <p className="mt-4 leading-8 text-ink/80">
        Terapia rozmową nie zastępuje leczenia psychiatrycznego. Jeśli objawy są bardzo nasilone – trudno
        funkcjonować, pojawiają się myśli samobójcze albo nasilone objawy somatyczne – warto skonsultować się
        z lekarzem psychiatrą. Dobrze prowadzona terapia może iść w parze z opieką lekarską; obie formy
        wsparcia potrafią się uzupełniać.
      </p>

      <h2 className="mt-12 text-4xl text-green">Podsumowanie</h2>
      <p className="mt-4 leading-8 text-ink/80">
        Psychoterapia psychodynamiczna to propozycja dla osób, które chcą zrozumieć źródła swoich trudności, a
        nie tylko doraźnie je złagodzić. Jeśli rozpoznaje Pan/Pani u siebie któreś z opisanych sygnałów,
        zapraszam do kontaktu – konsultacja to dobry sposób, by sprawdzić, czy ta forma pracy jest dla
        Pana/Pani odpowiednia.
      </p>
    </main>
  );
}
