import React, { useState } from 'react';
import { ProductList } from './ProductList';
import { CategoryFilter } from './CategoryFilter';
import { useProducts } from '../hooks/useProducts';
import { IProductQuery } from '../api/products.service';

export const ProductManager: React.FC = () => {
  const [productQuery, setProductQuery] = useState<IProductQuery>({
    filters: [],
  });
  const { products, loading, error } = useProducts(productQuery);

  console.log(products);

  return (
    <div>
      <CategoryFilter
        onNewFilters={(filters) => {
          console.log('filters', filters);
          setProductQuery({ filters });
        }}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {products && <ProductList productList={products} />}
    </div>
  );
};
