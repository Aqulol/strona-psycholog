#!/usr/bin/env python3
"""Compare canonical exports and report prose/links/intent. No HTML or prose is modified.

Usage: python scripts/audit-editorial.py BASELINE_OUT CURRENT_OUT REPORT_DIR
"""
import gzip
import json
import re
import sys
import xml.etree.ElementTree as ET
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ORIGIN = 'https://psychologplebaniak.pl'


def urls(root):
    return {urlsplit(node.text).path for node in ET.parse(root / 'sitemap.xml').getroot().findall('{*}url/{*}loc')}


def html_file(root, route):
    return root / route.strip('/') / 'index.html'


def clean(text):
    return ' '.join(text.split())


class Page(HTMLParser):
    def __init__(self, raw):
        super().__init__(convert_charrefs=True)
        self.main = False
        self.skip = 0
        self.current = None
        self.anchor = None
        self.title = ''
        self.description = ''
        self.paragraphs = []
        self.headings = []
        self.minutes = re.findall(r'(\d+)(?:<!-- -->)? min czytania</span>',raw.split('</main>',1)[0])
        self.tagged = []
        self.links = set()
        self.scripts = set()
        self.fragments = set()
        self.feed(raw)

    def handle_starttag(self, tag, attrs):
        at = dict(attrs)
        if 'id' in at:
            self.fragments.add(at['id'])
        if tag == 'script' and at.get('src', '').startswith('/_next/'):
            self.scripts.add(at['src'])
        if tag == 'meta' and at.get('name') == 'description':
            self.description = at['content']
        if tag == 'title':
            self.current = [tag, '']
        if tag == 'main':
            self.main = True
        if not self.main:
            return
        if tag in ('script', 'style', 'svg'):
            self.skip += 1
        if self.skip:
            return
        if tag in ('p', 'h1', 'h2', 'h3'):
            self.current = [tag, '']
        if tag == 'a':
            assert self.anchor is None, 'Nested anchors in main'
            href = at.get('href', '')
            self.links.add(href)
            self.anchor = [href, '', at.get('data-context-link') == 'true']

    def handle_endtag(self, tag):
        if tag == 'main':
            self.main = False
        if self.skip:
            if tag in ('script', 'style', 'svg'):
                self.skip -= 1
            return
        if tag == 'a' and self.anchor is not None:
            href, text, marked = self.anchor
            if marked:
                self.tagged.append((clean(text), href))
            self.anchor = None
        if self.current and tag == self.current[0]:
            text = clean(self.current[1])
            if tag == 'p':
                self.paragraphs.append(text)
            elif tag == 'title':
                self.title = text
            else:
                self.headings.append((tag, text))
            self.current = None

    def handle_data(self, text):
        if not self.skip:
            if self.current:
                self.current[1] += text
            if self.anchor is not None:
                self.anchor[1] += text


def intent(route):
    explicit = {
        '/':'Marka i lokalizacja gabinetu', '/oferta/':'Porównanie dostępnych form pomocy',
        '/psycholog-wroclaw/':'Prywatny psycholog Wrocław: kwalifikacje i dostępny zakres',
        '/psychoterapeuta-wroclaw/':'Psychoterapeuta Wrocław: kwalifikacje, superwizja i metody',
        '/diagnoza-psychologiczna-wroclaw/':'Lokalna diagnoza ogólna: wywiad, ocena objawów i różnicowanie',
        '/diagnoza-osobowosci-wroclaw/':'Lokalna ocena funkcjonowania i zaburzeń osobowości',
        '/diagnoza-adhd-wroclaw/':'Lokalny proces diagnozy ADHD: zakres, przesiew, kontakt',
        '/konsultacja-diagnostyczna-wroclaw/':'Rozmowa wstępna a pełna diagnoza, bez osobnej rezerwacji',
        '/konsultacje-psychologiczne-wroclaw/':'Pierwsza konsultacja psychologiczna stacjonarnie i online',
        '/psychoterapia-indywidualna-wroclaw/':'Organizacja terapii jeden na jeden i decyzja o rozpoczęciu',
        '/psychoterapia-psychodynamiczna-wroclaw/':'Na czym polega nurt psychodynamiczny',
        '/terapia-skoncentrowana-na-przeniesieniu-tfp/':'Na czym polega metoda TFP i jej ograniczenia',
        '/psychoterapia-online/':'Regularna psychoterapia na odległość i jej warunki',
        '/konsultacje-psychologiczne-online/':'Konsultacja na odległość i przygotowanie techniczne',
        '/psychoedukacja/':'Indywidualne zrozumienie emocji, relacji i diagnozy',
        '/psychoedukacja-adhd/':'Indywidualne rozumienie codzienności z ADHD, bez diagnozowania',
        '/blog/adhd-u-doroslych/':'Edukacja o ADHD i funkcjach wykonawczych bez intencji zakupowej',
        '/psychoterapia-dorosli/':'Pomoc dla dorosłych: wskazania, formy i granice',
        '/psychoterapia-mlodziezy-od-15-roku-zycia/':'Pomoc od 15. roku życia, zgoda, udział opiekunów i poufność',
        '/kiedy-zglosic-sie-na-terapie/':'Wybór obszaru trudności: katalog tematyczny, nie katalog usług',
        '/o-mnie/':'Tożsamość, wykształcenie i szkolenie autora',
        '/gabinet-wroclaw/':'Lokalizacja, dojazd i zdjęcia placówki',
        '/cennik/':'Stawki za sesje i zapytanie o koszt diagnozy',
        '/kontakt/':'Dane i kanały kontaktu z gabinetem',
        '/faq/':'Pytania organizacyjne przed wizytą',
        '/polityka-prywatnosci/':'Prywatność, cookies i przetwarzanie danych',
        '/blog/':'Spis treści edukacyjnych',
    }
    if route in explicit:
        return explicit[route]
    if route.startswith('/w-czym-pomagam/'):
        return 'Edukacja i możliwe wsparcie w danej trudności; bez automatycznej diagnozy'
    if route.startswith('/blog/'):
        return 'Edukacja pogłębiona; nie lokalna strona sprzedażowa'
    return 'Poradnik przed standardową konsultacją; bez odrębnej pozycji w ofercie'


def write_table(path, headings, rows):
    path.write_text('| ' + ' | '.join(headings) + ' |\n| ' + ' | '.join('---' for _ in headings) + ' |\n' + ''.join('| ' + ' | '.join(str(value).replace('|','\\|') for value in row) + ' |\n' for row in rows), encoding='utf-8')


def js_size(root, page):
    return sum(len(gzip.compress((root / url.lstrip('/')).read_bytes(), mtime=0)) for url in page.scripts)


def run(baseline, output, report):
    before, after = urls(baseline), urls(output)
    assert before <= after, f'Removed canonical URLs: {before - after}'
    old = {route:Page(html_file(baseline, route).read_text()) for route in before}
    pages = {route:Page(html_file(output, route).read_text()) for route in after}
    concepts = json.loads(Path(__file__).with_name('editorial-concepts.json').read_text())
    compiled = []
    for concept in concepts:
        assert concept['target'] in after, concept['target']
        forms = sorted(concept['forms'], key=len, reverse=True)
        compiled.append((concept, re.compile(r'(?<!\w)(?:'+ '|'.join(map(re.escape, forms)) +r')(?!\w)', re.I)))
    inventory, fresh_links, candidate_count, paragraphs = [], [], 0, 0
    changes = []
    for route, page in sorted(pages.items()):
        previous = old.get(route)
        if previous and route not in ('/blog/',):
            assert page.minutes == previous.minutes, f'Changed reading estimate: {route}'
        found = set()
        for paragraph in page.paragraphs:
            for concept, pattern in compiled:
                if concept['target'] != route and pattern.search(paragraph):
                    found.add(concept['target'])
                    candidate_count += 1
        paragraphs += len(page.paragraphs)
        additions = sorted(set(page.tagged) - set(previous.tagged if previous else ()))
        for label, href in additions:
            dest = urlsplit(href)
            assert not dest.netloc and dest.path in after and dest.path != route, (route,label,href)
            assert not dest.fragment or dest.fragment in pages[dest.path].fragments, (route,href)
            fresh_links.append((f'`{route}`', label, f'`{href}`'))
        if not previous:
            state = 'nowa'
        elif page.paragraphs != previous.paragraphs or page.headings != previous.headings or page.title != previous.title or page.description != previous.description or page.links != previous.links or additions:
            state = 'zmieniona'; changes.append(route)
        else:
            state = 'treść zachowana'
        h1, = [text for tag, text in page.headings if tag == 'h1']
        inventory.append((f'`{route}`',state,h1,intent(route),len(page.paragraphs),len(found)))
    for attr in ('title','description'):
        duplicates = [value for value, count in Counter(getattr(p, attr) for p in pages.values()).items() if count > 1]
        assert not duplicates, (attr, duplicates)
    report.mkdir(parents=True, exist_ok=True)
    write_table(report / 'TRASY.md', ['Trasa','Stan względem bazy (bez nagłówka globalnego)','H1','Intencja','Akapity','Inne cele znalezione w akapitach'], inventory)
    write_table(report / 'LINKI.md', ['Źródło','Kotwica','Cel'], fresh_links)
    print(json.dumps({'routesBefore':len(before),'routesAfter':len(after),'new':sorted(after-before),'changed':changes,'paragraphs':paragraphs,
      'candidateMatches':candidate_count,'taggedNewLinks':len(fresh_links),'taggedSources':len({row[0] for row in fresh_links}),
      'jsHomeBeforeCompressed':js_size(baseline,old['/']),'jsHomeAfterCompressed':js_size(output,pages['/'])}, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    run(*(Path(argument) for argument in sys.argv[1:]))
