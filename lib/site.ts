import type { Metadata } from 'next';
import { config, visitRatesText } from './config';
export const domain = 'https://psychologplebaniak.pl';
export const details = 'Szczegóły ustalamy podczas konsultacji, a w razie pytań zapraszam do kontaktu telefonicznego lub mailowego.';
export const status = 'Grzegorz Plebaniak · psycholog, psychoterapeuta (w trakcie szkolenia)';
export const faq = [
 ['Czy muszę wiedzieć, z czym przychodzę?', 'Nie. Można zacząć od opowiedzenia o tym, co niepokoi lub zabiera siły, nawet jeśli trudno to nazwać.'],
 ['Ile trwa i kosztuje spotkanie?', visitRatesText],
 ['Czy mogę spotkać się online?', 'Tak, przyjmuję online oraz stacjonarnie we Wrocławiu.'],
 ['Czy rodzic uczestniczy w pierwszym spotkaniu?', 'Na pierwsze spotkanie z osobą niepełnoletnią zapraszam rodzica lub rodziców. Dalsze zasady ustalamy indywidualnie.'],
 ['Ile konsultacji poprzedza rozpoczęcie psychoterapii?', 'Zazwyczaj cztery. Pomagają nam wspólnie zdecydować, czy rozpocząć psychoterapię. Nie jest to wymagana liczba spotkań przy każdej formie pomocy.'],
 ['Jak często odbywa się terapia?', 'Spotkania odbywają się raz lub dwa razy w tygodniu. W opisie klasycznego modelu TFP typowy rytm to dwie sesje tygodniowo. Częstotliwość dobieramy indywidualnie.'],
 ['Czy z góry ustalamy koniec terapii?', 'Nie określam z góry liczby sesji. Proponuję psychoterapię długoterminową, a jej przebieg jest indywidualny.'],
 ['Co zrobić, jeśli w Booksy nie ma terminów?', 'Zapraszam do kontaktu telefonicznego lub mailowego.'],
 ['Gdzie zapytać o sprawy organizacyjne?', details],
];
export const articles = [
 ['narcyzm-wrazliwy','Narcyzm wrażliwy a relacje'],
 ['jak-wybrac-psychoterapeute','Jak wybrać psychoterapeutę?'],
 ['dlaczego-wybieram-podobnych-partnerow','Dlaczego wybieram podobnych partnerów?'],
 ['dlaczego-sama-swiadomosc-nie-wystarcza','Dlaczego sama świadomość nie wystarcza?'],
 ['relacja-terapeutyczna-zrodlo-zmiany','Relacja terapeutyczna jako źródło zmiany'],
 ['czy-przeszlosc-ma-znaczenie','Czy przeszłość ma znaczenie?'],
] as const;
export const paths = {
 method: '/psychoterapia-psychodynamiczna-wroclaw/', tfp: '/terapia-skoncentrowana-na-przeniesieniu-tfp/', adults: '/psychoterapia-dorosli/', youth: '/psychoterapia-mlodziezy-od-15-roku-zycia/', online: '/psychoterapia-online/', consult: '/konsultacje-psychologiczne-wroclaw/', signs: '/kiedy-zglosic-sie-na-terapie/', about: '/o-mnie/', office: '/gabinet-wroclaw/', faq: '/faq/', contact: '/kontakt/',
};
export function meta(path:string, title:string, description:string, article = false): Metadata {
 return {title, description, alternates:{canonical:path}, openGraph:{title, description,url:path,locale:'pl_PL',siteName:config.name, type: article?'article':'website',images:[{url:'/og-image.png',alt:'Grzegorz Plebaniak - gabinet psychologiczny'}]}, twitter:{card:'summary_large_image',title,description,images:['/og-image.png']}};
}
