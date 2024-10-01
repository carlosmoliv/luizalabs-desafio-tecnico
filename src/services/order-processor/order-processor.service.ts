import * as fs from 'fs';
import * as path from 'path';

import { FileReader } from '../../ports/file-reader';
import { FileParserService } from '../file-parser/file-parser.service';
import { User } from '../../entities/user';
import { InvalidPathException } from './invalid-path.exception';
import { Order } from '../../entities/order';
import { Product } from '../../entities/product';

export class OrderProcessorService {
  constructor(
    private readonly fileReader: FileReader,
    private readonly fileParser: FileParserService,
  ) {}

  process(filePath: string): User[] {
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      return this.processFile(filePath);
    } else if (stat.isDirectory()) {
      return this.processDirectory(filePath);
    }

    throw new InvalidPathException();
  }

  private processDirectory(directoryPath: string): User[] {
    const files = fs.readdirSync(directoryPath);
    const allUsers: User[] = [];

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const users = this.processFile(filePath);
      allUsers.push(...users);
    }

    return allUsers;
  }

  private processFile(filePath: string): User[] {
    const users: Map<number, User> = new Map();
    const lines = this.fileReader.read(filePath);

    lines.forEach((line) => {
      const { user, order, product } = this.fileParser.parseLine(line);
      this.addOrUpdateUser(users, user, order, product);
    });

    return Array.from(users.values());
  }

  private addOrUpdateUser(
    users: Map<number, User>,
    user: User,
    order: Order,
    product: Product,
  ) {
    if (!users.has(user.user_id)) {
      users.set(user.user_id, user);
    }

    const existingUser = users.get(user.user_id);
    let existingOrder = existingUser.orders.find(
      (o) => o.order_id === order.order_id,
    );

    if (!existingOrder) {
      existingUser.addOrder(order);
      existingOrder = order;
    }

    existingOrder.addProduct(product);
  }
}
