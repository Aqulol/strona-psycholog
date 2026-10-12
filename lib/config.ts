export const config = {
  name: 'Grzegorz Plebaniak',
  title: 'Psycholog / psychoterapeuta',
  phone: '+48 693087574',
  email: 'gpplebaniak@gmail.com',
  streetAddress: 'Zygmunta Krasińskiego 13',
  address: 'Zygmunta Krasińskiego 13, 50-449 Wrocław',
  postal: '50-449',
  bookingUrl: 'https://www.znanylekarz.pl/grzegorz-plebaniak/psycholog/wroclaw',
  officeUrl: 'http://centrumrownowagi.com',
  mapsUrl: 'https://www.google.com/maps?q=51.1066776,17.0434034&output=embed',

  // ===== Booksy — rezerwacja online (kalendarz w sekcji Kontakt) =====
  booksyId: '357056',
  booksyUrl: 'https://booksy.com/pl-pl/357056_psycholog-grzegorz-plebaniak_psychoterapia_13750_wroclaw',

  // ===== Cennik — edytuj TU ręcznie (zgodnie z aktualnym cennikiem Booksy) =====
  prices: [
    { key: 'konsultacja', name: 'Konsultacja psychologiczna', price: 200, duration: '50 min' },
    { key: 'psychoterapia', name: 'Psychoterapia', price: 200, duration: '50 min' },
  ],

  // ===== Firebase (wariant darmowy — Spark) =====
  // Formularz kontaktowy zapisuje wiadomości BEZPOŚREDNIO do Firestore
  // z przeglądarki (bez Cloud Functions i bez planu Blaze).
  //
  // Konfiguracja klienta jest już uzupełniona dla projektu
  // „psychologplebaniak-e4480". Jeśli zmienisz projekt Firebase,
  // pobierz jego nowy obiekt firebaseConfig z Project settings → Your apps → Web app.
  //
  // UWAGA: apiKey w aplikacji webowej Firebase jest PUBLICZNY (widoczny
  // w przeglądarce) — to normalne i bezpieczne, jeśli reguły Firestore
  // pozwalają tylko na ograniczony zapis (patrz firestore.rules).
  // Więcej: https://firebase.google.com/docs/projects/api-keys
  firebaseConfig: {
    apiKey: 'AIzaSyBebRlxqPzx_uNZNs2pZpZH9nCcwRgEwps',
    authDomain: 'psychologplebaniak-e4480.firebaseapp.com',
    projectId: 'psychologplebaniak-e4480',
    storageBucket: 'psychologplebaniak-e4480.firebasestorage.app',
    messagingSenderId: '794131052999',
    appId: '1:794131052999:web:6e6c2e7e011edbf7a041e2',
  },

  // ===== Analityka (GTM + GA4) =====
  // GA4 jest ładowane bezpośrednio (gtag.js) po wyrażeniu zgody w banerze
  // cookies — GTM NIE jest używane (pole celowo puste, aby nie było ryzyka
  // podwójnego zliczania odsłon). Jeśli kiedyś włączysz GTM:
  // Administracja → kontener → ID w formacie GTM-XXXXXXX i wpisz tutaj.
  gtmId: '',
  ga4Id: 'G-5YF0L6DJ1X',

  // ===== Współrzędne gabinetu — zweryfikowane dla nowego adresu =====
  geoLat: '51.1066776',
  geoLng: '17.0434034',
};
