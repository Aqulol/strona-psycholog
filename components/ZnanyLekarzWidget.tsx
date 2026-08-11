'use client';

import { useEffect } from 'react';
import { config } from '../lib/config';

/**
 * Widget ZnanyLekarz — certyfikat zaufania (typ "certificate").
 *
 * Kod osadzenia dostarczony przez właściciela (platform.docplanner.com).
 * Anchor jest renderowany serwerowo (statyczny eksport → trafia do out/),
 * a widget.js jest ładowany po stronie klienta. Guard na #zl-widget-s
 * zapobiega zduplikowaniu skryptu (React i tak hoistuje go raz do <body>).
 */
export default function ZnanyLekarzWidget() {
  useEffect(() => {
    if (document.getElementById('zl-widget-s')) {
      return;
    }
    const script = document.createElement('script');
    script.id = 'zl-widget-s';
    script.src = '//platform.docplanner.com/js/widget.js';
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <a
        id="zl-url"
        className="zl-url"
        href={config.bookingUrl}
        rel="nofollow"
        data-zlw-doctor="grzegorz-plebaniak"
        data-zlw-type="certificate"
        data-zlw-opinion="false"
        data-zlw-hide-branding="true"
        data-zlw-saas-only="false"
        data-zlw-a11y-title="Widget umówienia wizyty lekarskiej"
      >
        Umów wizytę
      </a>
      <script id="zl-widget-s" src="//platform.docplanner.com/js/widget.js" />
    </>
  );
}
