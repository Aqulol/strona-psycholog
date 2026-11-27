import KnowledgePage from '../../components/KnowledgePage';
import { meta, paths } from '../../lib/site';
import { services } from '../../lib/services';
const path = '/materialy-psychologiczne/';
const title = 'Materiały psychologiczne do wydruku';
const description = 'Bezpłatne listy pytań przed konsultacją i diagnostyką oraz karty refleksji nad emocjami i relacjami. Bez rejestracji.';
export const metadata = meta(path,title,description);
const sheets = [
  ['konsultacja','Przed pierwszą konsultacją',['Co skłoniło mnie do kontaktu właśnie teraz?', 'Jaka jedna sytuacja najlepiej pokazuje, z czym jest mi trudno?', 'Co dotąd pomagało, choćby częściowo?', 'O co chcę zapytać w sprawie dalszej współpracy?']],
  ['diagnoza','Przed diagnostyką psychologiczną',['Na jakie pytanie ma odpowiedzieć ocena?', 'Od kiedy zauważam trudności i w których sytuacjach występują?', 'Jakie wcześniejsze oceny lub informacje mogą się przydać? Zapytam, czy i jak je udostępnić.', 'Czy potrzebuję konkretnej formy podsumowania i do jakiego celu?', 'Co obejmuje koszt, jaki jest przewidywany przebieg i czy ta ścieżka jest odpowiednia dla mojego wieku?']],
  ['adhd','Przed diagnozą ADHD',['Jak uwaga, organizacja lub impulsywność wpływają na moje codzienne zadania?', 'Jak wyglądało to wcześniej, np. w domu i w szkole?', 'W jakich okolicznościach trudności maleją lub się nasilają?', 'Jak wygląda mój sen? Z jakiej pomocy korzystam obecnie?']],
  ['emocje','Karta refleksji nad emocjami',['Co się wydarzyło? Jak odróżniam opis sytuacji od swojej interpretacji?', 'Co poczułem lub poczułam? Jak silne było to odczucie?', 'Jak zareagowałem lub zareagowałam? Czego wtedy potrzebowałem lub potrzebowałam?', 'Co zauważam, gdy wracam do sytuacji po czasie?']],
  ['relacje','Karta refleksji nad relacją',['Co wydarzyło się między nami i czego oczekiwałem lub oczekiwałam?', 'Co było dla mnie ważne? Czy powiedziałem lub powiedziałam o tym wprost?', 'Czy moja reakcja przypomina sposób reagowania w innych sytuacjach?', 'Jaki jeden krok lub jaką granicę chcę następnym razem rozważyć?']],
] as const;
export default function Page(){return <KnowledgePage path={path} title={title} description={description} collection>
  <p>Wybierz kartę i wydrukuj stronę lub zapisz ją jako PDF w oknie drukowania przeglądarki. Nie trzeba zakładać konta ani podawać danych. Notatki można prowadzić na własnej kartce; nie przesyłaj ich przez stronę.</p>
  <p className="education-download"><a href="/materialy/karty-psychologiczne.pdf" download>Pobierz zestaw pięciu kart (PDF)</a></p>
  <p>To propozycje do namysłu, nie test ani zastępstwo diagnozy lub psychoterapii.</p>
  <nav aria-label="Materiały"><ul>{sheets.map(([id,name])=><li key={id}><a href={`#${id}`}>{name}</a></li>)}</ul></nav>
  {sheets.map(([id,name,items])=><section className="education-sheet" key={id} id={id}><h2>{name}</h2><ul>{items.map(item=><li key={item}>{item}</li>)}</ul><p>psychologplebaniak.pl</p></section>)}
  <p><a href={paths.consult}>Jak przebiega konsultacja</a>{' · '}<a href={services.adhd.href}>Jak przebiega ocena ADHD</a></p>
</KnowledgePage>}
