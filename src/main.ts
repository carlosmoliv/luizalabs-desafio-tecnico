import * as path from 'path';

import { makeOrderProcessorService } from './factories/make-order-processor-service.factory';
import { User } from './entities/user';

const DATA_FILE = 'data/data_1.txt';
const DATA_DIRECTORY = 'data/';

function processOrders(filePath: string) {
  const orderProcessor = makeOrderProcessorService();
  return orderProcessor.process(filePath);
}

function main() {
  try {
    const args = process.argv.slice(2);

    let users: User[];
    if (args.includes('--file')) {
      const filePath = path.join(__dirname, DATA_FILE);
      users = processOrders(filePath);
      console.log('Processed users from file:', JSON.stringify(users, null, 2));
    }

    if (args.includes('--directory')) {
      const directoryPath = path.join(__dirname, DATA_DIRECTORY);
      users = processOrders(directoryPath);
      console.log(
        'Processed users from directory:',
        JSON.stringify(users, null, 2),
      );
    }
  } catch (error) {
    console.error('Error processing orders:', error);
  }
}

main();
