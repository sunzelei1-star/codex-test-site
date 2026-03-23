function encodeSvg(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function createPosterGradient(colors) {
  return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
}

export function createStars(rating) {
  const fullStars = Math.round(rating / 2);
  return '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
}

export function createArtworkDataUri({
  title,
  subtitle,
  colors,
  accent,
  width,
  height,
  tag,
}) {
  const [primary, secondary] = colors;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
        <radialGradient id="glow" cx="0.82" cy="0.18" r="0.72">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.9" />
          <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" rx="${Math.round(width * 0.05)}" fill="url(#bg)" />
      <rect width="${width}" height="${height}" rx="${Math.round(width * 0.05)}" fill="url(#glow)" />
      <circle cx="${width * 0.18}" cy="${height * 0.18}" r="${Math.min(width, height) * 0.12}" fill="rgba(255,255,255,0.1)" />
      <circle cx="${width * 0.78}" cy="${height * 0.24}" r="${Math.min(width, height) * 0.18}" fill="rgba(255,255,255,0.12)" />
      <path d="M0 ${height * 0.72} C ${width * 0.2} ${height * 0.6}, ${width * 0.45} ${height * 0.94}, ${width} ${height * 0.66} V ${height} H0 Z" fill="rgba(8,11,20,0.38)" />
      <path d="M0 ${height * 0.84} C ${width * 0.4} ${height * 0.68}, ${width * 0.64} ${height}, ${width} ${height * 0.82}" stroke="rgba(255,255,255,0.16)" stroke-width="4" fill="none" />
      <text x="${width * 0.08}" y="${height * 0.12}" font-size="${Math.max(width * 0.045, 26)}" font-family="Inter, Arial, sans-serif" fill="rgba(255,255,255,0.78)" letter-spacing="3">${tag}</text>
      <text x="${width * 0.08}" y="${height * 0.72}" font-size="${Math.max(width * 0.09, 44)}" font-weight="800" font-family="Inter, Arial, sans-serif" fill="#ffffff">${title}</text>
      <text x="${width * 0.08}" y="${height * 0.8}" font-size="${Math.max(width * 0.032, 22)}" font-family="Inter, Arial, sans-serif" fill="rgba(255,255,255,0.82)">${subtitle}</text>
      <text x="${width * 0.08}" y="${height * 0.9}" font-size="${Math.max(width * 0.028, 18)}" font-family="Inter, Arial, sans-serif" fill="rgba(255,255,255,0.62)">Muguang Cinematic Selection</text>
    </svg>
  `;

  return encodeSvg(svg.replace(/\n\s+/g, ' ').trim());
}

export function formatRating(rating) {
  return rating.toFixed(1);
}
