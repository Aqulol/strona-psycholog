import drafts from '../content/glossary.json';
export const glossarySources:Record<string,{label:string;href?:string}>={
 mcwilliams:{label:'Nancy McWilliams (2011), Psychoanalytic Diagnosis, wyd. 2, Guilford Press.'},
 tfp:{label:'Frank Yeomans, John Clarkin, Otto Kernberg (2015), Transference-Focused Psychotherapy for Borderline Personality Disorder: A Clinical Guide, American Psychiatric Publishing.'},
 gabbard:{label:'Glen Gabbard (2017), Long-Term Psychodynamic Psychotherapy: A Basic Text, wyd. 3, American Psychiatric Association Publishing.'},
 who:{label:'WHO (2024), Clinical descriptions and diagnostic requirements for ICD-11 mental, behavioural and neurodevelopmental disorders.',href:'https://www.who.int/publications/i/item/9789240077263'},
 diamond:{label:'Adele Diamond (2013), Executive Functions, Annual Review of Psychology, 64:135–168.',href:'https://doi.org/10.1146/annurev-psych-113011-143750'},
};
export type GlossaryEntry = typeof drafts[number] & {updated?:string; reviewer?:string};
export const reviewedTerms=(drafts as GlossaryEntry[]).filter(term=>term.status==='reviewed' && Boolean(term.updated && term.reviewer));
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
