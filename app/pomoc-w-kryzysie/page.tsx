import KnowledgePage from '../../components/KnowledgePage';
import {crisisPath} from '../../lib/knowledge';
import {meta} from '../../lib/site';
const title='Pilna pomoc w kryzysie psychicznym';
const description='Numery i miejsca pilnej pomocy w Polsce przy zagrożeniu życia lub zdrowia oraz w kryzysie psychicznym. Gabinet nie prowadzi całodobowej pomocy ratunkowej.';
export const metadata={...meta(crisisPath,title,description),referrer:'no-referrer' as const};
export default function Page(){return <KnowledgePage path={crisisPath} title={title} description={description}>
 <div className="diagnostic-note"><p><strong>W bezpośrednim zagrożeniu życia lub zdrowia należy zadzwonić pod <a href="tel:112">112</a>.</strong> Nie należy czekać na odpowiedź gabinetu ani na termin konsultacji.</p></div>
 <section><h2>Wsparcie telefoniczne i online</h2><ul><li>Dorośli: <a href="tel:116123">116 123</a> oraz <a href="https://116sos.pl/" rel="noreferrer">platforma 116sos.pl</a>.</li><li>Dzieci i młodzież: <a href="tel:116111">116 111</a> oraz <a href="https://116111.pl/" rel="noreferrer">telefon zaufania i kontakt online</a>.</li></ul></section>
 <section><h2>Myśli samobójcze lub samouszkodzenia</h2><p>Jeśli trudno zachować bezpieczeństwo lub doszło do urazu albo zatrucia, trzeba skorzystać z pilnej pomocy. Warto powiedzieć zaufanej osobie lub dorosłemu, co się dzieje i poprosić o pozostanie w kontakcie. Planowa konsultacja nie zastępuje oceny medycznej w nagłym zagrożeniu.</p><p><a href="https://www.gov.pl/web/zdrowie/gdzie-uzyskac-pomoc-psychologiczna-i-psychiatryczna" rel="noreferrer">Informacje Ministerstwa Zdrowia o dostępnej pomocy</a>.</p></section>
 </KnowledgePage>;}
