import { config } from './config';
import { paths } from './site';
import { servicePaths } from './service-paths';

export const offerPath = '/oferta/';
export const categoryNames = { support: 'Pomoc psychologiczna', diagnosis: 'Diagnostyka psychologiczna', education: 'Psychoedukacja', therapy: 'Psychoterapia', online: 'Pomoc online' } as const;
export type Category = keyof typeof categoryNames;
type Status = 'provided' | 'guide';
const group = 'Dorośli i młodzież od 15. roku życia';
type ServiceSpec = {
  name: string; href: string; category: Category; icon: string; description: string;
  status?: Status; audience?: string; online?: true; rate?: 'konsultacja' | 'psychoterapia'; book?: true;
};
function entry({status = 'provided', rate, book, ...input}: ServiceSpec) {
  return { ...input, status, rate: config.prices.find(row => row.key === rate) ?? null, bookingUrl: book ? config.booksyUrl : null };
}
export const services = {
  consult: entry({name:'Konsultacja psychologiczna',href:paths.consult,category:'support',icon:'dialogue',description:'Rozmowa o aktualnych trudnościach, oczekiwaniach i możliwych dalszych krokach.',audience:group,online:true,rate:'konsultacja',book:true}),
  counselling: entry({name:'Poradnictwo psychologiczne',href:servicePaths.counselling,category:'support',icon:'compass',description:'Jak rozmowa pomaga uporządkować aktualną sytuację, potrzeby i możliwe decyzje.',status:'guide'}),
  crisis: entry({name:'Wsparcie psychologiczne w kryzysie',href:'/wsparcie-psychologiczne-w-kryzysie/',category:'support',icon:'support',description:'Kiedy umówić planową rozmowę w trudnym okresie, a kiedy szukać pilnej pomocy.',status:'guide'}),
  parents: entry({name:'Konsultacja dla rodziców',href:'/konsultacja-psychologiczna-dla-rodzicow/',category:'support',icon:'parents',description:'Jak rozmawiać z psychologiem o trudnościach emocjonalnych nastolatka i roli rodzica.',status:'guide'}),
  relationships: entry({name:'Konsultacja dotycząca trudności w relacjach',href:'/konsultacja-psychologiczna-problemy-w-relacjach/',category:'support',icon:'relationships',description:'Samotność, konflikty i powtarzające się wzorce jako tematy indywidualnej konsultacji.',status:'guide'}),
  choice: entry({name:'Konsultacja dotycząca wyboru psychoterapii',href:'/konsultacja-dotyczaca-wyboru-psychoterapii/',category:'support',icon:'choice',description:'Pytania, które warto zadać przed decyzją o rozpoczęciu regularnej psychoterapii.',status:'guide'}),
  diagnostic: entry({name:'Konsultacja diagnostyczna',href:servicePaths.diagnostic,category:'diagnosis',icon:'fileSearch',description:'Wstępne uporządkowanie pytań diagnostycznych a pełny proces oceny.',status:'guide'}),
  general: entry({name:'Diagnoza psychologiczna',href:'/diagnoza-psychologiczna-wroclaw/',category:'diagnosis',icon:'analysis',description:'Pogłębiona ocena objawów, funkcjonowania psychicznego i możliwych wyjaśnień trudności.'}),
  personality: entry({name:'Diagnoza osobowości',href:'/diagnoza-osobowosci-wroclaw/',category:'diagnosis',icon:'profile',description:'Ocena utrwalonych wzorców przeżywania, obrazu siebie, tożsamości i relacji.'}),
  adhd: entry({name:'Diagnoza ADHD',href:'/diagnoza-adhd-wroclaw/',category:'diagnosis',icon:'brainSearch',description:'Ocena trudności z uwagą, nadruchliwością i impulsywnością z uwzględnieniem historii rozwoju.'}),
  edu: entry({name:'Psychoedukacja',href:'/psychoedukacja/',category:'education',icon:'book',description:'Indywidualne spotkania pomagające zrozumieć emocje, reakcje i utrwalone wzorce.'}),
  eduAdhd: entry({name:'Psychoedukacja ADHD',href:'/psychoedukacja-adhd/',category:'education',icon:'brainBook',description:'Indywidualna rozmowa o funkcjonowaniu z ADHD i strategiach dopasowanych do codziennych trudności.'}),
  individual: entry({name:'Psychoterapia indywidualna',href:'/psychoterapia-indywidualna-wroclaw/',category:'therapy',icon:'growth',description:'Regularna praca z jedną osobą: od pierwszych rozmów do ustalenia celów i zasad współpracy.',audience:group,online:true,rate:'psychoterapia'}),
  method: entry({name:'Psychoterapia psychodynamiczna',href:paths.method,category:'therapy',icon:'brain',description:'Praca nad emocjami i wzorcami, które powracają w relacjach, również w kontakcie terapeutycznym.',audience:group,online:true,rate:'psychoterapia'}),
  tfp: entry({name:'Terapia skoncentrowana na przeniesieniu (TFP)',href:paths.tfp,category:'therapy',icon:'network',description:'Podejście psychodynamiczne, w którym ważnym źródłem obserwacji jest relacja podczas sesji.'}),
  onlineConsult: entry({name:'Konsultacje psychologiczne online',href:'/konsultacje-psychologiczne-online/',category:'online',icon:'monitor',description:'Pierwsza rozmowa na odległość: prywatność, warunki spotkania i granice tej formy pomocy.',audience:group,online:true,rate:'konsultacja'}),
  onlineTherapy: entry({name:'Psychoterapia online',href:paths.online,category:'online',icon:'video',description:'Regularna psychoterapia na odległość po uzgodnieniu, czy ten sposób pracy jest odpowiedni.',audience:group,online:true,rate:'psychoterapia'}),
} as const;
export type ServiceKey = keyof typeof services;
export const categoryServices: Record<Category, readonly ServiceKey[]> = {
  support:['consult','counselling','crisis','parents','relationships','choice'],
  diagnosis:['diagnostic','general','personality','adhd'], education:['edu','eduAdhd'],
  therapy:['individual','method','tfp'], online:['onlineConsult','onlineTherapy'],
};
export const psychologyGroups = [
  { category:'support' as const, keys:[...categoryServices.support,'onlineConsult' as const] },
  { category:'diagnosis' as const, keys:categoryServices.diagnosis },
  { category:'education' as const, keys:categoryServices.education },
];
export const therapyKeys = [...categoryServices.therapy,'onlineTherapy' as const];
export const priceServices = [services.consult,services.individual];
