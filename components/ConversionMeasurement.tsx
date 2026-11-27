'use client';

import {useEffect} from 'react';
import {config} from '../lib/config';
import {conversionsEnabled,countConversion} from '../lib/conversions';

export default function ConversionMeasurement() {
  useEffect(() => {
    if (!conversionsEnabled) return;
    function measure(event:MouseEvent) {
      // Keyboard activation also dispatches click. One listener, no per-link handlers.
      if (!event.isTrusted || event.button !== 0 || !(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') ?? '';
      if (href === config.booksyUrl) countConversion('booking_click');
      else if (href.startsWith('tel:') && href.slice(4).replace(/[ ()-]/g,'') === config.phone.replace(/\s/g,'')) countConversion('phone_click');
      else if (href.toLowerCase() === `mailto:${config.email.toLowerCase()}`) countConversion('email_click');
      else if (link.origin === window.location.origin && link.pathname === '/cennik/' && window.location.pathname !== '/cennik/') countConversion('pricing_click');
    }
    document.addEventListener('click',measure,true);
    return () => document.removeEventListener('click',measure,true);
  }, []);
  return null;
}
