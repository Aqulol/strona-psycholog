/**
 * Helper zdarzeń konwersji GA4.
 *
 * Bezpieczny no-op, gdy gtag nie istnieje:
 * - po stronie serwera (SSR / eksport statyczny) — typeof window === 'undefined';
 * - w przeglądarce przed wyrażeniem zgody na cookies — gtag wstrzykuje
 *   components/GtmScript.tsx DOPIERO po akceptacji (zdarzenie
 *   'gabinet-consent-accepted', localStorage 'gabinet-cookie-consent'='1').
 *
 * Dzięki temu track() można wołać w onClick bez żadnych warunków —
 * bez gtag nic się nie dzieje i nie ma błędów.
 */
export function track(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag !== 'function') return;
  // Twarda brama na zgodę: nawet gdyby gtag istniał (np. wstrzyknięty w innej
  // zakładce), bez zgody ('gabinet-cookie-consent' = '1') nie wysyłamy zdarzeń.
  try {
    if (localStorage.getItem('gabinet-cookie-consent') !== '1') return;
  } catch {
    return;
  }
  w.gtag('event', event, params);
}
