import * as fs from 'fs';

import { FileReader } from '../../ports/file-reader';
import { OrderProcessorService } from './order-processor.service';
import { FileParserService } from '../file-parser/file-parser.service';

jest.mock('fs');

describe('OrderProcessor', () => {
  let sut: OrderProcessorService;
  let mockFileReader: jest.Mocked<FileReader>;

  beforeAll(() => {
    mockFileReader = { read: jest.fn() };
    const fileParser = new FileParserService();
    sut = new OrderProcessorService(mockFileReader, fileParser);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('process orders correctly', () => {
    // Arrange
    (fs.statSync as jest.Mock).mockReturnValue({
      isFile: () => true,
      isDirectory: () => false,
    });
    mockFileReader.read.mockReturnValueOnce([
      '0000000075                                  Bobbie Batz00000007980000000002     1578.5720211116',
      '0000000075                                  Bobbie Batz00000007980000000003      200.0020211116',
      '0000000049                               Ken Wintheiser00000005230000000003      586.7420210903',
    ]);

    // Act
    const users = sut.process('mockFilePath');

    // Assert

    // First User
    const user1 = users[0];
    expect(user1.user_id).toBe(75);
    expect(user1.name).toBe('Bobbie Batz');
    expect(user1.orders.length).toBe(1);

    const order1 = user1.orders[0];
    expect(order1.order_id).toBe(798);
    expect(order1.date).toBe('2021-11-16');
    expect(order1.products.length).toBe(2);

    const product1 = order1.products[0];
    expect(product1.product_id).toBe(2);
    expect(product1.value).toBe('1578.57');

    const product2 = order1.products[1];
    expect(product2.product_id).toBe(3);
    expect(product2.value).toBe('200.00');

    // Second User
    const user2 = users[1];
    expect(user2.user_id).toBe(49);
    expect(user2.name).toBe('Ken Wintheiser');
    expect(user2.orders.length).toBe(1);

    const order2 = user2.orders[0];
    expect(order2.order_id).toBe(523);
    expect(order2.products.length).toBe(1);

    const product3 = order2.products[0];
    expect(product3.product_id).toBe(3);
    expect(product3.value).toBe('586.74');
  });

  test('process orders correctly from a directory', () => {
    // Arrange
    (fs.statSync as jest.Mock).mockReturnValue({
      isFile: () => false,
      isDirectory: () => true,
    });
    (fs.readdirSync as jest.Mock).mockReturnValue(['file1.txt', 'file2.txt']);
    mockFileReader.read
      .mockReturnValueOnce([
        '0000000075                                  Bobbie Batz00000007980000000002     1578.5720211116',
        '0000000075                                  Bobbie Batz00000007980000000003      200.0020211116',
      ])
      .mockReturnValueOnce([
        '0000000049                               Ken Wintheiser00000005230000000003      586.7420210903',
      ]);

    // Act
    const users = sut.process('mockDirectoryPath');

    // Assertions for first user (from file1.txt)
    const user1 = users[0];
    expect(user1.user_id).toBe(75);
    expect(user1.name).toBe('Bobbie Batz');
    expect(user1.orders.length).toBe(1);

    const order1 = user1.orders[0];
    expect(order1.order_id).toBe(798);
    expect(order1.date).toBe('2021-11-16');
    expect(order1.products.length).toBe(2);

    const product1 = order1.products[0];
    expect(product1.product_id).toBe(2);
    expect(product1.value).toBe('1578.57');

    const product2 = order1.products[1];
    expect(product2.product_id).toBe(3);
    expect(product2.value).toBe('200.00');

    // Assertions for second user (from file2.txt)
    const user2 = users[1];
    expect(user2.user_id).toBe(49);
    expect(user2.name).toBe('Ken Wintheiser');
    expect(user2.orders.length).toBe(1);

    const order2 = user2.orders[0];
    expect(order2.order_id).toBe(523);
    expect(order2.products.length).toBe(1);

    const product3 = order2.products[0];
    expect(product3.product_id).toBe(3);
    expect(product3.value).toBe('586.74');
  });
});
