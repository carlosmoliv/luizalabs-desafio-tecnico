import { Product } from './product';

export class Order {
  public products: Product[] = [];

  constructor(
    public order_id: number,
    public date: string,
  ) {}

  addProduct(product: Product): void {
    this.products.push(product);
  }
}
