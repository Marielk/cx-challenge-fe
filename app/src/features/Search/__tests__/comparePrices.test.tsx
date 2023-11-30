import { formatProductPrice, sortProducts } from '../../../utils/priceUtils';
import { product1, product2 } from '../../../__mocks__/productsMock';
import { sortTypes } from '../constants/sortTypes';
describe('comparePrices function', () => {
  it('correctly compares prices in ascending order', () => {
    const result = sortProducts(sortTypes.priceAsc, [product1, product2]);
    expect(result).toStrictEqual([product1, product2]);
  });

  it('correctly compares prices in descending order', () => {
    const result = sortProducts(sortTypes.priceDesc, [product1, product2]);
    expect(result).toStrictEqual([product2, product1]);
  });

  it('correctly transform the price to the actual currency format', () => {
    const result = formatProductPrice(10000, 'CLP');
    const expected = '10.000 CLP'
    const normalizedExpected = expected.replace(/\s/g, '');
    const normalizedReceived = result.replace(/\s/g, '');
    expect(normalizedReceived).toBe(normalizedExpected);
  })
});
