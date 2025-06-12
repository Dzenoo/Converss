export function scrollToSection(tag: string) {
  const element = document.getElementById(tag);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}
