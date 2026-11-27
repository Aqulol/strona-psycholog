import { cloneElement, Fragment, isValidElement, type ReactNode } from 'react';

// Reviewed source/phrase/target pairs. New prose never creates links automatically.
const reviewed: Record<string, Record<string, string>> = {
  "/blog/dlaczego-sama-swiadomosc-nie-wystarcza/": {
    "perfekcjonizm": "/w-czym-pomagam/perfekcjonizm/",
    "samotnością": "/w-czym-pomagam/samotnosc/"
  },
  "/blog/dlaczego-wybieram-podobnych-partnerow/": {
    "lęk przed odrzuceniem": "/w-czym-pomagam/lek-przed-odrzuceniem/"
  },
  "/blog/narcyzm-wrazliwy/": {
    "narcystycznym funkcjonowaniem": "/w-czym-pomagam/narcyzm/",
    "niska samoocena": "/w-czym-pomagam/niska-samoocena/",
    "psychoterapii psychodynamicznej": "/psychoterapia-psychodynamiczna-wroclaw/"
  },
  "/blog/poczucie-wlasnej-wartosci/": {
    "wahania samooceny": "/w-czym-pomagam/niestabilna-samoocena/",
    "zaburzenia osobowości": "/w-czym-pomagam/zaburzenia-osobowosci/",
    "potrzeba akceptacji": "/w-czym-pomagam/potrzeba-akceptacji/"
  },
  "/blog/samotnosc/": {
    "samotności": "/w-czym-pomagam/samotnosc/"
  },
  "/blog/tfp-dla-kogo/": {
    "psychoterapii skoncentrowanej na przeniesieniu": "/terapia-skoncentrowana-na-przeniesieniu-tfp/",
    "zaburzeniami osobowości": "/w-czym-pomagam/zaburzenia-osobowosci/"
  },
  "/konsultacje-psychologiczne-wroclaw/": {
    "klasycznego modelu tfp": "/terapia-skoncentrowana-na-przeniesieniu-tfp/"
  },
  "/psychoterapia-dorosli/": {
    "psychoterapię psychodynamiczną": "/psychoterapia-psychodynamiczna-wroclaw/",
    "lęk przed odrzuceniem": "/w-czym-pomagam/lek-przed-odrzuceniem/",
    "trudność z zaufaniem": "/w-czym-pomagam/trudnosci-z-zaufaniem/"
  },
  "/psychoterapia-online/": {
    "psychoterapię psychodynamiczną": "/psychoterapia-psychodynamiczna-wroclaw/"
  },
  "/psychoterapia-psychodynamiczna-wroclaw/": {
    "poczucie pustki": "/w-czym-pomagam/poczucie-pustki/"
  },
  "/terapia-skoncentrowana-na-przeniesieniu-tfp/": {
    "psychoterapia psychodynamiczna": "/psychoterapia-psychodynamiczna-wroclaw/",
    "zaburzeniami osobowości": "/w-czym-pomagam/zaburzenia-osobowosci/",
    "zaburzenia osobowości borderline": "/w-czym-pomagam/borderline/"
  },
  "/w-czym-pomagam/borderline/": {
    "poczucie pustki": "/w-czym-pomagam/poczucie-pustki/"
  },
  "/w-czym-pomagam/depresja/": {
    "nadmierne poczucie winy": "/w-czym-pomagam/nadmierne-poczucie-winy/",
    "trudności w podejmowaniu decyzji": "/w-czym-pomagam/trudnosci-w-podejmowaniu-decyzji/",
    "trudności w relacjach": "/w-czym-pomagam/problemy-w-relacjach/"
  },
  "/w-czym-pomagam/dorastanie-i-tozsamosc/": {
    "obawa przed odrzuceniem": "/w-czym-pomagam/lek-przed-odrzuceniem/"
  },
  "/w-czym-pomagam/doswiadczenie-przemocy/": {
    "trudności ze snem": "/w-czym-pomagam/trudnosci-ze-snem/",
    "trudność z zaufaniem": "/w-czym-pomagam/trudnosci-z-zaufaniem/"
  },
  "/w-czym-pomagam/lek-przed-porazka/": {
    "perfekcjonizmu": "/w-czym-pomagam/perfekcjonizm/"
  },
  "/w-czym-pomagam/nawiazywanie-kontaktow-spolecznych/": {
    "lęk społeczny": "/w-czym-pomagam/lek-spoleczny/"
  },
  "/w-czym-pomagam/obraz-ciala/": {
    "zaburzeń odżywiania": "/w-czym-pomagam/trudnosci-z-odzywianiem/"
  },
  "/w-czym-pomagam/poczucie-pustki/": {
    "psychoterapii psychodynamicznej": "/psychoterapia-psychodynamiczna-wroclaw/"
  },
  "/w-czym-pomagam/problemowe-uzywanie-substancji/": {
    "trudności ze snem": "/w-czym-pomagam/trudnosci-ze-snem/"
  },
  "/w-czym-pomagam/samotnosc-w-zwiazku/": {
    "samotności": "/w-czym-pomagam/samotnosc/"
  },
  "/w-czym-pomagam/stabilny-obraz-siebie/": {
    "niestabilna samoocena": "/w-czym-pomagam/niestabilna-samoocena/"
  },
  "/w-czym-pomagam/stres/": {
    "problemy ze snem": "/w-czym-pomagam/trudnosci-ze-snem/"
  },
  "/w-czym-pomagam/trudnosci-emocjonalne-mlodziezy/": {
    "samotności": "/w-czym-pomagam/samotnosc/",
    "problemy ze snem": "/w-czym-pomagam/trudnosci-ze-snem/"
  },
  "/w-czym-pomagam/trudnosci-w-okresleniu-tozsamosci/": {
    "niestabilny obraz siebie": "/w-czym-pomagam/stabilny-obraz-siebie/"
  },
  "/w-czym-pomagam/trudnosci-z-odzywianiem/": {
    "perfekcjonizm": "/w-czym-pomagam/perfekcjonizm/"
  },
  "/w-czym-pomagam/wypalenie-zawodowe/": {
    "przewlekłym stresem": "/w-czym-pomagam/stres/"
  },
  "/w-czym-pomagam/zaburzenia-osobowosci/": {
    "trudności w relacjach": "/w-czym-pomagam/problemy-w-relacjach/",
    "psychoterapii psychodynamicznej": "/psychoterapia-psychodynamiczna-wroclaw/"
  },
  "/w-czym-pomagam/samotnosc/": {
    "samotność": "/blog/samotnosc/"
  },
  "/w-czym-pomagam/niska-samoocena/": {
    "poczucie własnej wartości": "/blog/poczucie-wlasnej-wartosci/"
  },
  "/w-czym-pomagam/narcyzm/": {
    "narcyzm wrażliwy": "/blog/narcyzm-wrazliwy/"
  }
};

type ProseProps = { children?: ReactNode; href?: string; 'data-reading-ignore'?: boolean };
const excluded = new Set(['a', 'aside', 'button', 'code', 'footer', 'nav', 'pre', 'script', 'style', 'svg']);
export function contextLinks(path: string, body: ReactNode, limit = 3): ReactNode {
  const targets = reviewed[path];
  if (!targets) return body;
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}])(${Object.keys(targets).sort((a, b) => b.length - a.length).map(phrase => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![\\p{L}\\p{N}])`, 'giu');
  const linked = new Set([path]);
  function collect(node: ReactNode) {
    if (Array.isArray(node)) { node.forEach(collect); return; }
    if (!isValidElement<ProseProps>(node)) return;
    if (node.type === 'a' && node.props.href?.startsWith('/')) linked.add(node.props.href.split('#')[0]);
    collect(node.props.children);
  }
  collect(body);
  let count = 0;
  function visit(node: ReactNode, prose = false): ReactNode {
    if (count >= limit) return node;
    if (typeof node === 'string' && prose) {
      const parts: ReactNode[] = [];
      let cursor = 0;
      for (const match of node.matchAll(pattern)) {
        const label = match[0];
        const href = targets[label.toLocaleLowerCase('pl')];
        if (!href || linked.has(href)) continue;
        // Avoid linking clinical labels based on a negated comparison or differential.
        if (/\b(?:nie oznacza|nie musi oznaczać|nie dowodzi|nie przesądza o|nie rozpoznaje się)\b/iu.test(node.slice(Math.max(0, match.index - 55), match.index))) continue;
        parts.push(node.slice(cursor, match.index), <a key={`${match.index}-${href}`} data-context-link href={href}>{label}</a>);
        cursor = match.index + label.length;
        linked.add(href);
        if (++count >= limit) break;
      }
      return cursor ? [...parts, node.slice(cursor)] : node;
    }
    if (Array.isArray(node)) return node.map(child => visit(child, prose));
    if (!isValidElement<ProseProps>(node) || node.props['data-reading-ignore']) return node;
    if (node.type === Fragment) return cloneElement(node, undefined, visit(node.props.children, prose));
    if (typeof node.type !== 'string' || excluded.has(node.type) || /^h[1-6]$/.test(node.type)) return node;
    if (node.props.children === undefined) return node;
    return cloneElement(node, undefined, visit(node.props.children, prose || node.type === 'p'));
  }
  // The caller provides the children of prose fragments, not page chrome.
  return visit(body);
}
