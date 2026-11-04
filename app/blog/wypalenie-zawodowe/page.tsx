import BlogRedirect from '../_BlogRedirect';

export const metadata = {
  title: 'Przeniesiono artykuł — obszary pomocy',
  robots: { index: false, follow: true },
};

export default function Page() {
  return <BlogRedirect to="/#obszary" label="Obszary pomocy — wypalenie zawodowe" />;
}
