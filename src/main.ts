import * as path from 'path';

import { makeOrderProcessorService } from './factories/make-order-processor-service.factory';

const DATA_FILE = 'data/data_1.txt';
const DATA_DIRECTORY = 'data/';

function processOrders(filePath: string) {
  const orderProcessor = makeOrderProcessorService();
  return orderProcessor.process(filePath);
}

function main() {
  try {
    const filePath = path.join(__dirname, DATA_FILE);
    const directoryPath = path.join(__dirname, DATA_DIRECTORY);

    const users = processOrders(filePath);
    console.log('Processed users:', JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error processing orders:', error);
  }
}

main();
