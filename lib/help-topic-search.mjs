const normalize = text => text.toLocaleLowerCase('pl').normalize('NFD').replace(/\p{M}/gu, '').replace(/ł/g, 'l');
const ignored = new Set(['w', 'z', 'ze', 'przed', 'od', 'do', 'na', 'i', 'sie']);

export function searchWords(query) {
  const tokens = normalize(query).match(/[a-z0-9]+/g) ?? [];
  return tokens.filter(word => !ignored.has(word));
}

export function matchesTopic(words, label, aliases = '') {
  const candidates = searchWords(`${label} ${aliases}`);
  return words.every(word => candidates.some(candidate => {
    if (candidate.startsWith(word)) return true;
    // Conservative prefix comparison for longer Polish inflected words; aliases cover irregular forms.
    const prefix = word.length >= 6 ? word.slice(0, -2) : word;
    return word.length >= 6 && candidate.startsWith(prefix);
  }));
}

export const searchTerms = {
  'zaburzenia-lekowe': 'nerwica niepokój zamartwianie',
  'lek-spoleczny': 'fobia społeczna nieśmiałość obawa przed oceną strach przed oceną',
  'niska-samoocena': 'samoocena brak pewności siebie',
  'niestabilna-samoocena': 'poczucie własnej wartości samoocena',
  'samoocena-mlodziezy': 'samoocena pewność siebie nastolatka',
  'trudnosci-ze-snem': 'sen zasypianie bezsenność pobudki',
  'narcyzm': 'narcystyczny uznanie',
  'zaloba': 'śmierć strata bliskiej osoby',
  'dda': 'alkohol alkoholizm w domu',
  'radzenie-sobie-ze-zloscia': 'złość gniew irytacja',
  'powracajace-wspomnienia': 'trudne wspomnienia koszmary',
  'doswiadczenie-przemocy': 'przemoc trauma bezpieczeństwo',
  'rozstanie-i-rozwod': 'rozpad związku separacja',
  'stres-szkolny': 'przeciążenie nauka nastolatek',
  'nadmierne-analizowanie': 'overthinking ruminacje analizowania roztrząsanie zamartwianie',
  'problemy-w-relacjach': 'toksyczny związek toksyczne związki toksycznych związków',
  'powtarzajace-sie-trudnosci-w-relacjach': 'toksyczny związek toksyczne związki toksycznych związków schematy',
  'depresja': 'brak motywacji przygnębienie anhedonia',
  'wypalenie-zawodowe': 'brak motywacji zmęczenie pracą',
  'nadwrazliwosc-na-krytyke': 'strach przed oceną obawa krytyka krytyki krytyką',
  'nadmierne-poczucie-winy': 'wyrzuty sumienia winy wina poczucia',
  'lek-przed-porazka': 'strach przed niepowodzeniem porażki niepowodzenie',
  'perfekcjonizm': 'bycie perfekcjonistą perfekcjonistka perfekcjonistki perfekcjonista',
  'trudnosci-w-podejmowaniu-decyzji': 'niezdecydowanie dylemat decyzja',
  'natlok-mysli': 'gonitwa myśli chaos dużo myśli',
  'zaburzenia-psychosomatyczne': 'psychosomatyka dolegliwości fizyczne',

};
