const streetAddress = 'Zygmunta Krasińskiego 13A Oficyna';
const postal = '50-449';
const address = `${streetAddress}, ${postal} Wrocław`;
const mapQuery = encodeURIComponent(address);

export const consultationRate = { key: 'konsultacja', name: 'Konsultacja psychologiczna', price: 200, duration: '50 min' };
export const therapyRate = { key: 'psychoterapia', name: 'Psychoterapia', price: 200, duration: '50 min' };
export const visitRatesText = `Konsultacja psychologiczna: ${consultationRate.price} zł / ${consultationRate.duration}. Sesja psychoterapii: ${therapyRate.price} zł / ${therapyRate.duration}.`;

export const config = {
  name: 'Grzegorz Plebaniak',
  title: 'Psycholog, psychoterapeuta (w trakcie szkolenia)',
  phone: '+48 693087574',
  email: 'gpplebaniak@gmail.com',
  streetAddress,
  address,
  postal,
  bookingUrl: 'https://www.znanylekarz.pl/grzegorz-plebaniak/psycholog/wroclaw',
  officeUrl: 'https://centrumrownowagi.com/',
  mapsUrl: `https://www.google.com/maps?q=${mapQuery}&output=embed`,
  mapsLink: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,

  // ===== Booksy - rezerwacja online (kalendarz w sekcji Kontakt) =====
  booksyId: '357056',
  booksyUrl: 'https://booksy.com/pl-pl/357056_psycholog-grzegorz-plebaniak_psychoterapia_13750_wroclaw',

  // ===== Cennik - edytuj TU ręcznie (zgodnie z aktualnym cennikiem Booksy) =====
  prices: [consultationRate, therapyRate],


};

export const booksyWidgetUrl = `https://booksy.com/widget/index.html?id=${encodeURIComponent(config.booksyId)}&lang=pl&country=pl`;
