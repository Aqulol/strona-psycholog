// Curated editorial relationships. A label is not a diagnosis or a recommendation.
import {glossaryPath, crisisPath} from './knowledge';
import {services} from './services';
import {paths} from './site';
export type Relation = {href:string;label:string;kind:'Artykuły'|'Pojęcia'|'Formy pomocy'|'Powiązane trudności'};
const article=(slug:string,label:string):Relation=>({href:`/blog/${slug}/`,label,kind:'Artykuły'});
const term=(fragment:string,label:string):Relation=>({href:`${glossaryPath}#litera-${fragment}`,label,kind:'Pojęcia'});
const help=(slug:string,label:string):Relation=>({href:`/w-czym-pomagam/${slug}/`,label,kind:'Powiązane trudności'});
const form=(href:string,label:string):Relation=>({href,label,kind:'Formy pomocy'});
const personality=form(services.personality.href,'Jak wygląda ocena osobowości?');
const adhd=article('adhd-u-doroslych','ADHD u dorosłych: uwaga i codzienne zadania');
const prepare=article('jak-przygotowac-sie-do-diagnozy-adhd','Jak przygotować się do oceny ADHD?');
const traits=article('cechy-borderline-a-zaburzenie-osobowosci','Cechy borderline a rozpoznanie');
const compare=article('adhd-a-borderline-u-doroslych','ADHD a borderline u dorosłych');
const progress=article('jak-rozpoznac-postepy-w-psychoterapii','Jak rozpoznać postępy w psychoterapii?');
const anger=article('czy-mozna-zloscic-sie-na-psychoterapeute','Czy można złościć się na psychoterapeutę?');
const relations:Record<string,Relation[]>={
 '/w-czym-pomagam/borderline/':[article('tfp-dla-kogo','TFP: charakter i granice zastosowania'),term('O','Organizacja osobowości w indeksie pojęć')],
 '/w-czym-pomagam/zaburzenia-osobowosci/':[article('tfp-dla-kogo','Kiedy można rozmawiać o TFP?'),term('O','Organizacja osobowości w indeksie pojęć')],
 '/w-czym-pomagam/narcyzm/':[term('O','Organizacja osobowości'),help('niestabilna-samoocena','Niestabilna samoocena')],
 '/w-czym-pomagam/nadmierne-analizowanie/':[term('R','Ruminacje w indeksie pojęć'),help('natlok-mysli','Jak nadmierna analiza różni się od natłoku myśli?')],
 '/w-czym-pomagam/lek-przed-odrzuceniem/':[help('zaleznosc-emocjonalna','Potrzeba bliskości i obawa przed utratą relacji'),article('dlaczego-wybieram-podobnych-partnerow','Jak wzorzec może powtarzać się w związkach?')],
 '/w-czym-pomagam/depresja/':[form(crisisPath,'Pilna pomoc w sytuacji zagrożenia'),term('D','Diagnoza różnicowa')],
 '/w-czym-pomagam/doswiadczenie-przemocy/':[form(crisisPath,'Gdzie szukać pilnej pomocy?')],
 [services.general.href]:[help('depresja','Objawy depresyjne i obniżony nastrój'),help('zaburzenia-lekowe','Trudności lękowe'),term('D','Diagnoza różnicowa')],
 [services.personality.href]:[traits,compare,article('tfp-dla-kogo','TFP: na czym polega i kiedy je rozważyć?'),term('O','Organizacja osobowości w indeksie pojęć')],
 [services.adhd.href]:[prepare,compare,adhd,term('F','Funkcje wykonawcze w indeksie pojęć')],
 [services.eduAdhd.href]:[adhd,compare,term('F','Funkcje wykonawcze w indeksie pojęć')],
 '/blog/adhd-u-doroslych/':[prepare,compare,help('trudnosci-ze-snem','Jak trudności ze snem mogą wpływać na uwagę?'),term('F','Funkcje wykonawcze w indeksie pojęć')],
 '/blog/tfp-dla-kogo/':[help('borderline','Edukacja o borderline'),term('P','Przeniesienie w indeksie pojęć')],
 '/blog/narcyzm-wrazliwy/':[personality,term('O','Organizacja osobowości w indeksie pojęć')],
 [services.individual.href]:[progress,anger],
 '/blog/relacja-terapeutyczna-zrodlo-zmiany/':[progress,anger],
 '/blog/jak-przygotowac-sie-do-diagnozy-adhd/':[adhd,compare],
 '/blog/cechy-borderline-a-zaburzenie-osobowosci/':[compare,personality],
 '/blog/adhd-a-borderline-u-doroslych/':[traits,prepare],
 '/blog/jak-rozpoznac-postepy-w-psychoterapii/':[anger,article('relacja-terapeutyczna-zrodlo-zmiany','Relacja terapeutyczna jako źródło zmiany')],
 '/blog/czy-mozna-zloscic-sie-na-psychoterapeute/':[progress,article('relacja-terapeutyczna-zrodlo-zmiany','Relacja terapeutyczna jako źródło zmiany')],
 '/blog/pierwsze-spotkanie-mlodziez-rodzic/':[form(paths.youth,'Pomoc dla młodzieży od 15. roku życia')],
};
export function relatedContent(path:string){return (relations[path]??[]).filter(row=>row.href.split('#')[0]!==path);}
