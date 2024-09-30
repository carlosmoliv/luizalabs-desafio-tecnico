import { User } from '../../entities/user';
import { Order } from '../../entities/order';
import { Product } from '../../entities/product';

export type ParseLineOutput = { user: User; order: Order; product: Product };
