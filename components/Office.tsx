import { MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { config } from '../lib/config';

const photos = [
  {
    src: '/images/gabinet.webp',
    alt: 'Przestrzeń do rozmowy we Wrocławiu (Gaj)',
    width: 1280,
    height: 1707,
  },
  {
    src: '/images/gabinet-fotel.webp',
    alt: 'Gabinet – fotel',
    width: 1280,
    height: 1707,
  },
  {
    src: '/images/gabinet-detal-1.webp',
    alt: 'Gabinet – detal wnętrza',
    width: 1280,
    height: 960,
  },
  {
    src: '/images/gabinet-detal-2.webp',
    alt: 'Gabinet – detal wnętrza',
    width: 1280,
    height: 1707,
  },
];

/** Sekcja „Gabinet” – galeria zdjęć, mapa dojazdu i informacje o lokalizacji. */
export default function Office() {
  return (
    <section id="gabinet" className="section bg-cream">
      <div className="container">
        <SectionHeading title="Gabinet" />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {photos.map((photo, index) => (
            <Reveal key={photo.src} delay={(index % 4) * 80}>
              <div className="overflow-hidden rounded-xl border border-border">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  className="gallery-zoom aspect-[3/4] w-full object-cover transition-transform duration-500 ease-out hover:scale-110"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
          <Reveal>
            <iframe
              src={config.mapsUrl}
              title="Mapa dojazdu do gabinetu – Wrocław Gaj"
              loading="lazy"
              className="h-full min-h-64 w-full rounded-xl border border-border"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="flex h-full flex-col justify-center rounded-xl border border-border bg-cream p-6 lg:p-8">
              <h3 className="text-2xl text-green lg:text-3xl">Dojazd</h3>
              <ul className="mt-4 space-y-3 text-lg text-ink/80">
                <li className="flex items-start gap-3">
                  <MapPin aria-hidden="true" className="mt-1 shrink-0 text-green" size={22} />
                  <span>
                    <strong>{config.address}</strong>
                    <br />
                    Wrocław, osiedle Gaj
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-base leading-7 text-ink/70">
                Gabinet mieści się w Soméntiq – Centrum Psychologii i Psychoterapii
                (ul. Śliczna 28/24). Wejście i piętro podane są w kalendarzu rezerwacji
                oraz w wiadomości potwierdzającej wizytę.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
