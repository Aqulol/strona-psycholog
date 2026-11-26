import { notFound } from 'next/navigation';
import BookingSidebar from '../../../components/BookingSidebar';
import { Crumbs, Json, SeeAlso } from '../../../components/Site';
import { webPage } from '../../../lib/entities';
import { helpTopics, topicPath } from '../../../lib/help-topics';
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
  return <main id="tresc" className="reading topic-page">
    <Crumbs path={path} title={t.label}/>
    <Json data={webPage(path, heading, t.description)}/>
    <div className="topic-layout">
      <article>
        <p className="eyebrow">{t.group}</p>
        <h1>{heading}</h1>
        <p className="hero-copy">{t.intro}</p>
        {t.urgent && <p className="topic-safety"><strong>W bezpośrednim zagrożeniu życia lub zdrowia należy zadzwonić pod <a href="tel:112">112</a>.</strong> Planowa konsultacja nie zastępuje pilnej pomocy. Całodobowe wsparcie dla dorosłych: <a href="tel:116123">116 123</a>; dla dzieci i młodzieży: <a href="tel:116111">116 111</a>.</p>}
        <p className="topic-mobile-booking"><a href="#rezerwacja">Przejdź do rezerwacji</a></p>
        {t.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}
        <section><h2>Pierwsza konsultacja</h2><p>Pierwsze spotkanie służy poznaniu sytuacji i oczekiwań oraz omówieniu możliwych form dalszej pomocy. Nie zobowiązuje do rozpoczęcia psychoterapii. Więcej informacji: <a href={paths.consult}>konsultacje psychologiczne we Wrocławiu i online</a>.</p></section>
        {t.sources && <section><h2>Źródła</h2><ul>{t.sources.map(([url, label]) => <li key={url}><a href={url} rel="noreferrer">{label}</a></li>)}</ul></section>}
        <SeeAlso links={[...t.related, [paths.method, 'Jak pracuję w nurcie psychodynamicznym']]}/>
      </article>
      <BookingSidebar/>
    </div>
  </main>;
}
