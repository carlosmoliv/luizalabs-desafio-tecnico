import * as path from 'path';

import { makeOrderProcessorService } from './make-order-processor-service.factory';

const DATA_FILE = 'data/data_1.txt';

function processOrders(filePath: string) {
  const orderProcessor = makeOrderProcessorService();
  return orderProcessor.process(filePath);
}

function main() {
  try {
    const filePath = path.join(__dirname, DATA_FILE);
    const users = processOrders(filePath);
    console.log(JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error processing orders:', error);
  }
}

main();
