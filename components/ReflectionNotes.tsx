'use client';

import { useId, useState } from 'react';

const prompts = {
  emotions: ['Sytuacja', 'Emocje', 'Natężenie (własnymi słowami)', 'Moja interpretacja', 'Moja reakcja', 'Potrzeby', 'Refleksja po czasie'],
  relations: ['Sytuacja w relacji', 'Moje emocje', 'Czego oczekiwałem lub oczekiwałam?', 'Moja reakcja', 'Co się powtarza?', 'Jakie potrzeby pozostały niezaspokojone?'],
  visit: ['O czym chcę porozmawiać?', 'Jaki przykład mogę podać?', 'O co chcę zapytać podczas spotkania?'],
} as const;

export default function ReflectionNotes({kind,title}:{kind:keyof typeof prompts;title:string}) {
  const id=useId();
  const [notes,setNotes]=useState<Record<number,string>>({});
  return <details className="education-notes">
    <summary>{title}</summary>
    <p>Notatki pozostają w pamięci tej karty. Witryna ich nie zapisuje ani nie wysyła. Na współdzielonym urządzeniu wyczyść wpisy przed zamknięciem. Nie wpisuj danych identyfikujących inne osoby.</p>
    <div className="notes-fields">{prompts[kind].map((prompt,i)=><div key={prompt}>
      <label htmlFor={`${id}-${i}`}>{prompt}</label>
      <textarea id={`${id}-${i}`} rows={2} maxLength={2000} autoComplete="off" spellCheck={false} value={notes[i]??''} onChange={e=>{const value=e.target.value;setNotes(previous=>({...previous,[i]:value}));}}/>
    </div>)}</div>
    <button type="button" className="button-secondary" onClick={()=>setNotes({})}>Wyczyść notatki</button>
  </details>;
}
