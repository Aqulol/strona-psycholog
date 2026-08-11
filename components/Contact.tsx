'use client';

import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import SectionHeading from './SectionHeading';
import ContactInfo from './ContactInfo';

/**
 * Sekcja „Kontakt" – renderowana OD RAZU (nie-leniwie), bo nie importuje
 * SDK Firestore. Zawiera:
 *  - lewa kolumna: dane kontaktowe + rezerwacja online z kalendarzem
 *    ZnanyLekarz (ContactInfo) — anchor big_with_calendar trafia do
 *    początkowego HTML, więc widget.js przetwarza go na starcie;
 *  - prawa kolumna: formularz (ContactForm) ładowany LENIWIE
 *    (React.lazy + IntersectionObserver, rootMargin 600px) — dzięki temu
 *    SDK Firestore (~190 kB) pozostaje poza bundlem startowym.
 *
 * Kotwica #kontakt jest na <section> od początku (scroll-mt-20, by
 * przyklejony nagłówek nie zasłaniał sekcji po nawigacji z menu).
 */
const ContactForm = lazy(() => import('./ContactForm'));

export default function Contact() {
  const formRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShowForm(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShowForm(true);
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
    <section id="kontakt" className="section scroll-mt-20 bg-white">
      <div className="container">
        <SectionHeading title="Kontakt" />

        <div className="grid gap-10 md:grid-cols-2 lg:gap-14 xl:gap-16">
          <div>
            <ContactInfo />
          </div>

          <div ref={formRef}>
            {showForm ? (
              <Suspense
                fallback={
                  <p className="py-16 text-center text-ink/60">Ładowanie formularza…</p>
                }
              >
                <ContactForm />
              </Suspense>
            ) : (
              <div className="min-h-[320px]" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
