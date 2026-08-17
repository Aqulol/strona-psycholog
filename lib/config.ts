export const config = {
  name: 'Grzegorz Plebaniak',
  title: 'Psycholog / psychoterapeuta',
  phone: '+48 693087574',
  email: 'g.plebaniak@somentiq.pl',
  address: 'ul. Śliczna 28/24, 50-566 Wrocław',
  postal: '50-566',
  bookingUrl: 'https://www.znanylekarz.pl/grzegorz-plebaniak/psycholog/wroclaw',
  mapsUrl: 'https://www.google.com/maps?q=Śliczna+28,+Wrocław&output=embed',

  // ===== Cennik — edytuj TU ręcznie (aktualizuj wg ZnanyLekarz) =====
  prices: [
    { key: 'konsultacja', name: 'Konsultacja psychologiczna', price: 160, duration: '50 min' },
    { key: 'psychoterapia', name: 'Psychoterapia', price: 140, duration: '50 min' },
  ],

  // ===== Firebase (wariant darmowy — Spark) =====
  // Formularz kontaktowy zapisuje wiadomości BEZPOŚREDNIO do Firestore
  // z przeglądarki (bez Cloud Functions i bez planu Blaze).
  //
  // SKĄD WZIĄĆ WARTOŚCI:
  //   1. Wejdź do konsoli Firebase: https://console.firebase.google.com
  //   2. Wybierz projekt „psychologplebaniak-e4480".
  //   3. Kliknij ikonę koła zębatego → Ustawienia projektu (Project settings).
  //   4. W sekcji „Twoje aplikacje" / „Your apps" znajdź aplikację internetową
  //      (z ikoną </>). Jeśli jej nie ma — kliknij „Utwórz aplikację internetową"
  //      (Add app → Web) i przejdź kreatora.
  //   5. W zakładce „SDK setup and configuration" wybierz „Config"
  //      i skopiuj cały obiekt firebaseConfig.
  //   6. Wklej poniższe wartości ZAMIAST placeholderów „TU-WPISZ-...".
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
  // MIEJSCE NA ID:
  // - GTM: Google Tag Manager → Administracja → kontener → ID w formacie GTM-XXXXXXX
  // - GA4: Google Analytics → Administracja → Strumienie danych → ID pomiaru w formacie G-XXXXXXXXXX
  // Dopóki pole zawiera placeholder (XXXX), skrypty się NIE ładują –
  // analityka ruszy dopiero po wpisaniu prawdziwego ID.
  gtmId: 'GTM-XXXXXXX',
  ga4Id: 'G-5YF0L6DJ1X',
};
