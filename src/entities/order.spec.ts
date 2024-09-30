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
});
