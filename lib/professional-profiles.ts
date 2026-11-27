import {config} from './config';

export const professionalProfiles = [
  {label:'Booksy', href:config.booksyUrl},
  {label:'ZnanyLekarz', href:config.bookingUrl},
  {label:'TwójPsycholog', href:'https://twojpsycholog.pl/profil-psychologa/grzegorz-plebaniak-11609'},
  {label:'Psycheo', href:'https://psycheo.pl/1181/psycholog/grzegorz-plebaniak/'},
] as const;
export const socialProfiles = [
  {label:'Facebook', href:'https://www.facebook.com/p/Psycholog-Grzegorz-Plebaniak-61591979872386/'},
  {label:'Instagram', href:'https://www.instagram.com/psycholog.plebaniak/'},
] as const;
