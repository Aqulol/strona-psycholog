import { config, consultationRate } from './config';
import { paths } from './site';
import { servicePaths } from './service-paths';

export const offerPath = '/oferta/';
export const categoryNames = { support: 'Pomoc psychologiczna', diagnosis: 'Diagnostyka psychologiczna', education: 'Psychoedukacja', therapy: 'Psychoterapia', online: 'Pomoc online' } as const;
export type Category = keyof typeof categoryNames;
type Status = 'provided' | 'guide' | 'reference';
const group = 'Dorośli i młodzież od 15. roku życia';
export type AssessmentDetails = {
  scope: string; method?: string; audience?: string; setting?: string;
  meetings?: string; duration?: string; fee?: string; tools?: string;
  feedback?: string; documentation?: string;
};
export const assessmentKeys = ['general','personality','adhd'] as const;
export const adhdAssessment = {key:'diagnoza-adhd',price:700, meetings:3, duration:'50 min'} as const;
export const adhdDuration = `${adhdAssessment.meetings} spotkania po ${adhdAssessment.duration.replace(' min',' minut')}`;
export const adhdDocumentation = 'Dokumentacja pisemna dodatkowo płatna; cena ustalana indywidualnie.';
export const firstAssessmentConsult = `${consultationRate.price} zł / ${consultationRate.duration}`;
export const psychoeducationTerms = 'Psychoedukacja jest metodą stosowaną podczas konsultacji psychologicznych i psychoterapii, nie osobną usługą ani rezerwacją.';
export const assessmentTerms = 'Cena standardowej konsultacji nie jest ceną pełnej diagnozy.';
type ServiceSpec = {
  name: string; href: string; category: Category; icon: string; description: string;
  assessment?: AssessmentDetails; status?: Status; audience?: string; online?: true; rate?: 'konsultacja' | 'psychoterapia'; book?: true;
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
  diagnostic: entry({assessment:{scope:'Omówienie kierunku dalszej oceny podczas standardowej konsultacji; nie jest to pełna diagnoza ani oddzielna rezerwacja.'},name:'Konsultacja diagnostyczna',href:servicePaths.diagnostic,category:'diagnosis',icon:'fileSearch',description:'Wstępne uporządkowanie pytań diagnostycznych a pełny proces oceny.',status:'guide'}),
  general: entry({assessment:{scope:'Pogłębiona ocena objawów i ich wpływu na codzienne życie.',method:'Wywiad kliniczny i klasyfikacje DSM-5, ICD-10 i ICD-11 stosowane stosownie do celu oceny.',audience:group,fee:`Pierwsza konsultacja: ${firstAssessmentConsult}. Dalszy zakres zależy od celu i zgłaszanych trudności. Psychoterapia nie jest wymagana.`},name:'Diagnoza psychologiczna',href:'/diagnoza-psychologiczna-wroclaw/',category:'diagnosis',icon:'analysis',description:'Pogłębiona ocena objawów, funkcjonowania psychicznego i możliwych wyjaśnień trudności.'}),
  personality: entry({assessment:{scope:'Ocena utrwalonych wzorców przeżywania, obrazu siebie i relacji.',method:'Wywiad kliniczny, perspektywa psychodynamiczna i diagnoza różnicowa.',audience:group,fee:`Pierwsza konsultacja: ${firstAssessmentConsult}. Dalszy zakres ustalamy indywidualnie; można zgłosić się wyłącznie na diagnozę.`},name:'Diagnoza osobowości',href:'/diagnoza-osobowosci-wroclaw/',category:'diagnosis',icon:'profile',description:'Ocena utrwalonych wzorców przeżywania, obrazu siebie, tożsamości i relacji.'}),
  adhd: entry({assessment:{scope:'Ocena trudności z uwagą, nadruchliwością lub impulsywnością.',method:'Wywiad o historii rozwoju, objawach i codzienności w różnych środowiskach.',setting:'Wyłącznie stacjonarnie we Wrocławiu',audience:group,meetings:adhdDuration,fee:`${adhdAssessment.price} zł – cały proces diagnostyczny, z pierwszą konsultacją w cenie.`,tools:'DIVA-5 tylko w diagnostyce dorosłych, jako część szerszej oceny klinicznej.',documentation:adhdDocumentation},name:'Diagnoza ADHD',href:'/diagnoza-adhd-wroclaw/',category:'diagnosis',icon:'brainSearch',description:'Ocena trudności z uwagą, nadruchliwością i impulsywnością z uwzględnieniem historii rozwoju.'}),
  edu: entry({name:'Psychoedukacja',href:'/psychoedukacja/',category:'education',status:'reference',icon:'book',description:'Metoda pracy podczas konsultacji i psychoterapii: rozumienie emocji, reakcji i relacji.'}),
  eduAdhd: entry({assessment:{scope:'Element konsultacji lub psychoterapii; nie zastępuje diagnozy ani leczenia.',method:'Rozmowa o konkretnych trudnościach z uwagą, organizacją, emocjami i reakcjami.'},name:'Psychoedukacja ADHD',href:'/psychoedukacja-adhd/',category:'education',status:'reference',icon:'brainBook',description:'Indywidualna rozmowa o funkcjonowaniu z ADHD i strategiach dopasowanych do codziennych trudności.'}),
  individual: entry({name:'Psychoterapia indywidualna',href:'/psychoterapia-indywidualna-wroclaw/',category:'therapy',icon:'growth',description:'Prowadzę psychoterapię indywidualną w nurcie psychodynamicznym, wykorzystując podejście skoncentrowane na przeniesieniu (TFP). Wspólnie przyglądamy się emocjom, relacjom i powtarzającym się wzorcom.',audience:group,online:true,rate:'psychoterapia'}),
  method: entry({status:'reference',name:'Psychoterapia psychodynamiczna',href:paths.method,category:'therapy',icon:'brain',description:'Praca nad emocjami i wzorcami, które powracają w relacjach, również w kontakcie terapeutycznym.',online:true}),
  tfp: entry({status:'reference',name:'Terapia skoncentrowana na przeniesieniu (TFP)',href:paths.tfp,category:'therapy',icon:'network',description:'Podejście psychodynamiczne, w którym ważnym źródłem obserwacji jest relacja podczas sesji.'}),
  onlineConsult: entry({name:'Konsultacje psychologiczne online',href:'/konsultacje-psychologiczne-online/',category:'online',icon:'monitor',description:'Pierwsza rozmowa na odległość: prywatność, warunki spotkania i granice tej formy pomocy.',audience:group,online:true,rate:'konsultacja'}),
  onlineTherapy: entry({status:'reference',name:'Psychoterapia online',href:paths.online,category:'online',icon:'video',description:'Regularna psychoterapia na odległość po uzgodnieniu, czy ten sposób pracy jest odpowiedni.',online:true}),
} as const;
export type ServiceKey = keyof typeof services;
export const categoryServices: Record<Category, readonly ServiceKey[]> = {
  support:['consult','counselling','crisis','parents','relationships','choice'],
  diagnosis:['diagnostic','general','personality','adhd'], education:['edu','eduAdhd'],
  therapy:['individual'], online:['onlineConsult'],
};
export const psychologyGroups = [
  { category:'support' as const, keys:[...categoryServices.support,'onlineConsult' as const] },
  { category:'diagnosis' as const, keys:categoryServices.diagnosis },
  { category:'education' as const, keys:categoryServices.education },
];
export const therapyKeys = ['method','tfp','onlineTherapy'] as const;
export const priceServices = [services.consult,services.individual];
