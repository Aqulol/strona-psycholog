import BlogRedirect from '../_BlogRedirect';

export const metadata = {
  title: 'Przeniesiono artykuł — Dlaczego sama świadomość problemu nie wystarcza?',
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <BlogRedirect
      to="/blog/dlaczego-sama-swiadomosc-nie-wystarcza"
      label="„Wiem, skąd to się bierze, ale nadal tak robię” — dlaczego sama świadomość nie wystarcza?"
    />
  );
}
