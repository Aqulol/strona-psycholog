import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pierwsza wizyta u psychologa – jak wygląda i czego się spodziewać',
  description: 'Pierwsza wizyta u psychologa we Wrocławiu: sprawdź, jak wygląda konsultacja, ile trwa, o czym rozmawiamy i czy trzeba przygotować się do spotkania.',
};

export default function Page() {
  return (
    <main id="tresc" className="container section max-w-3xl">
      <Link href="/" className="text-green underline">← Strona główna</Link>
      <h1 className="mt-8 text-5xl leading-tight text-green md:text-6xl">Pierwsza wizyta u psychologa – jak wygląda i czego się spodziewać</h1>
      <p className="mt-6 leading-8 text-ink/80">Myśl o pierwszym spotkaniu może budzić napięcie. Marek, 41 lat, długo odkładał kontakt po rozstaniu, bo wstydził się opowiadać o swoich trudnościach. Studentka, która zgłosiła się w czasie kryzysu, obawiała się, że nie będzie umiała nazwać tego, co czuje. Takie obawy są częste. Nie trzeba radzić sobie samemu ani mieć gotowej historii, aby umówić rozmowę.</p>
      <h2 className="mt-12 text-4xl text-green">Jak wygląda pierwsza wizyta u psychologa?</h2>
      <p className="mt-4 leading-8 text-ink/80">Pierwsze spotkanie jest konsultacją i trwa 50 minut. Rozmawiamy o tym, co skłoniło Pana/Panią do szukania wsparcia, jak wygląda obecna sytuacja oraz czego potrzebuje Pan/Pani w tym momencie. Można zacząć od kilku zdań, nawet jeśli trudno od razu uporządkować myśli. Wspólnie sprawdzamy, jaka forma pracy może być odpowiednia. Nie jest to egzamin ani test.</p>
      <p className="mt-4 leading-8 text-ink/80">Nie trzeba specjalnie się przygotowywać. Nie trzeba też opowiadać wszystkiego naraz ani mówić o sprawach, na które nie jest Pan/Pani gotowy. Tempo rozmowy ustalamy wspólnie. Pytania są zaproszeniem do rozmowy, a nie obowiązkiem udzielania wyczerpujących odpowiedzi.</p>
      <h2 className="mt-12 text-4xl text-green">Dyskrecja i decyzja bez zobowiązania</h2>
      <p className="mt-4 leading-8 text-ink/80">Rozmowa odbywa się z poszanowaniem poufności i dyskrecji, zgodnie z zasadami wykonywania zawodu oraz ochrony danych. Podczas konsultacji może Pan/Pani zapytać o sposób pracy, zasady spotkań i swoje wątpliwości. Sama wizyta nie zobowiązuje do rozpoczęcia psychoterapii. Po spotkaniu można spokojnie zastanowić się, czy proponowana forma wsparcia odpowiada Pana/Pani potrzebom.</p>
      <h2 className="mt-12 text-4xl text-green">Wrocław Gaj i spotkania online</h2>
      <p className="mt-4 leading-8 text-ink/80">Jeśli interesuje Pana/Panią pierwsza wizyta u psychologa we Wrocławiu, zapraszam do gabinetu na Gaju przy ul. Ślicznej 24/28. Dostępna jest także forma online, wybierana przez osoby, którym łatwiej rozmawiać z domu albo mieszkają poza Wrocławiem. W obu formach spotkanie trwa 50 minut i służy przede wszystkim spokojnemu poznaniu się.</p>
      <h2 className="mt-12 text-4xl text-green">Pierwszy krok może być prosty</h2>
      <p className="mt-4 leading-8 text-ink/80">Nie ma jednego właściwego powodu, aby szukać pomocy. Wystarczy poczucie, że obecne trudności są zbyt ciężkie, by pozostawać z nimi samemu. Kontakt i konsultacja pozwalają sprawdzić, czy rozmowa ze mną będzie dla Pana/Pani bezpieczną przestrzenią do dalszego namysłu.</p>
      <p className="mt-4 leading-8 text-ink/80">Może Pan/Pani przyjść z pytaniem o konkretną sytuację albo jedynie z poczuciem zagubienia. W gabinecie jest miejsce na niepewność, milczenie i stopniowe budowanie zaufania. Jeśli pojawią się pytania organizacyjne, omawiamy je spokojnie przed podjęciem dalszych decyzji. Ważne jest, aby forma kontaktu i dalsze kroki były dla Pana/Pani zrozumiałe.</p>
    </main>
  );
}
