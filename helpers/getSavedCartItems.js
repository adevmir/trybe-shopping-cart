const getSavedCartItems = () => {
  const items = localStorage.getItem('shopCart');
  const cart = document.querySelector('.cart__items');
  console.log(items);
  cart.innerHTML = items;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
