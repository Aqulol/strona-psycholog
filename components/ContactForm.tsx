'use client';

import {useId, useRef, useState, type FormEvent} from 'react';

type Feedback = { kind:'success'|'error'; text:string };
export default function ContactForm() {
  const id=useId();
  const inFlight=useRef(false);
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
    inFlight.current=true;
    setSending(true);
    setFeedback(undefined);
    try {
      const response=await fetch('/api/kontakt',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:AbortSignal.timeout(50_000),credentials:'omit',referrerPolicy:'origin',cache:'no-store'});
      const result=await response.json();
      if (!response.ok || result?.ok!==true) {
        if (response.status===429) {
          setFeedback({kind:'error',text:'Za dużo prób wysyłki. Spróbuj ponownie za kilka minut.'});
          return;
        }
        throw new Error('Delivery unconfirmed');
      }
      form.reset();
      setFeedback({kind:'success',text:'Dziękuję za wiadomość. Odpowiem tak szybko, jak będzie to możliwe.'});
    } catch {
      setFeedback({kind:'error',text:'Nie udało się potwierdzić wysłania wiadomości. Sprawdź połączenie i spróbuj ponownie lub skorzystaj z telefonu albo e-maila.'});
    } finally {
      inFlight.current=false;
      setSending(false);
    }
  }

  return <>
    <form className="practice-contact-form" method="post" action="/api/kontakt" onSubmit={submit} aria-describedby={`${id}-privacy`}>
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
      <button className="booking" type="submit" disabled={sending}>{sending?'Wysyłanie…':'Wyślij wiadomość'}</button>
      <p role="status" className={feedback?.kind==='error'?'contact-form-error':undefined}>{feedback?.text}</p>
    </form>
    <p id={`${id}-privacy`} className="contact-form-privacy">Proszę nie przesyłać danych medycznych ani dokumentacji. Więcej informacji w <a href="/polityka-prywatnosci/">polityce prywatności</a>.</p>
    <noscript><p>Wysyłka formularza wymaga JavaScriptu. Można też zadzwonić lub napisać e-mail.</p></noscript>
  </>;
}
