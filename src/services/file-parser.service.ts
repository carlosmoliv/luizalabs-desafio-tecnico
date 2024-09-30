import { Product } from '../entities/product';
import { Order } from '../entities/order';
import { User } from '../entities/user';
import { ParseLineOutput } from './parse-line.output';

export class FileParserService {
  parseLine(line: string): ParseLineOutput {
    const userId = parseInt(line.slice(0, 10), 10);
    const name = line.slice(10, 55).trim();
    const orderId = parseInt(line.slice(55, 65), 10);
    const productId = parseInt(line.slice(65, 75), 10);
    const value = parseFloat(line.slice(75, 87)).toFixed(2);
    const date = this.formatDate(line.slice(87, 95));

    const user = new User(userId, name);
    const order = new Order(orderId, date);
    const product = new Product(productId, value);

    return { user, order, product };
  }

  private formatDate(yyyymmdd: string): string {
    const year = yyyymmdd.slice(0, 4);
    const month = yyyymmdd.slice(4, 6);
    const day = yyyymmdd.slice(6, 8);
    return `${year}-${month}-${day}`;
  }
}
