import { conversionEvents, conversionPreference } from './conversion-events.mjs';
import { conversionEndpoint } from './contact-endpoint.mjs';

const endpoint = conversionEndpoint(process.env.NEXT_PUBLIC_CONVERSION_ENDPOINT);
export const conversionsEnabled = Boolean(endpoint);
type Choice = 'granted' | 'denied' | null;
const preferenceChanged = 'gabinet-conversion-consent-change';
let memoryChoice: Choice = null;
export function readConversionChoice(): Choice {
  if (memoryChoice !== null) return memoryChoice;
  try {
    const value = localStorage.getItem(conversionPreference);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch { return null; }
}
export function subscribeConversionChoice(notify:()=>void) {
  function changed(event:StorageEvent) {if (event.key === conversionPreference || event.key === null) notify();}
  window.addEventListener('storage',changed);
  window.addEventListener(preferenceChanged,notify);
  return () => {window.removeEventListener('storage',changed);window.removeEventListener(preferenceChanged,notify);};
}
export function saveConversionChoice(choice:Exclude<Choice,null>) {
  try {localStorage.setItem(conversionPreference,choice); memoryChoice = null;}
  catch {memoryChoice = choice;}
  window.dispatchEvent(new Event(preferenceChanged));
}

export function countConversion(event:string) {
  if (!endpoint || !conversionEvents.includes(event) || readConversionChoice() !== 'granted') return;
  // No URL, title, identifiers, properties, consent record or user data in the payload.
  void fetch(endpoint,{method:'POST',body:event,headers:{'Content-Type':'text/plain'},credentials:'omit',
    referrerPolicy:'no-referrer',redirect:'error',keepalive:true,cache:'no-store'}).catch(()=>{});
}
