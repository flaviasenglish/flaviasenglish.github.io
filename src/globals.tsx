export const scrollToDiv = (id: string) => {
  const element = document?.getElementById(id);
  if (element != null) {
    const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};
