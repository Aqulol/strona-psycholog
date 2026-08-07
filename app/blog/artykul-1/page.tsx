import BlogRedirect from '../_BlogRedirect';

export const metadata = {
  title: 'Przeniesiono artykuł — Jak radzić sobie z lękiem?',
  robots: { index: false, follow: true },
};

export default function Page() {
  return <BlogRedirect to="/blog/jak-radzic-sobie-z-lekiem" label="Jak radzić sobie z lękiem?" />;
}
