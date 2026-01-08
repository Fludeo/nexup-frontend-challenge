import { Product } from '../models/Product';
import { ProductCategory } from '../models/ProductCategory';
import { products } from './products.mock';

export interface IProductQuery {
  filters: ProductCategory[];
}

export const getProductList = (query: IProductQuery): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered =
        query.filters.length > 0
          ? products.filter((p) => query.filters.includes(p.category))
          : products;

      resolve(filtered);
    }, 1000);
  });
};
