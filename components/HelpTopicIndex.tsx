import CatalogueFilter from './CatalogueFilter';
import type { ReactNode } from 'react';
import { helpTopics, topicPath } from '../lib/help-topics';
import { paths } from '../lib/site';
import HelpCategoryCard, { HelpBadge, HelpLinks, type HelpCategory } from './help/HelpCategoryCard';
import HelpTopicIcon from './help/HelpTopicIcon';

// Presentation only: topic pages retain their own taxonomy, text and metadata.
const groups = [
  ['Nastrój i emocje', 'CloudSun', 'sand', [
    ['depresja', 'CloudRain'],
    ['poczucie-pustki', 'CircleDashed'],
    ['brak-satysfakcji-z-zycia', 'BatteryMedium'],
    ['trudnosci-emocjonalne', 'SlidersHorizontal'],
    ['rozpoznawanie-emocji', 'Lightbulb'],
    ['radzenie-sobie-ze-zloscia', 'Flame'],
    ['intensywne-emocje', 'Waves'],
    ['impulsywnosc', 'Zap'],
    ['nadmierne-poczucie-winy', 'Scale'],
    ['wstyd', 'EyeOff'],
  ]],
  ['Lęk i stres', 'Wind', 'blue', [
    ['zaburzenia-lekowe', 'ShieldAlert'],
    ['lek-spoleczny', 'UsersRound'],
    ['lek-przed-porazka', 'Flag'],
    ['stres', 'Activity'],
    ['wypalenie-zawodowe', 'BatteryLow'],
    ['trudnosci-ze-snem', 'Moon'],
    ['odpoczynek-i-przeciazenie', 'Coffee'],
    ['natlok-mysli', 'Cloud'],
    ['nadmierne-analizowanie', 'Repeat'],
  ]],
  ['Samoocena i rozumienie siebie', 'Fingerprint', 'rose', [
    ['niska-samoocena', 'Gem'],
    ['niestabilna-samoocena', 'ScanFace'],
    ['nadmierny-samokrytycyzm', 'PenLine'],
    ['perfekcjonizm', 'Target'],
    ['nadwrazliwosc-na-krytyke', 'MessageCircle'],
    ['potrzeba-akceptacji', 'ThumbsUp'],
    ['poczucie-niewystarczalnosci', 'CircleMinus'],
    ['zrozumienie-siebie', 'Compass'],
    ['trudnosci-w-podejmowaniu-decyzji', 'Signpost'],
  ]],
  ['Relacje z innymi', 'UsersRound', 'sage', [
    ['problemy-w-relacjach', 'Handshake'],
    ['samotnosc', 'UserRound'],
    ['lek-przed-odrzuceniem', 'DoorClosed'],
    ['lek-przed-bliskoscia', 'LockKeyhole'],
    ['trudnosci-z-zaufaniem', 'KeyRound'],
    ['asertywnosc-i-granice', 'Fence'],
    ['trudnosci-komunikacyjne', 'MessageSquare'],
    ['nawiazywanie-kontaktow-spolecznych', 'UserRoundPlus'],
    ['powtarzajace-sie-trudnosci-w-relacjach', 'RefreshCw'],
    ['zaleznosc-emocjonalna', 'Link'],
    ['stres-mniejszosciowy', 'Umbrella'],
  ]],
  ['Związki i bliskość', 'HeartHandshake', 'rose', [
    ['kryzys-w-zwiazku', 'HeartCrack'],
    ['doswiadczenie-zdrady', 'Unlink'],
    ['rozstanie-i-rozwod', 'Scissors'],
    ['samotnosc-w-zwiazku', 'HeartOff'],
    ['podobni-partnerzy', 'Repeat2'],
    ['budowanie-bliskich-relacji', 'HeartHandshake'],
    ['seksualnosc-i-intymnosc', 'Heart'],
  ]],
  ['Osobowość i tożsamość', 'Brain', 'blue', [
    ['zaburzenia-osobowosci', 'Shapes'],
    ['borderline', 'Split'],
    ['narcyzm', 'Sparkles'],
    ['stabilny-obraz-siebie', 'Frame'],
    ['trudnosci-w-okresleniu-tozsamosci', 'ScanHeart'],
  ]],
  ['Kryzysy i trudne doświadczenia', 'Sprout', 'sage', [
    ['kryzys-zyciowy', 'CloudLightning'],
    ['zaloba', 'Leaf'],
    ['utrata-pracy-i-zmiany-zawodowe', 'Briefcase'],
    ['wazne-zmiany-zyciowe', 'ArrowLeftRight'],
    ['trudne-doswiadczenia-z-dziecinstwa', 'ToyBrick'],
    ['dda', 'House'],
    ['doswiadczenie-przemocy', 'ShieldX'],
    ['powracajace-wspomnienia', 'History'],
    ['wczesniejsze-doswiadczenia-a-relacje', 'BookOpen'],
  ]],
  ['Ciało i zdrowie', 'HeartPulse', 'sand', [
    ['zaburzenia-psychosomatyczne', 'HeartPulse'],
    ['trudnosci-zwiazane-z-choroba', 'Stethoscope'],
    ['zdrowie-fizyczne-i-psychiczne', 'CirclePlus'],
    ['trudnosci-z-odzywianiem', 'Utensils'],
    ['obraz-ciala', 'ScanLine'],
  ]],
  ['Ciąża i rodzicielstwo', 'Baby', 'rose', [
    ['trudnosci-okoloporodowe', 'Baby'],
    ['rodzicielstwo', 'Blocks'],
  ]],
  ['Pomoc psychologiczna dla młodzieży od 15. roku życia', 'GraduationCap', 'sage', [
    ['stres-szkolny', 'GraduationCap'],
    ['trudnosci-emocjonalne-mlodziezy', 'CloudDrizzle'],
    ['relacje-z-rowiesnikami', 'Users'],
    ['relacje-rodzinne-mlodziezy', 'Lamp'],
    ['dorastanie-i-tozsamosc', 'Sprout'],
    ['samoocena-mlodziezy', 'SquareUserRound'],
  ]],
  ['Zakres pomocy i współpraca z innymi specjalistami', 'ShieldCheck', 'sand', [
    ['problemowe-uzywanie-substancji', 'Wine'],
  ]],
] as const;

const topicsBySlug = new Map(helpTopics.map(topic => [topic.slug, topic]));
const assigned = new Set<string>();
const categories: HelpCategory[] = groups.map(([title, icon, tone, entries]) => ({
  title, icon, tone,
  topics: entries.map(([slug, icon]) => {
    const topic = topicsBySlug.get(slug);
    if (!topic || assigned.has(slug)) throw new Error(`Missing or duplicated catalogue topic: ${slug}`);
    assigned.add(slug);
    const aliases:Record<string,string>={'nadmierne-analizowanie':'ruminacje zamartwianie','lek-przed-odrzuceniem':'lęk przed porzuceniem','trudnosci-emocjonalne':'regulacja emocji','relacje-rodzinne-mlodziezy':'konflikty z rodzicami','relacje-z-rowiesnikami':'presja rówieśnicza','trudnosci-okoloporodowe':'depresja poporodowa','trudne-doswiadczenia-z-dziecinstwa':'zaniedbanie emocjonalne','asertywnosc-i-granice':'people pleasing wyrażanie potrzeb'};
    return { href: topicPath(slug), label: topic.label, icon, aliases:aliases[slug] };
  }),
}));
if (assigned.size !== helpTopics.length) throw new Error('Unassigned catalogue topics');

export default function HelpTopicIndex({ scope }: { scope: ReactNode }) {
  const [youth, services] = categories.slice(-2);
  return <CatalogueFilter categories={categories.map(c=>c.title)} label="Szukaj tematu" age>
    <section className="help-directory help-width" aria-labelledby="tematy-konsultacji">
      <h2 id="tematy-konsultacji">Obszary pomocy psychologicznej i psychoterapii</h2>
      <div className="help-card-grid" id="lista-tematow">
        {categories.slice(0, -2).map(category => <HelpCategoryCard key={category.title} category={category}/>)}
      </div>
    </section>
    <section className="help-youth help-width" data-filter-group={youth.title} data-youth="true" aria-labelledby="help-youth-heading">
      <div className="help-panel-heading"><HelpBadge {...youth}/><h2 id="help-youth-heading">{youth.title}</h2></div>
      <HelpLinks topics={youth.topics}/>
      <a className="help-youth-cta" href={paths.youth}>Jak wygląda konsultacja dla młodzieży? <HelpTopicIcon name="ArrowUpRight" size={17}/></a>
    </section>
    <section className="help-scope help-width" data-filter-group={services.title} aria-labelledby="help-scope-heading">
      <div className="help-panel-heading"><HelpBadge {...services}/><h2 id="help-scope-heading">{services.title}</h2></div>
      <HelpLinks topics={services.topics}/>
      {scope}
    </section>
  </CatalogueFilter>;
}
