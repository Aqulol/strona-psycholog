'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { MenuItem, NavigationGroup, navigation } from '../lib/navigation';

function ServiceLinks({ items }: {items: readonly MenuItem[]}) {
  return <ul role="list">{items.map(({href,name,guide}) =>
    <li key={href}><a href={href}>{name}{guide && <small className="menu-guide">Informacja</small>}</a></li>
  )}</ul>;
}

export default function MainNavigation({ offerPath, groups, links, desktop = false }: Omit<typeof navigation, "groups"> & {groups: readonly NavigationGroup[];desktop?:boolean}) {
  const id = useId();
  const menu = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => { if (!menu.current?.contains(event.target as Node)) setOpen(null); };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, []);
  return <ul className="nav-items" role="list" ref={menu} onKeyDown={event => {
    if (!desktop && event.key === 'Escape') {
      const disclosure = event.currentTarget.closest<HTMLDetailsElement>('.site-menu');
      if (disclosure?.open) {
        disclosure.open = false;
        disclosure.querySelector('summary')?.focus();
        setOpen(null);
      }
    }
  }}>
    <li><a href={offerPath}>Oferta</a></li>
    {groups.map(({ label, href, ...group }, index) => {
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
          {'columns' in group ? <div className="nav-mega-grid">{group.columns.map(({label,items}) => <details key={label} open={desktop || undefined}>
            <summary>{label}</summary><ServiceLinks items={items}/>
          </details>)}</div> : <ServiceLinks items={group.items}/>}
        </div>
      </li>;
    })}
    {links.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}
  </ul>;
}
