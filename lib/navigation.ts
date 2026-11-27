import { knowledgePath, knowledgeLinks, patientPath } from './knowledge';
import { categoryNames, offerPath, psychologyGroups, services, therapyKeys, type ServiceKey } from './services';
import { paths } from './site';
import { servicePaths } from './service-paths';

const menuItems = (keys:readonly ServiceKey[]) => keys.map(key => {
  const {href,name,status} = services[key];
  return { href, name, guide:status === 'guide' };
});
export type MenuItem = ReturnType<typeof menuItems>[number];
export type NavigationGroup = {label:string;href:string} & ({ columns:{label:string;href:string;items:MenuItem[]}[] } | { items:MenuItem[] });
export const navigation = {
  offerPath,
  groups: [
    { label:'Psycholog', href:servicePaths.psychologist, columns:psychologyGroups.map(({category,keys}) => ({label:categoryNames[category],href:`${servicePaths.psychologist}#oferta-${category}`,items:menuItems(keys)})) },
    { label:'Psychoterapeuta', href:servicePaths.therapist, items:menuItems(therapyKeys) },
  ] satisfies NavigationGroup[],
  knowledge: {label:'Baza wiedzy',href:knowledgePath,items:[...knowledgeLinks,
    {href:patientPath,name:'Informacje dla pacjentów',guide:false}, {href:paths.faq,name:'Najczęstsze pytania',guide:false},
  ]} satisfies NavigationGroup,
  contact:paths.contact,
  links: [
    ['Dorośli', paths.adults], ['Młodzież od 15. roku życia', paths.youth], ['W czym pomagam?', paths.signs],
    ['O mnie', paths.about], ['Gabinet', paths.office], ['Cennik', '/cennik/'],
  ],
};
