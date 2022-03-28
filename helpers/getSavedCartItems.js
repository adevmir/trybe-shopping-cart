const getSavedCartItems = () => {
  const items = localStorage.getItem('shopCart');
  if (items === undefined || items === {}) {
    console.log('0');
  } else {
    const cart = document.querySelector('.cart__items');

    console.log(items);
    cart.innerHTML = items;
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
