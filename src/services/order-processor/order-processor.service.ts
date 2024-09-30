import { FileReader } from '../../ports/file-reader';
import { FileParserService } from '../file-parser/file-parser.service';
import { User } from '../../entities/user';

export class OrderProcessorService {
  private users: Map<number, User> = new Map();

  constructor(
    private readonly fileReader: FileReader,
    private readonly fileParser: FileParserService,
  ) {}

  process(filePath: string): User[] {
    const lines = this.fileReader.read(filePath);

    lines.forEach((line) => {
      const { user, order, product } = this.fileParser.parseLine(line);

      if (!this.users.has(user.user_id)) {
        this.users.set(user.user_id, user);
      }

      const existingUser = this.users.get(user.user_id)!;
      let existingOrder = existingUser.orders.find(
        (o) => o.order_id === order.order_id,
      );

      if (!existingOrder) {
        existingUser.addOrder(order);
        existingOrder = order;
      }

      existingOrder.addProduct(product);
    });

    return Array.from(this.users.values());
  }
}
