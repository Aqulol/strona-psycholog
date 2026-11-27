'use client';

import { Menu, X } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';

export default function MobileNavigation({children}: {children:ReactNode}) {
  const id = useId();
  const [open,setOpen] = useState(false);
  return <details className="site-menu" onToggle={event => setOpen(event.currentTarget.open)} onKeyDown={event => {
    if (event.key !== 'Escape' || !event.currentTarget.open) return;
    event.preventDefault();
    event.currentTarget.open = false;
    event.currentTarget.querySelector('summary')?.focus();
  }}>
    <summary aria-label="Menu główne" aria-controls={id} aria-expanded={open}>
      <Menu className="menu-open-icon" size={23} aria-hidden="true"/><X className="menu-close-icon" size={23} aria-hidden="true"/>
    </summary>
    <nav id={id} className="mobile-menu-panel" aria-label="Menu główne"><div className="shell">{children}</div></nav>
  </details>;
}
