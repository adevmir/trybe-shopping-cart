const saveCartItems = async () => {
  const cart = document.querySelector('.cart__items').innerHTML;
  localStorage.setItem('shopCart', cart);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
