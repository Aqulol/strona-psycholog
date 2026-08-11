/**
 * Strona przekierowująca ze starego adresu artykułu bloga na nowy.
 * Statyczna strona z meta refresh (httpEquiv) + linkiem do nowego adresu,
 * aby stare URL-e nie dawały 404 po zmianie slugów bloga.
 */
export default function BlogRedirect({ to, label }: { to: string; label: string }) {
  return (
    <main id="tresc" className="container section max-w-2xl">
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <h1 className="text-4xl text-green">Przeniesiono artykuł</h1>
      <p className="mt-4 leading-8 text-ink/80">
        Ten artykuł znajdziesz teraz pod adresem:{' '}
        <a href={to} className="text-green underline">
          {label}
        </a>
        .
      </p>
      <p className="mt-2 text-sm text-ink/70">Za chwilę nastąpi automatyczne przekierowanie.</p>
    </main>
  );
}
