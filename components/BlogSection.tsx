import Link from 'next/link';
import { CalendarDays, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const posts = [
  {
    href: '/blog/artykul-1',
    title: 'Jak radzić sobie z lękiem we Wrocławiu',
    date: '[do uzupełnienia]',
    lead: 'Lęk bywa trudny do nazwania. Spokojny przewodnik po sygnałach, pierwszym kroku i wsparciu psychologa we Wrocławiu.',
  },
  {
    href: '/blog/artykul-2',
    title: 'Kiedy warto skorzystać z psychoterapii psychodynamicznej?',
    date: '[do uzupełnienia]',
    lead: 'Psychoterapia psychodynamiczna pomaga rozumieć powtarzające się trudności. Sprawdzamy, kiedy może być dobrym wyborem.',
  },
  {
    href: '/blog/artykul-3',
    title: 'Pierwsza wizyta u psychologa – jak wygląda i czego się spodziewać',
    date: '[do uzupełnienia]',
    lead: 'Spokojnie o pierwszym spotkaniu: konsultacja 50 minut, dyskrecja oraz forma stacjonarna na Gaju i online.',
  },
  {
    href: '/blog/artykul-4',
    title: 'Wypalenie zawodowe – objawy i kiedy warto szukać pomocy',
    date: '[do uzupełnienia]',
    lead: 'O sygnałach przeciążenia, utracie energii i tym, kiedy warto porozmawiać z psychologiem.',
  },
];

/** Sekcja „Blog / Artykuły” na stronie głównej – karty wpisów. */
export default function BlogSection() {
  return (
    <section id="blog" className="section bg-cream">
      <div className="container">
        <SectionHeading title="Blog / Artykuły">
          <p className="mb-8 max-w-2xl leading-7 text-ink/70">
            Spokojne teksty o emocjach, relacjach i psychoterapii – pisane z myślą o osobach, które szukają
            wsparcia we Wrocławiu.
          </p>
        </SectionHeading>

        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post, index) => (
            <Reveal key={post.href} delay={index * 100}>
              <article className="flex h-full flex-col rounded border border-border bg-white p-6 transition-shadow hover:shadow-md">
                <p className="flex items-center gap-2 text-sm text-ink/60">
                  <CalendarDays aria-hidden="true" size={16} />
                  {post.date}
                </p>
                <h3 className="mt-3 text-2xl text-green">{post.title}</h3>
                <p className="mt-3 leading-7 text-ink/80">{post.lead}</p>
                <Link
                  href={post.href}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-green underline hover:text-green/80"
                >
                  Czytaj więcej
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
