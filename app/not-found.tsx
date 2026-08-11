import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: '404 — strona nie istnieje',
  description:
    'Nie znaleźliśmy tej strony. Adres mógł się zmienić — wróć na stronę główną lub zajrzyj na bloga gabinetu psychologicznego we Wrocławiu.',
};

/**
 * Strona 404 – spokojny komunikat w stylu serwisu (krem, zieleń, złoto),
 * z tym samym nagłówkiem i stopką co pozostałe podstrony.
 * W eksporcie statycznym Next generuje z niej out/404.html.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="tresc" className="section bg-cream">
        <div className="container max-w-2xl">
          <p className="eyebrow">Błąd 404</p>
          <h1 className="mt-5 text-5xl leading-tight text-green md:text-6xl">Tej strony nie ma</h1>
          <p className="my-7 text-lg leading-8 text-ink/80">
            Adres mógł się zmienić, a strona mogła zostać przeniesiona. Spokojnie — znajdziesz to, czego
            szukasz, na stronie głównej albo na blogu.
          </p>
          <div className="flex flex-wrap gap-3 lg:gap-4">
            <Link
              href="/"
              className="rounded bg-green px-6 py-3.5 text-base font-medium text-white transition-colors hover:bg-green/90"
            >
              Wróć na stronę główną
            </Link>
            <Link
              href="/blog"
              className="rounded border border-green px-6 py-3.5 text-base font-medium text-green transition-colors hover:bg-green/5"
            >
              Zobacz bloga
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
