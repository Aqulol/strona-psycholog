'use client';
import {useState} from 'react';
const format = new Intl.NumberFormat('pl-PL', {style:'currency',currency:'PLN',maximumFractionDigits:2});
export default function SessionCost({price}:{price:number}) {
  const [weeks,setWeeks]=useState('4');
  const [weekly,setWeekly]=useState('1');
  const count=Number(weeks)*Number(weekly);
  const valid=Number.isInteger(Number(weeks))&&Number(weeks)>=1&&Number(weeks)<=52;
  return <div className="diagnostic-note session-cost">
    <label htmlFor="weekly-sessions">Sesje w tygodniu</label>
    <select id="weekly-sessions" value={weekly} onChange={e=>setWeekly(e.target.value)}><option value="1">1</option><option value="2">2</option></select>
    <label htmlFor="weeks-planned">Liczba tygodni (1–52)</label>
    <input id="weeks-planned" type="number" min="1" max="52" step="1" value={weeks} onChange={e=>setWeeks(e.target.value)}/>
    <p role="status">{valid ? <>Liczba sesji: {count}. Orientacyjny koszt: <strong>{format.format(count*price)}</strong>.</> : 'Podaj pełną liczbę tygodni od 1 do 52.'}</p>
  </div>;
}
