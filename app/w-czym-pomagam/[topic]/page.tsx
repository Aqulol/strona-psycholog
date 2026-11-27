import ReadingTime from '../../../components/ReadingTime';
import { readingMinutes } from '../../../lib/reading-time';
import { topicDepth } from '../../../lib/help-topic-depth';
import { config } from '../../../lib/config';
import { notFound } from 'next/navigation';
import BookingSidebar from '../../../components/BookingSidebar';
import { Crumbs, Json, SeeAlso } from '../../../components/Site';
import { webPage } from '../../../lib/entities';
import { helpGroups, helpTopics, topicPath } from '../../../lib/help-topics';
import { meta, paths } from '../../../lib/site';

type Props = { params: Promise<{ topic: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return helpTopics.map(({ slug }) => ({ topic: slug })); }
async function getTopic(params: Props['params']) {
  const { topic } = await params;
  const item = helpTopics.find(({slug}) => slug === topic);
  if (!item) notFound();
  return item;
}
export async function generateMetadata({ params }: Props) {
  const t = await getTopic(params);
  return { ...meta(topicPath(t.slug), t.title, t.description), referrer: 'no-referrer' as const };
}
export default async function TopicPage({ params }: Props) {
  const t = await getTopic(params);
  const path = topicPath(t.slug);
  const heading = t.h1 ?? t.label;
  const depth = topicDepth[t.slug];
  const youth = t.group === helpGroups[8];
  const body = <>
        <p className="hero-copy">{t.intro}</p>
        {t.urgent && <p data-reading-ignore className="topic-safety"><strong>W bezpośrednim zagrożeniu życia lub zdrowia należy zadzwonić pod <a href="tel:112">112</a>.</strong> Planowa konsultacja nie zastępuje pilnej pomocy. Całodobowe wsparcie dla dorosłych: <a href="tel:116123">116 123</a>; dla dzieci i młodzieży: <a href="tel:116111">116 111</a>.</p>}
        <div data-reading-ignore className="topic-mobile-booking"><a className="booking" href={config.booksyUrl} rel="noreferrer">Umów wizytę w Booksy</a><p><a href="#rezerwacja">Przejdź do osadzonego kalendarza</a></p></div>
        {depth && <section data-topic-depth><h2>{depth[0]}</h2><p>{depth[1]}</p></section>}
        {t.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}
        <section><h2>Pierwsza konsultacja</h2><p>{t.firstVisit ?? 'Pierwsze spotkanie służy poznaniu sytuacji i oczekiwań oraz omówieniu możliwych form dalszej pomocy. Nie zobowiązuje do rozpoczęcia psychoterapii.'}</p>{youth && <p>Przyjmuję młodzież od 15. roku życia. Na pierwsze spotkanie z osobą niepełnoletnią zapraszam rodzica lub rodziców. Kolejne spotkania z młodą osobą odbywają się indywidualnie. Ramy współpracy i granice poufności omawiam podczas konsultacji.</p>}<p data-reading-ignore>Więcej informacji: <a href={paths.consult}>konsultacje psychologiczne we Wrocławiu i online</a>.</p></section>
        {t.slug === 'doswiadczenie-przemocy' && <p data-reading-ignore><a href="https://nidzica.policja.gov.pl/o12/aktualnosci/141999,Jestes-swiadkiem-lub-doswiadczasz-przemocy-domowej-Reaguj.html">Gdzie szukać pomocy w przypadku przemocy domowej – informacje Policji</a></p>}
        {t.faq && <section><h2>Najczęstsze pytania</h2><h3>{t.faq[0]}</h3><p>{t.faq[1]}</p></section>}
  </>;
  return <main id="tresc" className="reading topic-page">
    <Crumbs path={path} title={t.label}/>
    <Json data={webPage(path, heading, t.description)}/>
    <div className="topic-layout">
      <article>
        <p className="eyebrow">{t.group}</p>
        <h1>{heading}</h1>
        <p className="topic-reading-time"><ReadingTime minutes={readingMinutes(body)}/></p>
        {body}
        <SeeAlso links={[...t.related, ...(t.related.some(([url]) => url === (youth ? paths.youth : paths.adults)) ? [] : [[youth ? paths.youth : paths.adults, youth ? 'Psychoterapia młodzieży od 15. roku życia' : 'Psychoterapia indywidualna dorosłych'] as [string, string]]), [paths.method, 'Jak pracuję w nurcie psychodynamicznym']]}/>
      </article>
      <BookingSidebar/>
    </div>
  </main>;
}
