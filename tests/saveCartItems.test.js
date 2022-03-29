const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');
const exemplo = '<ol><li>Item</li></ol>';

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('este se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', async () => {
    await saveCartItems(exemplo);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems', async () => {
    await saveCartItems(exemplo);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', exemplo);
  });
});
