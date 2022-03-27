const fetchItem = async (ItemID) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${ItemID}`;
  const fetchId = await fetch(url)
  .then((response) => response.json())
  .catch((error) => (error));

  console.log(fetchId);
  return fetchId;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}