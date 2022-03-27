require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Teste se fetchProducts é uma função', async () => {
  const itemJson = await fetchItem('MLB1341706310');
  console.log(itemJson);
  expected(typeof itemJson).toEqual('objeto');
  });
});
