import BlogRedirect from '../_BlogRedirect';

export const metadata = {
  title: 'Przeniesiono artykuł - metoda pracy',
  robots: { index: false, follow: true },
};

export default function Page() {
  return <BlogRedirect to="/psychoterapia-psychodynamiczna-wroclaw/" label="Metoda pracy - psychoterapia psychodynamiczna" />;
}
