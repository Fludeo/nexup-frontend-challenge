import { Product } from '../models/Product';
import { ProductCategory } from '../models/ProductCategory';
import { ProductStatus } from '../models/ProductStatus';

export const products: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    price: 10,
    category: ProductCategory.Fruit,
    status: ProductStatus.Active,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 20,
    category: ProductCategory.Vegetables,
    status: ProductStatus.Inactive,
  },
  {
    id: 3,
    name: 'Product 3',
    price: 30,
    category: ProductCategory.Meat,
    status: ProductStatus.Inactive,
  },
  {
    id: 4,
    name: 'Product 4',
    price: 40,
    category: ProductCategory.Meat,
    status: ProductStatus.Inactive,
  },
  {
    id: 5,
    name: 'Product 5',
    price: 50,
    category: ProductCategory.Fruit,
    status: ProductStatus.Inactive,
  },
  {
    id: 6,
    name: 'Product 6',
    price: 60,
    category: ProductCategory.Meat,
    status: ProductStatus.Inactive,
  },
  {
    id: 7,
    name: 'Product 7',
    price: 70,
    category: ProductCategory.Fruit,
    status: ProductStatus.Inactive,
  },
  {
    id: 8,
    name: 'Product 8',
    price: 80,
    category: ProductCategory.Fruit,
    status: ProductStatus.Active,
  },
  {
    id: 9,
    name: 'Product 9',
    price: 90,
    category: ProductCategory.Vegetables,
    status: ProductStatus.Active,
  },
  {
    id: 10,
    name: 'Product 10',
    price: 100,
    category: ProductCategory.Fruit,
    status: ProductStatus.Active,
  },
];
