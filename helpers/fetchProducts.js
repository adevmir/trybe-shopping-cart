const fetchProducts = async (QUERY) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  const fetched = await fetch(url)
  .then((response) => response.json())
  .then((data) => data.results)
  .catch((error) => (error));
  return fetched;
  // return QUERY;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}