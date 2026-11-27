'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { paths } from '../lib/site';
import { servicePaths } from '../lib/service-paths';

const groups = [
  { label: 'Psycholog', href: servicePaths.psychologist, children: [
    ['Konsultacja psychologiczna', paths.consult], ['Konsultacja diagnostyczna', servicePaths.diagnostic], ['Poradnictwo psychologiczne', servicePaths.counselling],
  ] },
  { label: 'Psychoterapeuta', href: servicePaths.therapist, children: [
    ['Psychoterapia psychodynamiczna', paths.method], ['Terapia skoncentrowana na przeniesieniu (TFP)', paths.tfp],
  ] },
];
const links = [
  ['Dorośli', paths.adults], ['Młodzież od 15. roku życia', paths.youth], ['W czym pomagam?', paths.signs],
  ['O mnie', paths.about], ['Gabinet', paths.office], ['Cennik', '/cennik/'], ['Blog', '/blog/'], ['Kontakt', paths.contact],
];

export default function MainNavigation() {
  const id = useId();
  const menu = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => { if (!menu.current?.contains(event.target as Node)) setOpen(null); };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, []);
  return <ul className="nav-items" role="list" ref={menu}>
    {groups.map(({ label, href, children }, index) => {
      const submenu = `${id}-${index}`;
      return <li className="nav-group" key={href}
        onBlur={event => { if (open === index && !event.currentTarget.contains(event.relatedTarget)) setOpen(null); }}
        onKeyDown={event => {
          if (event.key === 'Escape' && open === index) {
            event.stopPropagation();
            setOpen(null);
            event.currentTarget.querySelector('button')?.focus();
          }
        }}>
        <div className="nav-parent"><a href={href}>{label}</a><button type="button" aria-label={`Podmenu: ${label}`} aria-expanded={open === index} aria-controls={submenu} onClick={() => setOpen(open === index ? null : index)}><ChevronDown size={17} aria-hidden="true"/></button></div>
        <ul className="nav-submenu" role="list" id={submenu} hidden={open !== index}>
          {children.map(([text, target]) => <li key={target}><a href={target}>{text}</a></li>)}
        </ul>
      </li>;
    })}
    {links.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}
  </ul>;
}
