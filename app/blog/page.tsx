import type { Metadata } from 'next';
import Link from 'next/link';
import { CalendarDays, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Blog – artykuły o psychoterapii',
  description:
    'Artykuły o psychoterapii psychodynamicznej: schematy relacyjne, rola świadomości, relacja terapeutyczna i wpływ przeszłości. Spokojne teksty dla dorosłych.',
};

const posts = [
  {
    href: '/blog/dlaczego-wybieram-podobnych-partnerow',
    title: 'Dlaczego ciągle wybieram podobnych partnerów?',
    date: '11 sierpnia 2026',
    description:
      'Dlaczego kolejne związki bywają do siebie podobne? Poznaj nieświadome schematy relacyjne z perspektywy psychoterapii psychodynamicznej we Wrocławiu.',
    cover: '/covers/cover-partnerzy.svg',
  },
  {
    href: '/blog/dlaczego-sama-swiadomosc-nie-wystarcza',
    title: '„Wiem, skąd to się bierze, ale nadal tak robię” — dlaczego sama świadomość nie wystarcza?',
    date: '11 sierpnia 2026',
    description:
      'Rozumienie przyczyn to ważny krok, ale trwała zmiana wymaga emocjonalnego przepracowania. Wyjaśnia to psychoterapia psychodynamiczna we Wrocławiu.',
    cover: '/covers/cover-swiadomosc.svg',
  },
  {
    href: '/blog/relacja-terapeutyczna-zrodlo-zmiany',
    title: 'Co dzieje się między pacjentem a terapeutą? Relacja terapeutyczna jako źródło zmiany',
    date: '11 sierpnia 2026',
    description:
      'Czym są relacja terapeutyczna, przeniesienie i bezpieczne ramy terapii? Poznaj psychodynamiczne spojrzenie na terapię we Wrocławiu.',
    cover: '/covers/cover-relacja.svg',
  },
  {
    href: '/blog/czy-przeszlosc-ma-znaczenie',
    title: 'Czy przeszłość naprawdę ma aż takie znaczenie?',
    date: '11 sierpnia 2026',
    description:
      'Jak wcześniejsze doświadczenia wpływają na emocje i związki? Psychoterapia psychodynamiczna we Wrocławiu bada ich znaczenie dla teraźniejszości.',
    cover: '/covers/cover-przeszlosc.svg',
  },
];

/**
 * Podstrona /blog – lista artykułów w formie kart.
 * Spokojny, naturalny ton; każda karta prowadzi do pełnego wpisu.
 */
export default function BlogPage() {
  return (
    <>
      <Header />
      <main id="tresc" className="section bg-cream">
      <div className="container">
        <p className="eyebrow">Blog</p>
        <h1 className="mt-4 text-5xl leading-tight text-green md:text-6xl">Artykuły o psychoterapii</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/80">
          Teksty o tym, jak działają schematy relacyjne, czemu sama świadomość nie zmienia nawyków i czym jest
          praca w relacji terapeutycznej. Pisane spokojnym językiem, bez gotowych recept.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-8">
          {posts.map((post) => (
            <article
              key={post.href}
              className="flex h-full flex-col overflow-hidden rounded border border-border bg-white transition-shadow hover:shadow-md"
            >
              <div className="aspect-[1200/630] w-full overflow-hidden bg-cream">
                {/* Grafika dekoracyjna – bez znaczenia informacyjnego */}
                <img
                  src={post.cover}
                  alt=""
                  aria-hidden="true"
                  width={1200}
                  height={630}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <p className="flex items-center gap-2 text-sm text-ink/60">
                  <CalendarDays aria-hidden="true" size={18} />
                  {post.date}
                </p>
                <h2 className="mt-4 text-2xl text-green xl:text-3xl">
                  <Link href={post.href} className="hover:text-green/80">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-lg leading-8 text-ink/80">{post.description}</p>
                <Link
                  href={post.href}
                  className="mt-5 inline-flex items-center gap-2 text-base font-medium text-green underline hover:text-green/80"
                >
                  Czytaj więcej
                  <ArrowRight aria-hidden="true" size={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-12 text-lg leading-8 text-ink/80">
          Jeśli któryś z tematów jest Panu/Pani bliski i pojawia się pytanie o terapię — zapraszam do kontaktu
          lub rezerwacji terminu przez kalendarz online.
        </p>
        <Link
          href="/#kontakt"
          className="mt-6 inline-block rounded bg-green px-6 py-3.5 text-base font-medium text-white transition hover:bg-green/90 active:scale-[0.99]"
        >
          Skontaktuj się
        </Link>
      </div>
      </main>
      <Footer />
    </>
  );
}
