import { FileReader } from '../../ports/file-reader';
import { OrderProcessorService } from './order-processor.service';
import { FileParserService } from '../file-parser/file-parser.service';

class MockFileReader implements FileReader {
  read(filePath: string): string[] {
    return [
      '0000000075                                  Bobbie Batz00000007980000000002     1578.5720211116',
      '0000000049                               Ken Wintheiser00000005230000000003      586.7420210903',
    ];
  }
}

describe('OrderProcessor', () => {
  let sut: OrderProcessorService;

  beforeAll(() => {
    const fileReader = new MockFileReader();
    const fileParser = new FileParserService();
    sut = new OrderProcessorService(fileReader, fileParser);
  });

  it('process orders correctly', () => {
    const users = sut.process('mockFilePath');

    // Assertions for first user
    const user1 = users[0];
    expect(user1.user_id).toBe(75);
    expect(user1.name).toBe('Bobbie Batz');
    expect(user1.orders.length).toBe(1);

    const order1 = user1.orders[0];
    expect(order1.order_id).toBe(798);
    expect(order1.date).toBe('2021-11-16');
    expect(order1.products.length).toBe(1);

    const product1 = order1.products[0];
    expect(product1.product_id).toBe(2);
    expect(product1.value).toBe('1578.57');

    // Assertions for second user
    const user2 = users[1];
    expect(user2.user_id).toBe(49);
    expect(user2.name).toBe('Ken Wintheiser');
    expect(user2.orders.length).toBe(1);

    const order2 = user2.orders[0];
    expect(order2.order_id).toBe(523);
    expect(order2.date).toBe('2021-09-03');
    expect(order2.products.length).toBe(1);

    const product2 = order2.products[0];
    expect(product2.product_id).toBe(3);
    expect(product2.value).toBe('586.74');
  });
});
