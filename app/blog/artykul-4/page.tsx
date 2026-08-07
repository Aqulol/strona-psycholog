import BlogRedirect from '../_BlogRedirect';

export const metadata = {
  title: 'Przeniesiono artykuł — Wypalenie zawodowe',
  robots: { index: false, follow: true },
};

export default function Page() {
  return <BlogRedirect to="/blog/wypalenie-zawodowe" label="Wypalenie zawodowe — objawy i kiedy warto szukać pomocy" />;
}
