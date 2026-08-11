import BlogRedirect from '../_BlogRedirect';

export const metadata = {
  title: 'Przeniesiono artykuł — Dlaczego ciągle wybieram podobnych partnerów?',
  robots: { index: false, follow: true },
};

export default function Page() {
  return <BlogRedirect to="/blog/dlaczego-wybieram-podobnych-partnerow" label="Dlaczego ciągle wybieram podobnych partnerów?" />;
}
