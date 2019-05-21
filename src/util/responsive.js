export function isDesktop() {
  return typeof window === 'object' && window.innerWidth > 1080;
}
