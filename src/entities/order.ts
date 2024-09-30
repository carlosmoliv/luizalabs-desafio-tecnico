import { Product } from './product';

export class Order {
  constructor(
    public order_id: number,
    public total: string,
    public date: string,
    public products: Product[],
  ) {}
}
