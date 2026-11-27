import {empathyStudy} from './research';
import {paths} from './site';
const title='Twórczość i empatia u dzieci: co pokazało badanie?';
export const empathyArticle={
  slug:'tworczosc-i-empatia-u-dzieci',title,h1:title,
  description:'Omówienie badania 3612 ośmio- i dziewięciolatków: tworzenie opowieści, empatia poznawcza i afektywna oraz granice interpretacji wyników.',
  published:undefined, sections:undefined, link:paths.youth, editorialByline:true,
  body:<>
    <p>W badaniu 3612 dzieci w wieku 8 i 9 lat tworzenie opowieści było powiązane z rozumieniem emocji innych osób nawet po uwzględnieniu płci i otwartości na doświadczenie. Nie oznacza to, że ćwiczenie opowiadania samo w sobie rozwija empatię. Warto przyjrzeć się temu, co badacze porównali i czego nie można z porównania wywnioskować.</p>
    <section><h2>Dwa znaczenia empatii</h2><p>Empatia poznawcza odnosi się do rozumienia, co ktoś może przeżywać. Afektywna dotyczy naszej emocjonalnej odpowiedzi na cudze przeżycie. Na przykład można domyślić się, że koledze jest przykro po zmianie planów, nie odczuwając jednocześnie podobnego smutku. W badaniu tych dwóch wymiarów nie traktowano zamiennie.</p></section>
    <section><h2>Co badacze porównali?</h2><p>Autorzy analizowali różne aspekty twórczości: myślenie rozbieżne, wyobraźnię twórczą i tworzenie opowieści. Rozdzielili m.in. elastyczność pomysłów od ich oryginalności. Najpierw sprawdzili, jakie związki z każdym wymiarem empatii opisują te aspekty uwzględnione razem. Następnie dodali do modeli otwartość na doświadczenie i płeć.</p></section>
    <section><h2>Co pozostało po uwzględnieniu dodatkowych zmiennych?</h2><p>W początkowych modelach elastyczność pomysłów, wyobraźnia i tworzenie opowieści wnosiły osobny wkład w wyjaśnianie różnic w empatii poznawczej. Wyobraźnia i tworzenie opowieści wiązały się również z empatią afektywną. Po uwzględnieniu otwartości na doświadczenie i płci tylko tworzenie opowieści nadal wnosiło taki wkład w modelu empatii poznawczej. W modelu empatii afektywnej nie pozostał dodatkowy wkład żadnego z badanych aspektów twórczości.</p></section>
    <section><h2>Czego wynik nie mówi o konkretnym dziecku?</h2><p>Zależność statystyczna nie wskazuje kierunku przyczynowego. Nie mówi też, czy jedno konkretne dziecko potrafi rozumieć cudze emocje. Wyniki dotyczą badanej grupy wiekowej; nie należy ich przenosić automatycznie na nastolatków, dorosłych ani na skuteczność psychoterapii.</p><p>Więcej materiałów: <a href="/slownik-psychologiczny/regulacja-emocji/">regulacja emocji</a> i <a href="/blog/pierwsze-spotkanie-mlodziez-rodzic/">pierwsze spotkanie z nastolatkiem i rodzicem</a>.</p></section>
    <section><h2>Publikacja źródłowa</h2><p>{empathyStudy.authors}. <cite lang="en">{empathyStudy.title}</cite>. {empathyStudy.journal}. <a href={`https://doi.org/${empathyStudy.doi}`}>DOI: {empathyStudy.doi}</a>. Omówienie opiera się na streszczeniu i publicznym podglądzie wydawcy.</p></section>
  </>,
};
