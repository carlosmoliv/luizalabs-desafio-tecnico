import { Order } from './order';

export class User {
  public orders: Order[] = [];

  constructor(
    public user_id: number,
    public name: string,
  ) {}

  addOrder(order: Order): void {
    this.orders.push(order);
  }
}
