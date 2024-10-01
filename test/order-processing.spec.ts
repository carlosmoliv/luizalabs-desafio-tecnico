import * as path from 'path';

import { makeOrderProcessorService } from '../src/factories/make-order-processor-service.factory';
import { OrderProcessorService } from '../src/services/order-processor/order-processor.service';

describe('Order processing with real file input', () => {
  let filePath: string;
  let directoryPath: string;
  let orderProcessor: OrderProcessorService;

  beforeAll(() => {
    filePath = path.join(__dirname, 'data/test_data.txt');
    directoryPath = path.join(__dirname, 'data/test-directory');
    orderProcessor = makeOrderProcessorService();
  });

  test('process orders from a real file and return the correct list of users with orders', () => {
    const expectedOutput = [
      {
        user_id: 75,
        name: 'Bobbie Batz',
        orders: [
          {
            order_id: 798,
            date: '2021-11-16',
            products: [
              { product_id: 2, value: '1578.57' },
              { product_id: 3, value: '200.00' },
            ],
          },
        ],
      },
      {
        user_id: 49,
        name: 'Ken Wintheiser',
        orders: [
          {
            order_id: 523,
            date: '2021-09-03',
            products: [{ product_id: 3, value: '586.74' }],
          },
        ],
      },
    ];

    const result = orderProcessor.process(filePath);

    expect(result).toEqual(expectedOutput);
  });

  test('process orders from a real directory with multiple files and return the correct list of users with orders', () => {
    const expectedOutput = [
      {
        user_id: 70,
        name: 'Palmer Prosacco',
        orders: [
          {
            order_id: 753,
            date: '2021-03-08',
            products: [{ product_id: 3, value: '1836.74' }],
          },
        ],
      },
      {
        user_id: 88,
        name: 'Terra Daniel DDS',
        orders: [
          {
            order_id: 836,
            date: '2021-09-09',
            products: [{ product_id: 3, value: '1899.02' }],
          },
          {
            order_id: 835,
            date: '2021-07-23',
            products: [{ product_id: 2, value: '987.82' }],
          },
        ],
      },
    ];

    const result = orderProcessor.process(directoryPath);

    expect(result).toEqual(expectedOutput);
  });
});
