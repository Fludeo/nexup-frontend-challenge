import { Product } from '../models/Product';
import { ProductCategory } from '../models/ProductCategory';
import { products } from './products.mock';

export interface IProductQuery {
  filters: ProductCategory[];
  search?: string;
}

export const getProductList = (query: IProductQuery): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const search = query.search?.trim().toLowerCase();

      let filtered =
        query.filters.length > 0
          ? products.filter((p) => query.filters.includes(p.category))
          : products;

      if (search && search.length > 0) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(search),
        );
      }

      resolve(filtered);
    }, 1000);
  });
};
