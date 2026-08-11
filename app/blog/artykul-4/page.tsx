import BlogRedirect from '../_BlogRedirect';

export const metadata = {
  title: 'Przeniesiono artykuł — Czy przeszłość naprawdę ma aż takie znaczenie?',
  robots: { index: false, follow: true },
};

export default function Page() {
  return <BlogRedirect to="/blog/czy-przeszlosc-ma-znaczenie" label="Czy przeszłość naprawdę ma aż takie znaczenie?" />;
}
