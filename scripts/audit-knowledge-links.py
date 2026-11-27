import sys
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
class Links(HTMLParser):
 def __init__(self): super().__init__(convert_charrefs=True); self.main=False;self.href=None;self.rows=set();self.ids=set()
 def handle_starttag(self,t,a):
  a=dict(a);self.ids.add(a.get('id'));self.main=self.main or t=='main'
  if self.main and t=='a' and a.get('href','').startswith(('/','#')):self.href=a['href'];self.label=[]
 def handle_data(self,data):
  if self.href:self.label.append(data)
 def handle_endtag(self,t):
  if t=='main':self.main=False
  if t=='a' and self.href:self.rows.add((' '.join(''.join(self.label).split()),self.href));self.href=None
def collect(path):
 result={}
 for f in Path(path).rglob('index.html'):
  parser=Links();parser.feed(f.read_text());result['/'+str(f.relative_to(path)).removesuffix('index.html')]=parser
 return result
before,after=map(collect,sys.argv[1:3]);new=[];errors=[]
for route,page in sorted(after.items()):
 for label,href in sorted(page.rows-(before[route].rows if route in before else set())):
  new.append((route,label,href));s=urlsplit(href);target=s.path or route
  if target not in after and target.startswith('/images/') and (Path(sys.argv[2])/target.lstrip('/')).is_file(): continue
  if target not in after or s.fragment and unquote(s.fragment) not in after[target].ids: errors.append((route,label,href))
print('Errors:',errors)
assert not errors
out=Path(sys.argv[3] if len(sys.argv)>3 else 'docs/rozbudowa-wiedzy/NOWE-LINKI.md');out.write_text(f'# Nowe linki w treści ({len(new)})\n\nUnikalne trójki źródło–kotwica–cel w początkowym `<main>` eksportu (różnica względem bazowego eksportu). Zawiera też linki nawigacyjne wewnątrz nowych stron; bez nagłówka i stopki.\n\n| Źródło | Kotwica | Cel |\n|---|---|---|\n'+''.join(f'| `{r}` | {l.replace("|","&#124;")} | `{h}` |\n' for r,l,h in new));print(len(new))
