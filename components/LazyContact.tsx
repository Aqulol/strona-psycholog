'use client';

import { lazy, Suspense, useEffect, useRef, useState } from 'react';

/**
 * Sekcja „Kontakt" ładowana leniwie (React.lazy + IntersectionObserver).
 *
 * Dlaczego: komponent Contact importuje na starcie SDK Firebase
 * (firebase/app + firebase/firestore, ~190 kB surowego JS), który jest
 * potrzebny dopiero przy wysyłce formularza. Dzięki lazy-load SDK i cały
 * komponent ładują się, gdy użytkownik zbliży się do sekcji Kontakt
 * (rootMargin 600px), a nie przy pierwszym załadowaniu strony.
 *
 * Kotwica #kontakt działa również przed załadowaniem: placeholder
 * trzyma id="kontakt" (i scroll-margin, by nagłówek nie zasłaniał sekcji),
 * a po zamontowaniu Contact przejmuje id na swoim <section>.
 *
 * Zasada działania formularza nie zmienia się: walidacja, zapis do
 * Firestore i komunikaty są identyczne (components/Contact.tsx).
 */
const Contact = lazy(() => import('./Contact'));

export default function LazyContact() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShow(true);
          observer.disconnect();
        }
      },
      // Ładuj, zanim sekcja wejdzie w viewport (scroll w dół).
      { rootMargin: '600px 0px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={show ? undefined : 'scroll-mt-20'}>
      {show ? (
        <Suspense
          fallback={
            <div className="section bg-white">
              <div className="container">
                <p className="py-16 text-center text-ink/60">Ładowanie sekcji kontaktowej…</p>
              </div>
            </div>
          }
        >
          <Contact />
        </Suspense>
      ) : (
        <div id="kontakt" className="section min-h-[320px] bg-white" aria-hidden="true" />
      )}
    </div>
  );
}
