import { Order } from './order';
import { Product } from './product';

describe('Order', () => {
  let order: Order;

  beforeEach(() => {
    order = new Order(123, '2022-01-01');
  });

  test('adds a product to the order', () => {
    const product = new Product(1, '50.25');

    order.addProduct(product);

    expect(order.products.length).toBe(1);
    expect(order.products[0]).toBe(product);
  });

  test('handles multiple products', () => {
    const product1 = new Product(1, '50.25');
    const product2 = new Product(2, '25.75');

    order.addProduct(product1);
    order.addProduct(product2);

    expect(order.products.length).toBe(2);
    expect(order.products[0]).toBe(product1);
    expect(order.products[1]).toBe(product2);
  });
});
