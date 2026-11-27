import re,gzip,sys
from pathlib import Path
from html.parser import HTMLParser
import xml.etree.ElementTree as ET
from urllib.parse import urlsplit
base,new=map(Path,sys.argv[1:3]); paths=[urlsplit(x.text).path for x in ET.parse(base/'sitemap.xml').getroot().findall('.//{*}loc')]
class Check(HTMLParser):
 def __init__(self,html):
  super().__init__(convert_charrefs=True);self.links=set();self.meta={};self.blocks={};self.tag=None;self.feed(html)
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='link' and a.get('rel')=='canonical': self.meta['canonical']=a['href']
  if t=='meta' and a.get('name')=='description':self.meta['desc']=a['content']
  if t=='a' and a.get('href'):self.links.add(a['href'])
  if t in ('title','h1') or t=='script' and a.get('type')=='application/ld+json': self.tag=t;self.buf=''
 def handle_data(self,d):
  if self.tag:self.buf+=d
 def handle_endtag(self,t):
  if t==self.tag: self.blocks.setdefault(t,[]).append(' '.join(self.buf.split()));self.tag=None
removed=[]
for p in paths:
 files=[(root/p.strip('/')/'index.html').read_text() for root in (base,new)];A,B=map(Check,files)
 assert A.meta==B.meta and A.blocks==B.blocks,p
 if p.startswith('/blog/') and p!='/blog/':
  assert [re.findall(r'\d+(?:<!-- -->)? min czytania',s.split('</main>')[0]) for s in files][0]==[re.findall(r'\d+(?:<!-- -->)? min czytania',s.split('</main>')[0]) for s in files][1],p
 if A.links-B.links:removed.append((p,A.links-B.links))
print('Metadata/H1/schema identical for',len(paths),'routes. Removed links:',removed)
assert not removed
for root in (base,new):
 page=(root/'index.html').read_bytes();js=set(re.findall(rb'<script[^>]*src="(/_next/[^\"]+\.js)"',page));css=set(re.findall(rb'<link[^>]+href="(/_next/[^\"]+\.css)"',page));
 total=lambda arr:sum(len(gzip.compress((root/url.decode().lstrip('/')).read_bytes(),mtime=0)) for url in arr)
 print(root,'HTML',len(gzip.compress(page,mtime=0)),'CSS',total(css),'JS',total(js))
