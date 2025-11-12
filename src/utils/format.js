export function formatPrice(n) {
  return `$${Number(n).toFixed(2)}`;
}
export function formatRating(n) {
  return Number(n).toFixed(1);
}
