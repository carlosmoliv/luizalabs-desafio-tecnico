import { User } from './user';
import { Order } from './order';

describe('User', () => {
  let sut: User;

  beforeEach(() => {
    sut = new User(1, 'John Doe');
  });

  test('adds an order to the user', () => {
    const order = new Order(100, '2022-01-01');

    sut.addOrder(order);

    expect(sut.orders.length).toBe(1);
    expect(sut.orders[0]).toBe(order);
  });

  test('handle multiple orders', () => {
    const order1 = new Order(100, '2022-01-01');
    const order2 = new Order(101, '2022-02-01');

    sut.addOrder(order1);
    sut.addOrder(order2);

    expect(sut.orders.length).toBe(2);
    expect(sut.orders[0]).toBe(order1);
    expect(sut.orders[1]).toBe(order2);
  });
});
