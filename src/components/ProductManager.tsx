import React from 'react';
import { ProductList } from './ProductList';
import { CategoryFilter } from './CategoryFilter';

export const ProductManager: React.FC = () => {
  return (
    <div>
      <CategoryFilter
        onNewFilters={(filters) => {
          console.log('filters', filters);
        }}
      />
      <ProductList productList={[]} />
    </div>
  );
};
