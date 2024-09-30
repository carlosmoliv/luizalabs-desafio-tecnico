import { FileParserService } from './file-parser.service';
import { User } from '../entities/user';
import { Order } from '../entities/order';
import { Product } from '../entities/product';

describe('FileParserService', () => {
  let sut: FileParserService;

  beforeEach(() => {
    sut = new FileParserService();
  });

  test('parses a line and return User, Order, and Product instances', () => {
    const line =
      '0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308';

    const { user, order, product } = sut.parseLine(line);

    // Assertions for User
    expect(user).toBeInstanceOf(User);
    expect(user.user_id).toBe(70);
    expect(user.name).toBe('Palmer Prosacco');

    // Assertions for Order
    expect(order).toBeInstanceOf(Order);
    expect(order.order_id).toBe(753);
    expect(order.date).toBe('2021-03-08');

    // Assertions for Product
    expect(product).toBeInstanceOf(Product);
    expect(product.product_id).toBe(3);
    expect(product.value).toBe('1836.74');
  });
});
