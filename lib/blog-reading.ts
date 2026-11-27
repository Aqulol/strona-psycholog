export type Reference = { author: string; year: number; title: string; publisher: string; href?: string };
const gabbard: Reference = { author: 'Gabbard, G. O.', year: 2017, title: 'Long-Term Psychodynamic Psychotherapy: A Basic Text (wyd. 3)', publisher: 'American Psychiatric Association Publishing' };
const mcWilliams: Reference = { author: 'McWilliams, N.', year: 2004, title: 'Psychoanalytic Psychotherapy: A Practitioner’s Guide', publisher: 'Guilford Press', href: 'https://www.guilford.com/books/Psychoanalytic-Psychotherapy/Nancy-McWilliams/9781593850098' };
export const blogReading: Record<string, Reference[]> = {
  'adhd-u-doroslych': [
    {author:'National Institute for Health and Care Excellence', year:2018, title:'Attention deficit hyperactivity disorder: diagnosis and management (NG87)', publisher:'NICE', href:'https://www.nice.org.uk/guidance/ng87/chapter/recommendations'},
    {author:'Adamou i wsp.', year:2024, title:'The adult ADHD assessment quality assurance standard', publisher:'Frontiers in Psychiatry', href:'https://doi.org/10.3389/fpsyt.2024.1380410'},
  ],
  'psychoterapia-psychodynamiczna-pierwsze-spotkanie': [gabbard],
  'pierwsze-spotkanie-mlodziez-rodzic': [{ author: 'World Health Organization', year: 2025, title: 'Mental health of adolescents', publisher: 'WHO', href: 'https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health' }],
  'tfp-dla-kogo': [
    { author: 'Yeomans, F. E., Clarkin, J. F. i Kernberg, O. F.', year: 2015, title: 'Transference-Focused Psychotherapy for Borderline Personality Disorder: A Clinical Guide', publisher: 'American Psychiatric Publishing' },
    { author: 'Clarkin, J. F., Levy, K. N., Lenzenweger, M. F. i Kernberg, O. F.', year: 2007, title: 'Evaluating Three Treatments for Borderline Personality Disorder: A Multiwave Study', publisher: 'American Journal of Psychiatry', href: 'https://doi.org/10.1176/ajp.2007.164.6.922' },
  ],
  'czy-przeszlosc-ma-znaczenie': [gabbard],
  'dlaczego-sama-swiadomosc-nie-wystarcza': [mcWilliams, gabbard],
  'jak-wybrac-psychoterapeute': [
    { author: 'Polskie Towarzystwo Psychologiczne', year: 2018, title: 'Kodeks etyczny psychologa', publisher: 'PTP', href: 'https://psych.org.pl/dla-psychologow/kodeks-etyczny' },
  ],
  'relacja-terapeutyczna-zrodlo-zmiany': [
    { author: 'Flückiger, C., Del Re, A. C., Wampold, B. E. i Horvath, A. O.', year: 2018, title: 'The Alliance in Adult Psychotherapy: A Meta-Analytic Synthesis', publisher: 'Psychotherapy', href: 'https://doi.org/10.1037/pst0000172' }, gabbard,
  ],
  'dlaczego-wybieram-podobnych-partnerow': [
    { author: 'Park, Y. i MacDonald, G.', year: 2019, title: 'Consistency between individuals’ past and current romantic partners’ own reports of their personalities', publisher: 'Proceedings of the National Academy of Sciences', href: 'https://doi.org/10.1073/pnas.1902937116' },
  ],
};

const niceAdhd = blogReading['adhd-u-doroslych'][0];
const aqas = blogReading['adhd-u-doroslych'][1];
const icd:Reference = {author:'World Health Organization',year:2024,title:'Clinical descriptions and diagnostic requirements for ICD-11 mental, behavioural and neurodevelopmental disorders',publisher:'WHO',href:'https://www.who.int/publications/i/item/9789240077263'};
const alliance = blogReading['relacja-terapeutyczna-zrodlo-zmiany'][0];
Object.assign(blogReading,{
  'jak-przygotowac-sie-do-diagnozy-adhd':[niceAdhd,aqas],
  'cechy-borderline-a-zaburzenie-osobowosci':[icd,{author:'Bach, B. i First, M. B.',year:2018,title:'Application of the ICD-11 classification of personality disorders',publisher:'BMC Psychiatry',href:'https://doi.org/10.1186/s12888-018-1908-3'}],
  'adhd-a-borderline-u-doroslych':[niceAdhd,icd,{author:'Weiner, L., Perroud, N. i Weibel, S.',year:2019,title:'Attention Deficit Hyperactivity Disorder and Borderline Personality Disorder in Adults: A Review of Their Links and Risks',publisher:'Neuropsychiatric Disease and Treatment',href:'https://doi.org/10.2147/NDT.S192871'}],
  'jak-rozpoznac-postepy-w-psychoterapii':[alliance,{author:'Lambert, M. J., Whipple, J. L. i Kleinstäuber, M.',year:2018,title:'Collecting and Delivering Progress Feedback: A Meta-Analysis of Routine Outcome Monitoring',publisher:'Psychotherapy',href:'https://doi.org/10.1037/pst0000167'}],
  'czy-mozna-zloscic-sie-na-psychoterapeute':[gabbard,{author:'Eubanks, C. F., Muran, J. C. i Safran, J. D.',year:2018,title:'Alliance Rupture Repair: A Meta-Analysis',publisher:'Psychotherapy',href:'https://doi.org/10.1037/pst0000185'}],
} satisfies Record<string,Reference[]>);
