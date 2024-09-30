import { Product } from './product';

export class Order {
  constructor(
    public order_id: number,
    public date: string,
  ) {}
}
