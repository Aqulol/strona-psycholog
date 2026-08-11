import BlogRedirect from '../_BlogRedirect';

export const metadata = {
  title: 'Przeniesiono artykuł — Relacja terapeutyczna jako źródło zmiany',
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <BlogRedirect
      to="/blog/relacja-terapeutyczna-zrodlo-zmiany"
      label="Co dzieje się między pacjentem a terapeutą? Relacja terapeutyczna jako źródło zmiany"
    />
  );
}
