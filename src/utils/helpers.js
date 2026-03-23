export function createPosterGradient(colors) {
  return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
}

export function createStars(rating) {
  const fullStars = Math.round(rating / 2);
  return '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
}
