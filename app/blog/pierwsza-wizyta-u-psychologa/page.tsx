import BlogRedirect from '../_BlogRedirect';

export const metadata = {
  title: 'Przeniesiono artykuł - Jak wybrać psychoterapeutę?',
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <BlogRedirect
      to="/konsultacje-psychologiczne-wroclaw/"
      label="Jak wybrać psychoterapeutę? Praktyczny przewodnik"
    />
  );
}
