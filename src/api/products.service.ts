import { Product } from '../models/Product';
import { products } from './products.mock';

export const getProductList = (): Promise<Product[]> => {
  return Promise.resolve(products);
};
