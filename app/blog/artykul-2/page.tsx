import BlogRedirect from '../_BlogRedirect';

export const metadata = {
  title: 'Przeniesiono artykuł — Psychoterapia psychodynamiczna',
  robots: { index: false, follow: true },
};

export default function Page() {
  return <BlogRedirect to="/blog/psychoterapia-psychodynamiczna" label="Kiedy warto skorzystać z psychoterapii psychodynamicznej?" />;
}
