import { Order } from './order';

export class User {
  constructor(
    public user_id: number,
    public name: string,
    public orders: Order[],
  ) {}
}
