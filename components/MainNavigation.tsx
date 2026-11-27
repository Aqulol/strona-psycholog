'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { MenuItem, NavigationGroup, navigation } from '../lib/navigation';

function ServiceLinks({ items }: {items: readonly MenuItem[]}) {
  return <ul role="list">{items.map(({href,name,guide}) =>
    <li key={href}><a href={href}>{name}{guide && <small className="menu-guide">Informacja</small>}</a></li>
  )}</ul>;
}

export default function MainNavigation({ offerPath, groups, links, knowledge, contact, desktop = false }: Omit<typeof navigation, "groups"> & {groups: readonly NavigationGroup[];desktop?:boolean}) {
  const id = useId();
  const menu = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => { if (!menu.current?.contains(event.target as Node)) setOpen(null); };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, []);
  const renderGroup = ({label,href,...group}:NavigationGroup,index:number) => {
      const submenu = `${id}-${index}`;
      return <li className={index === 0 ? "nav-group nav-mega" : "nav-group"} key={href}
        onBlur={event => { if (open === index && !event.currentTarget.contains(event.relatedTarget)) setOpen(null); }}
        onKeyDown={event => {
          if (event.key === 'Escape' && open === index) {
            event.stopPropagation();
            setOpen(null);
            event.currentTarget.querySelector('button')?.focus();
          }
        }}>
        <div className="nav-parent"><a href={href}>{label}</a><button type="button" aria-label={`Podmenu: ${label}`} aria-expanded={open === index} aria-controls={submenu} onClick={() => setOpen(open === index ? null : index)}><ChevronDown size={17} aria-hidden="true"/></button></div>
        <div className="nav-submenu" id={submenu} hidden={open !== index}>
          {'columns' in group ? <div className="nav-mega-grid">{group.columns.map(({label,href,items}) => <details key={label} open={desktop || undefined}>
            <summary>{label}</summary><a className="menu-category-link" href={href}>Przegląd kategorii</a><ServiceLinks items={items}/>
          </details>)}</div> : <ServiceLinks items={group.items}/>}
        </div>
      </li>;
  };
  return <ul className="nav-items" role="list" ref={menu}>
    <li><a href={offerPath}>Oferta</a></li>
    {groups.map(renderGroup)}
    {links.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}
    {renderGroup(knowledge, groups.length)}
    <li><a href={contact}>Kontakt</a></li>
  </ul>;
}
