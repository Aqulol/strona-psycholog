import {AudioLines, Compass, Fingerprint, HeartHandshake, Layers, Sprout, Waves, Wind} from 'lucide-react';
import {helpTopics, topicPath} from './help-topics';
import {services} from './services';
import {faq} from './site';

function topic(slug:string, label:string) {
  if (!helpTopics.some(item => item.slug === slug)) throw new Error(`Nieznany temat strony głównej: ${slug}`);
  return {href:topicPath(slug), label};
}
export const homeTopics = [
  {Icon:Waves, title:'Nastrój i poczucie sensu', copy:'Kiedy trudno cieszyć się tym, co dawniej sprawiało przyjemność.', links:[topic('depresja','Depresja'),topic('poczucie-pustki','Poczucie pustki'),topic('brak-satysfakcji-z-zycia','Brak satysfakcji z życia')]},
  {Icon:Wind, title:'Lęk, stres i przeciążenie', copy:'Napięcie, zamartwianie się lub poczucie, że trudno odpocząć.', links:[topic('zaburzenia-lekowe','Zaburzenia lękowe'),topic('stres','Stres'),topic('wypalenie-zawodowe','Wypalenie zawodowe')]},
  {Icon:HeartHandshake, title:'Relacje i samotność', copy:'Gdy trudno zbliżyć się do innych lub powracają podobne konflikty.', links:[topic('samotnosc','Samotność'),topic('lek-przed-bliskoscia','Lęk przed bliskością'),topic('problemy-w-relacjach','Problemy w relacjach')]},
  {Icon:Compass, title:'Kryzysy i zmiany życiowe', copy:'Po stracie lub wtedy, gdy życie zmienia się szybciej, niż można się z tym oswoić.', links:[topic('rozstanie-i-rozwod','Rozstanie i rozwód'),topic('zaloba','Żałoba'),topic('wazne-zmiany-zyciowe','Ważne zmiany życiowe')]},
  {Icon:Fingerprint, title:'Poczucie własnej wartości i tożsamość', copy:'Surowa ocena siebie, niepewność i presja, by nie popełniać błędów.', links:[topic('niska-samoocena','Niska samoocena'),topic('perfekcjonizm','Perfekcjonizm'),topic('nadmierny-samokrytycyzm','Nadmierny samokrytycyzm')]},
  {Icon:Layers, title:'Osobowość i emocje', copy:'Intensywne uczucia i powracające sposoby reagowania w bliskich relacjach.', links:[topic('borderline','Borderline'),topic('narcyzm','Narcyzm'),topic('intensywne-emocje','Intensywne emocje')]},
  {Icon:AudioLines, title:'ADHD i codzienne funkcjonowanie', copy:'Uwaga, planowanie i reakcje, które trudno zatrzymać w danej chwili.', links:[{href:'/blog/adhd-u-doroslych/',label:'ADHD u dorosłych'},topic('impulsywnosc','Impulsywność'),{href:services.eduAdhd.href,label:'Psychoedukacja ADHD'}]},
  {Icon:Sprout, title:'Okres dorastania', copy:'Rozmowa o emocjach, zmianach i relacjach z młodzieżą od 15. roku życia.', links:[topic('samoocena-mlodziezy','Samoocena młodzieży'),topic('relacje-z-rowiesnikami','Relacje z rówieśnikami'),topic('trudnosci-emocjonalne-mlodziezy','Trudności emocjonalne młodzieży')]},
];

export const homeFaq = [
  faq[0], faq[1],
  ['Jak wygląda pierwsza konsultacja?', 'Rozmawiamy o tym, co skłoniło Cię do szukania pomocy. Jest też czas na pytania o zasady spotkań i możliwe dalsze kroki.'],
  ['Czy konsultacja zobowiązuje do rozpoczęcia psychoterapii?', 'Nie. Po konsultacji wspólnie omawiamy możliwości, a decyzja o dalszych spotkaniach należy do Ciebie.'],
  ['Jak często odbywają się sesje psychoterapii?', 'Zazwyczaj raz lub dwa razy w tygodniu. Częstotliwość ustalamy indywidualnie przed rozpoczęciem psychoterapii.'],
  ['Czy mogę skorzystać z pomocy online?', faq[2][1]],
  ['Jak wygląda pierwsza konsultacja osoby niepełnoletniej?', faq[3][1]],
  ['Czy potrzebuję skierowania lub wcześniejszej diagnozy?', 'Na prywatną konsultację możesz umówić się bez skierowania i wcześniejszej diagnozy.'],
];
