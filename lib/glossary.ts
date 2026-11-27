import entries from '../content/glossary.json';
import sources from '../content/glossary-sources.json';
import {isPublishedTerm} from './glossary-policy.mjs';
export const glossarySources:Record<string,{label:string;href?:string}>=sources;
export type GlossaryEntry={slug:string;term:string;category:string;status:string;verification:string; definition:string;explanation:string;examples:string[];distinction:string;clinical?:string;related:string[];sources:string[];links:{href:string;label:string}[];synonyms:string[];english?:string;categories?:string[];sections?:{title:string;paragraphs:string[]}[];h1?:string;featured?:boolean;published?:string;updated?:string;reviewedAt?:string;author?:string;reviewer?:string};
export const reviewedTerms=(entries as GlossaryEntry[]).filter(isPublishedTerm).sort((a,b)=>a.term.localeCompare(b.term,'pl'));
// A curated index into already published explanations. Not separate draft entries.
export const publishedExplanations=[
 ['Borderline','Osobowość','/w-czym-pomagam/borderline/','Na czym polegają trudności opisywane w związku z tym rozpoznaniem?'],
 ['Diagnoza różnicowa','Diagnostyka','/diagnoza-psychologiczna-wroclaw/','Jak w ocenie porównuje się możliwe wyjaśnienia podobnych objawów?'],
 ['Funkcje wykonawcze','Funkcje poznawcze','/blog/adhd-u-doroslych/','Jak planowanie, zmiana strategii i utrzymywanie celu wpływają na zadania?'],
 ['Kontrakt terapeutyczny','Proces terapeutyczny','/psychoterapia-indywidualna-wroclaw/','Co uzgadnia się przed rozpoczęciem regularnej współpracy?'],
 ['Organizacja osobowości','Osobowość','/diagnoza-osobowosci-wroclaw/','Na czym polega różnica między modelem funkcjonowania a rozpoznaniem klinicznym?'],
 ['Przeniesienie','Proces terapeutyczny','/terapia-skoncentrowana-na-przeniesieniu-tfp/','Jak wzorce z innych relacji mogą pojawiać się podczas rozmowy?'],
 ['Ruminacje','Emocje i relacje','/w-czym-pomagam/nadmierne-analizowanie/','Co odróżnia uporczywe roztrząsanie od refleksji prowadzącej do wniosku?'],
 ['Superwizja','Proces terapeutyczny','/o-mnie/#superwizja','Do czego służy i co oznacza dla pracy w gabinecie?'],
 ['Łączenie obrazów siebie i innych','Osobowość','/terapia-skoncentrowana-na-przeniesieniu-tfp/','Jak model TFP opisuje integrację sprzecznych doświadczeń?'],
] as const;
