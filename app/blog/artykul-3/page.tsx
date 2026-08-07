import BlogRedirect from '../_BlogRedirect';

export const metadata = {
  title: 'Przeniesiono artykuł — Pierwsza wizyta u psychologa',
  robots: { index: false, follow: true },
};

export default function Page() {
  return <BlogRedirect to="/blog/pierwsza-wizyta-u-psychologa" label="Pierwsza wizyta u psychologa — jak wygląda i czego się spodziewać" />;
}
