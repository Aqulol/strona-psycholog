const photoWidths = [320, 480, 640, 800, 960];
const widthsByPhoto = {
  portret: photoWidths,
  portret2: photoWidths,
  gabinet: photoWidths,
  'gabinet-fotel': [320, 480, 640, 840],
  'gabinet-detal-1': [320, 480, 640],
  'gabinet-detal-2': [320, 480, 640, 840],
} as const;

export function responsiveSrcSet(name: keyof typeof widthsByPhoto | 'logo') {
  const widths = name === 'logo' ? [160, 260, 400, 520, 780] : widthsByPhoto[name];
  const variants = widths.map(width => `/images/responsive/${name}-${width}.webp ${width}w`);
  if (name !== 'logo') variants.push(`/images/${name}.webp ${name === 'gabinet-detal-1' ? 720 : 1280}w`);
  return variants.join(', ');
}

// Square exports preserve the full height of the source without downloading
// the landscape margins that would otherwise be clipped by object-fit.
export const heroPortraitSrcSet = [288, 360, 428, 576, 720, 855]
  .map(width => `/images/responsive/portret-hero-${width}.webp ${width}w`).join(', ');
export const heroPortraitSizes = '(min-width: 760px) min(428px, calc((min(100vw - 2 * clamp(16px, 4vw, 60px), 1232px) - clamp(32px, 5vw, 80px)) * .4187)), min(428px, calc(100vw - 2 * clamp(16px, 4vw, 60px)))';
