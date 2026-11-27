import KnowledgePage from '../../components/KnowledgePage';
import {patientPath,guidePath,crisisPath} from '../../lib/knowledge';
import {services} from '../../lib/services';
import {meta,paths} from '../../lib/site';
const title='Informacje dla pacjentów';
const description='Praktyczne informacje przed wizytą u psychologa we Wrocławiu: przygotowanie, rezerwacja, koszty, udział opiekunów oraz możliwości uzyskania pilnej pomocy.';
export const metadata=meta(patientPath,title,description);
export default function Page(){return <KnowledgePage path={patientPath} title={title} description={description} collection>
 <p className="hero-copy">Poniżej są informacje potrzebne przed wizytą w prywatnym gabinecie: od przygotowania do rozmowy po sprawy organizacyjne. Nie trzeba przychodzić z gotową diagnozą.</p>
 <nav aria-label="Na tej stronie"><ul><li><a href="#pierwsza">Pierwsze spotkanie</a></li><li><a href="#organizacja">Rezerwacja i koszty</a></li><li><a href="#poufnosc">Poufność i udział opiekunów</a></li><li><a href="#dalsza-pomoc">Wybór dalszej pomocy</a></li></ul></nav>
 <section id="pierwsza"><h2>Pierwsze spotkanie</h2><p>Można przygotować jeden przykład sytuacji i pytania, które warto zadać. Nie trzeba wcześniej wykonywać testów. W opisie <a data-context-link href={paths.consult}>konsultacji psychologicznej</a> wyjaśniam, kiedy pierwsza rozmowa może prowadzić do dalszych konsultacji.</p></section>
 <section id="organizacja"><h2>Rezerwacja, płatność i zmiana terminu</h2><p>Standardową konsultację można umówić w Booksy. <a href="/cennik/">Cennik</a> podaje stawki za konsultację i sesję psychoterapii, nie za cały proces diagnostyczny. O warunki zmiany terminu, płatność i koszty diagnostyki proszę <a href={paths.contact}>zapytać przed wizytą</a>. W wiadomości organizacyjnej nie trzeba opisywać stanu zdrowia.</p></section>
 <section id="poufnosc"><h2>Poufność i udział opiekunów</h2><p>Na pierwsze spotkanie z osobą niepełnoletnią zapraszam rodzica lub rodziców. Dalsze rozmowy z nastolatkiem odbywają się indywidualnie. Zasady zgody, udziału opiekunów i granice poufności omawiam przed regularną pracą; więcej w opisie <a data-context-link href={paths.youth}>pomocy dla młodzieży od 15. roku życia</a>.</p></section>
 <section id="dalsza-pomoc"><h2>Wybór dalszej pomocy</h2><p>Psycholog może pomóc w zrozumieniu trudności i przeprowadzić ocenę psychologiczną w zakresie swoich kompetencji. Psychiatra jest lekarzem i może rozważyć leczenie farmakologiczne. Psychoterapia to regularna praca na uzgodnionych zasadach. O różnicach piszę także na stronie <a data-context-link href={services.general.href}>diagnozy psychologicznej</a> i w <a href={guidePath}>przewodniku po formach pomocy</a>.</p><p>W nagłej sytuacji nie należy czekać na planową wizytę. <a href={crisisPath}>Gdzie szukać pilnej pomocy?</a></p></section>
 </KnowledgePage>;}
