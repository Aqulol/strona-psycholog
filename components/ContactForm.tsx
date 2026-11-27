'use client';

import {useEffect, useId, useRef, useState, type FormEvent} from 'react';

import {countConversion} from '../lib/conversions';
import {contactEndpoint} from '../lib/contact-endpoint.mjs';

// Public URL only. Mail credentials exist exclusively in the Worker.
const endpoint = contactEndpoint(process.env.NEXT_PUBLIC_CONTACT_ENDPOINT);

type Feedback = { kind:'success'|'error'; text:string };
export default function ContactForm() {
  const id=useId();
  const inFlight=useRef(false);
  const [ready,setReady]=useState(false);
  useEffect(() => setReady(true), []);
  const [sending,setSending]=useState(false);
  const [feedback,setFeedback]=useState<Feedback>();

  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form=event.currentTarget;
    const data=Object.fromEntries(new FormData(form));
    const text=(key:string)=>String(data[key]??'').trim();
    if (text('name').length<2 || text('message').length<10 || (text('phone') && !/^\+?[0-9 ()-]+$/.test(text('phone'))) || (text('phone') && !/^\d{7,15}$/.test(text('phone').replace(/\D/g,'')))) {
      setFeedback({kind:'error',text:'Podaj imię (co najmniej 2 znaki), treść (co najmniej 10 znaków) i — jeśli go wpisujesz — poprawny numer telefonu.'});
      return;
    }
    if (!endpoint) {
      setFeedback({kind:'error',text:'Wysyłka formularza nie jest obecnie dostępna. Wpisane dane nie zostały wysłane.'});
      return;
    }
    inFlight.current=true;
    setSending(true);
    setFeedback(undefined);
    try {
      const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:AbortSignal.timeout(18_000),credentials:'omit',referrerPolicy:'no-referrer',redirect:'error',cache:'no-store'});
      const result=await response.json().catch(()=>null);
      if (!response.ok || result?.status!=='accepted') {
        if (response.status===429) {
          setFeedback({kind:'error',text:result?.code==='provider_limit' ? 'Usługa pocztowa osiągnęła limit. Spróbuj później.' : 'Za dużo prób wysyłki. Spróbuj ponownie za kilka minut.'});
          return;
        }
        if ([400,413,415].includes(response.status)) {
          setFeedback({kind:'error',text:'Sprawdź wpisane dane i spróbuj ponownie.'});
          return;
        }
        throw new Error('Delivery unconfirmed');
      }
      countConversion('contact_submit_success');
      form.reset();
      setFeedback({kind:'success',text:'Dziękuję za wiadomość. Została przyjęta do wysyłki.'});
    } catch {
      setFeedback({kind:'error',text:'Nie udało się potwierdzić wysłania wiadomości. Sprawdź połączenie i spróbuj ponownie lub skorzystaj z telefonu albo e-maila.'});
    } finally {
      inFlight.current=false;
      setSending(false);
    }
  }

  return <>
    <form className="practice-contact-form" method="post" onSubmit={submit} aria-describedby={`${id}-privacy`}>
      <label htmlFor={`${id}-name`}>Imię</label>
      <input id={`${id}-name`} name="name" autoComplete="given-name" required minLength={2} maxLength={80}/>
      <label htmlFor={`${id}-email`}>Adres e-mail</label>
      <input id={`${id}-email`} name="email" type="email" pattern="[^ @]+@[^ @]+[.][^ @]+" autoComplete="email" required maxLength={160}/>
      <label htmlFor={`${id}-phone`}>Numer telefonu (opcjonalnie)</label>
      <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={24}/>
      <label htmlFor={`${id}-subject`}>Temat wiadomości (opcjonalnie)</label>
      <input id={`${id}-subject`} name="subject" maxLength={120}/>
      <label htmlFor={`${id}-message`}>Treść wiadomości</label>
      <textarea id={`${id}-message`} name="message" rows={5} required minLength={10} maxLength={1000}/>
      <div hidden><label htmlFor={`${id}-website`}>Pozostaw puste</label><input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off"/></div>
      <button className="booking" type="submit" disabled={!ready || sending}>{sending?'Wysyłanie…':'Wyślij wiadomość'}</button>
      <p role="status" className={feedback?.kind==='error'?'contact-form-error':undefined}>{feedback?.text}</p>
    </form>
    <p id={`${id}-privacy`} className="contact-form-privacy">Proszę nie przesyłać danych medycznych ani dokumentacji. Więcej informacji w <a href="/polityka-prywatnosci/">polityce prywatności</a>.</p>
    <noscript><p>Wysyłka formularza wymaga JavaScriptu. Można też zadzwonić lub napisać e-mail.</p></noscript>
  </>;
}
