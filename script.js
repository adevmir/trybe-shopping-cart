// const { fetchProducts } = require("./helpers/fetchProducts");

// const { fetchItem } = require("./helpers/fetchItem");

function createTotalPice() {
  const price = document.createElement('p');
  price.className = 'total-price';

  return price;
}

function insertTotalPrice() {
  const price = createTotalPice();
  const button = document.querySelector('.empty-cart');
  button.insertAdjacentElement('beforebegin', price);
}

async function totalPrice() {
  const cart = document.querySelectorAll('.cart__item');
  let sum = 0;
  [...cart].forEach((element) => {
    const value = element.innerHTML.split('$')[1];
    sum += parseFloat(value);
  });
  console.log(sum.toFixed(2));
  const teste2 = document.querySelector('.total-price');
  teste2.innerHTML = `Total price R$ ${sum.toFixed(2)}`;
  
}

function saveAndPrice() {
  saveCartItems();
  totalPrice();
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function cartItemClickListener(event) {
  event.target.parentNode.removeChild(event.target);
  saveAndPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addCartItem = async (event) => {
  const sku = getSkuFromProductItem(event.target.parentNode);
  const { title, price } = await fetchItem(sku);
  const item = {
    sku,
    name: title,
    salePrice: price,
  };
  const cartItem = createCartItemElement(item);
  const cart = document.querySelector('.cart__items');
  // cart.appendChild(createProductImageElement(thumbnail));
  cart.appendChild(cartItem);
  saveAndPrice();
};

function createAddCart() {
  setTimeout(() => {
    const buttonFunction = document.querySelectorAll('.item__add');
    buttonFunction.forEach((but) => {
      button = but;
      // console.log(button);
      button.onclick = addCartItem;
    });
  }, 1000);
}

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const aplicaForEachApi = async () => {
  const results = await fetchProducts('computador');
  return results.forEach((produto) => {
    const sku = produto.id;
    const name = produto.title;
    const image = produto.thumbnail;
    const { price } = produto;
    const produtos = createProductItemElement({ sku, name, image, price });
    const listaProdutos = document.querySelector('.items');
    listaProdutos.appendChild(produtos);
  });
};

function cleanCart() {
  const but = document.querySelector('.empty-cart');
  const childrens = document.querySelector('.cart__items');
  but.addEventListener('click', function () { 
    while (childrens.hasChildNodes()) {
      childrens.removeChild(childrens.firstChild);
    }
    saveAndPrice(); 
  });
}

window.onload = () => {
  aplicaForEachApi();
  createAddCart();
  getSavedCartItems();
  insertTotalPrice();
  totalPrice();
  cleanCart();
 };
