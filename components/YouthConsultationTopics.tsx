export const youthConsultationTopics = [
  { id: 'emocje-mlodziezy', title: 'Emocje i samopoczucie', text: 'Powodem do rozmowy mogą być napięcie, przygnębienie lub silne emocje, które utrudniają naukę, odpoczynek albo kontakty z innymi. Młoda osoba nie musi wiedzieć, skąd bierze się zmiana. Możemy zacząć od sytuacji, w których jest szczególnie odczuwalna, i od tego, co pomaga choć trochę. Nie każda zmiana nastroju oznacza zaburzenie.' },
  { id: 'relacje-mlodziezy', title: 'Relacje z rówieśnikami i rodziną', text: 'Można porozmawiać o samotności w grupie, wykluczeniu, kłótniach w domu albo trudnościach w proszeniu o więcej samodzielności. Rodzic i nastolatek mogą inaczej rozumieć tę samą sytuację. Na konsultacji ważna jest perspektywa młodej osoby, również wtedy, gdy trudno jej mówić o konflikcie przy bliskich. Dalsze spotkania z nastolatkiem mają charakter indywidualny; nie jest to terapia rodzinna.' },
  { id: 'dorastanie-i-tozsamosc', title: 'Dorastanie i tożsamość', text: 'Pytania o to, kim się jest i co jest dla siebie ważne, mogą stawać się wyraźniejsze w okresie dorastania. Na spotkaniu można porozmawiać o własnych wyborach, przynależności i presji otoczenia, także o doświadczeniu odrzucenia lub dyskryminacji. Szukanie odpowiedzi, orientacja seksualna i tożsamość płciowa nie są zaburzeniami.' },
] as const;

export default function YouthConsultationTopics() {
  return <section aria-labelledby="tematy-mlodziezy">
    <h2 id="tematy-mlodziezy">Z czym młoda osoba może przyjść na konsultację?</h2>
    <div className="space-y-5">
      {youthConsultationTopics.map(({ id, title, text }) => <div key={id} id={id}>
        <h3 className="mb-1 text-xl font-semibold text-green">{title}</h3>
        <p>{text}</p>
      </div>)}
    </div>
  </section>;
}
