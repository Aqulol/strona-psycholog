const photoWidths = [320, 480, 640, 800, 960];
export function responsiveSrcSet(name: 'portret' | 'gabinet' | 'logo') {
  const widths = name === 'logo' ? [160, 260, 400, 520, 780] : photoWidths;
  return widths.map(width => `/images/responsive/${name}-${width}.webp ${width}w`).join(', ');
}
