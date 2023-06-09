// const { fetchProducts } = require("./helpers/fetchProducts");

// const { fetchItem } = require("./helpers/fetchItem");

const cart = document.querySelector('.cart__items');
const listaProdutos = document.querySelector('.items');

function createTotalPice() {
  const price = document.createElement('span');
  price.className = 'total-price';

  return price;
}

function insertTotalPrice() {
  const coin = document.createElement('span');
  coin.className = 'coin-define';
  coin.innerHTML = 'R$ ';

  const price = createTotalPice();
  const button = document.querySelector('.empty-cart');
  button.insertAdjacentElement('beforebegin', coin);
  coin.appendChild(price);
}

function totalPrice() {
  const cartItem = document.querySelectorAll('.cart__item');
  let sum = 0;
  [...cartItem].forEach((element) => {
    const value = element.innerHTML.split('$')[1];
    sum += parseFloat(value);
  });
  const teste2 = document.querySelector('.total-price');
  teste2.innerHTML = Number(sum.toFixed(2)); 
}

function saveAndPrice() {
  saveCartItems(cart.innerHTML); // salva lista
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
  event.target.parentNode.removeChild(event.target); //  Apagar item do carirnho 
  saveAndPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener); // elementos adicionados
  return li;
}

function addEvent() {
  const divs = document.querySelectorAll('.cart__item');
  for (let i = 0; i < divs.length; i += 1) {
    divs[i].addEventListener('click', cartItemClickListener); // em itens carregados do local 
  }
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
  cart.appendChild(cartItem);
  saveAndPrice();
};

async function createAddCart() {
  const buttonFunction = document.querySelectorAll('.item__add');
  buttonFunction.forEach((but) => {
    button = but;
    button.onclick = addCartItem;
  });
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
  listaProdutos.removeChild(listaProdutos.firstChild);
  return results.forEach((produto) => {
    const sku = produto.id;
    const name = produto.title;
    const image = produto.thumbnail;
    const { price } = produto;
    const produtos = createProductItemElement({ sku, name, image, price });
    listaProdutos.appendChild(produtos);
  });
};

function cleanCart() {
  const but = document.querySelector('.empty-cart');
  const alvo = document.querySelector('.cart__items');
  but.addEventListener('click', function () {
    alvo.innerHTML = '';
    saveAndPrice();
  });
}

function loading() {
  const section = document.createElement('section');
  section.className = 'loading';
  section.innerHTML = 'carregando...';
  listaProdutos.appendChild(section);
}

window.onload = async () => {
  loading();
  cart.innerHTML = await getSavedCartItems(); 
  addEvent();
  await aplicaForEachApi();
  createAddCart();
  insertTotalPrice();
  totalPrice();
  cleanCart();
 };
