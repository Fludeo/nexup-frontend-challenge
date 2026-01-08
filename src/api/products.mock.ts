import { Product } from '../models/Product';
import { ProductCategory } from '../models/ProductCategory';
import { ProductStatus } from '../models/ProductStatus';

export const products: Product[] = [
  {
    id: 1,
    name: 'Red Apple',
    price: 0.87,
    category: ProductCategory.Fruit,
    status: ProductStatus.Active,
  },
  {
    id: 2,
    name: 'Butter Lettuce',
    price: 0.62,
    category: ProductCategory.Vegetables,
    status: ProductStatus.Active,
  },
  {
    id: 3,
    name: 'Beef Sirloin Steak (1kg)',
    price: 7.2,
    category: ProductCategory.Meat,
    status: ProductStatus.Active,
  },
  {
    id: 4,
    name: 'Beef Round Cut Schnitzel',
    price: 5.85,
    category: ProductCategory.Meat,
    status: ProductStatus.Inactive,
  },
  {
    id: 5,
    name: 'Premium Ecuador Banana',
    price: 1.85,
    category: ProductCategory.Fruit,
    status: ProductStatus.Active,
  },
  {
    id: 6,
    name: 'Pork Rib Chop',
    price: 6.4,
    category: ProductCategory.Meat,
    status: ProductStatus.Active,
  },
  {
    id: 7,
    name: 'Green Apple',
    price: 0.91,
    category: ProductCategory.Fruit,
    status: ProductStatus.Inactive,
  },
  {
    id: 8,
    name: 'Carrots (1kg Bag)',
    price: 1.25,
    category: ProductCategory.Vegetables,
    status: ProductStatus.Active,
  },
  {
    id: 9,
    name: 'Plum Tomato',
    price: 2.6,
    category: ProductCategory.Vegetables,
    status: ProductStatus.Active,
  },
  {
    id: 10,
    name: 'Fresh Peach',
    price: 3.4,
    category: ProductCategory.Fruit,
    status: ProductStatus.Active,
  },
];
