export type Reference = { author: string; year: number; title: string; publisher: string; href?: string };
const gabbard: Reference = { author: 'Gabbard, G. O.', year: 2017, title: 'Long-Term Psychodynamic Psychotherapy: A Basic Text (wyd. 3)', publisher: 'American Psychiatric Association Publishing' };
const mcWilliams: Reference = { author: 'McWilliams, N.', year: 2004, title: 'Psychoanalytic Psychotherapy: A Practitioner’s Guide', publisher: 'Guilford Press', href: 'https://www.guilford.com/books/Psychoanalytic-Psychotherapy/Nancy-McWilliams/9781593850098' };
export const blogReading: Record<string, Reference[]> = {
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
