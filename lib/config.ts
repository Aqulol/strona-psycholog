export const config = {
  name: 'Grzegorz Plebaniak',
  title: 'Psycholog / psychoterapeuta',
  phone: '+48 693087574',
  email: 'g.plebaniak@somentiq.pl',
  address: 'ul. Śliczna 24/28, 50-566 Wrocław',
  postal: '50-566',
  // Endpoint Cloud Function wysyłającej e-maile z formularza.
  formEndpoint: 'https://europe-west1-psychologplebaniak-e4480.cloudfunctions.net/sendContactForm',
  bookingUrl: 'https://www.znanylekarz.pl/grzegorz-plebaniak/psycholog/wroclaw',
  mapsUrl: 'https://www.google.com/maps?q=Śliczna+24,+Wrocław&output=embed',

  // ===== Analityka (GTM + GA4) =====
  // MIEJSCE NA ID:
  // - GTM: Google Tag Manager → Administracja → kontener → ID w formacie GTM-XXXXXXX
  // - GA4: Google Analytics → Administracja → Strumienie danych → ID pomiaru w formacie G-XXXXXXXXXX
  // Dopóki pole zawiera placeholder (XXXX), skrypty się NIE ładują –
  // analityka ruszy dopiero po wpisaniu prawdziwego ID.
  gtmId: 'GTM-XXXXXXX',
  ga4Id: 'G-XXXXXXXXXX',
};
