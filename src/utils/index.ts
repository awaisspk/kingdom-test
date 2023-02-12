export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const getSearchQuery = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const q = urlParams.get('q');
  const page = urlParams.get('page');
  return { q, page };
}
