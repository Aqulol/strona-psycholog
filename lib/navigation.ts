import { categoryNames, offerPath, psychologyGroups, services, therapyKeys, type ServiceKey } from './services';
import { paths } from './site';
import { servicePaths } from './service-paths';

const menuItems = (keys:readonly ServiceKey[]) => keys.map(key => {
  const {href,name,status} = services[key];
  return { href, name, guide:status === 'guide' };
});
export type MenuItem = ReturnType<typeof menuItems>[number];
export type NavigationGroup = {label:string;href:string} & ({ columns:{label:string;items:MenuItem[]}[] } | { items:MenuItem[] });
export const navigation = {
  offerPath,
  groups: [
    { label:'Psycholog', href:servicePaths.psychologist, columns:psychologyGroups.map(({category,keys}) => ({label:categoryNames[category],items:menuItems(keys)})) },
    { label:'Psychoterapeuta', href:servicePaths.therapist, items:menuItems(therapyKeys) },
  ] satisfies NavigationGroup[],
  links: [
    ['Dorośli', paths.adults], ['Młodzież od 15. roku życia', paths.youth], ['W czym pomagam?', paths.signs],
    ['O mnie', paths.about], ['Gabinet', paths.office], ['Cennik', '/cennik/'], ['Blog', '/blog/'], ['Kontakt', paths.contact],
  ],
};
