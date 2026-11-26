// Set once, on the first production publication, not on every build.
const publication = process.env.FEATURE_ARTICLES_PUBLISHED_ON;
if (publication && (!/^\d{4}-\d{2}-\d{2}$/.test(publication) || !Number.isFinite(Date.parse(publication)) || new Date(publication).toISOString().slice(0, 10) !== publication)) {
  throw new Error('FEATURE_ARTICLES_PUBLISHED_ON must be a valid YYYY-MM-DD date');
}

export const featureArticles = [
  {
    slug: 'samotnosc',
    title: 'Samotność: skąd się bierze i co może pomóc?',
    h1: 'Samotność - skąd się bierze i dlaczego można czuć się samotnym wśród ludzi?',
    description: 'Czym samotność różni się od przebywania w pojedynkę? O samotności emocjonalnej, bliskości w związku i o tym, kiedy warto rozważyć rozmowę z psychologiem.',
    published: publication,
  },
  {
    slug: 'poczucie-wlasnej-wartosci',
    title: 'Poczucie własnej wartości: skąd się biorą wahania?',
    h1: 'Poczucie własnej wartości - jak powstaje i dlaczego bywa niestabilne?',
    description: 'Czym poczucie własnej wartości różni się od samooceny i pewności siebie? O tym, jak na sposób widzenia siebie wpływają relacje, krytyka i osiągnięcia.',
    published: publication,
  },
] as const;
