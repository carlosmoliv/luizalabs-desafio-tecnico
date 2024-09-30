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
});
