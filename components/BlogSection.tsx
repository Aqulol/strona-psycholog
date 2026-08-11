import Link from 'next/link';
import { CalendarDays, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const posts = [
  {
    href: '/blog/dlaczego-wybieram-podobnych-partnerow',
    title: 'Dlaczego ciągle wybieram podobnych partnerów?',
    date: '11 sierpnia 2026',
    lead: 'Zmieniają się imiona, okoliczności i początek znajomości, a jednak po pewnym czasie relacja zaczyna przypominać poprzednią.',
  },
  {
    href: '/blog/dlaczego-sama-swiadomosc-nie-wystarcza',
    title: '„Wiem, skąd to się bierze, ale nadal tak robię” — dlaczego sama świadomość nie wystarcza?',
    date: '11 sierpnia 2026',
    lead: 'Można trafnie rozumieć własny problem, znać jego historię i mimo to reagować tak samo.',
  },
  {
    href: '/blog/relacja-terapeutyczna-zrodlo-zmiany',
    title: 'Co dzieje się między pacjentem a terapeutą? Relacja terapeutyczna jako źródło zmiany',
    date: '11 sierpnia 2026',
    lead: 'Rozmowa w gabinecie może z zewnątrz przypominać każdą inną rozmowę, ale relacja terapeutyczna ma szczególną strukturę i cel.',
  },
  {
    href: '/blog/czy-przeszlosc-ma-znaczenie',
    title: 'Czy przeszłość naprawdę ma aż takie znaczenie?',
    date: '11 sierpnia 2026',
    lead: 'Psychoterapia psychodynamiczna bywa kojarzona z niekończącym się powracaniem do dzieciństwa. To uproszczenie.',
  },
];

/** Sekcja „Blog / Artykuły” na stronie głównej – karty wpisów. */
export default function BlogSection() {
  return (
    <section id="blog" className="section bg-cream">
      <div className="container">
        <SectionHeading title="Blog / Artykuły" />

        <div className="grid gap-5 md:grid-cols-2 lg:gap-8">
          {posts.map((post, index) => (
            <Reveal key={post.href} delay={index * 100}>
              <article className="flex h-full flex-col rounded border border-border bg-white p-6 transition-shadow hover:shadow-md lg:p-8">
                <p className="flex items-center gap-2 text-sm text-ink/60">
                  <CalendarDays aria-hidden="true" size={18} />
                  {post.date}
                </p>
                <h3 className="mt-4 text-2xl text-green xl:text-3xl">{post.title}</h3>
                <p className="mt-3 text-lg leading-8 text-ink/80">{post.lead}</p>
                <Link
                  href={post.href}
                  className="mt-5 inline-flex items-center gap-2 text-base font-medium text-green underline hover:text-green/80"
                >
                  Czytaj więcej
                  <ArrowRight aria-hidden="true" size={18} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
