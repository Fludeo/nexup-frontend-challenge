import React, { useState } from 'react';
import { ProductList } from '../ProuductList/ProductList';
import { CategoryFilter } from '../CategoryFilter';
import { useProducts } from '../../hooks/useProducts';
import { IProductQuery } from '../../api/products.service';
import './ProductManager.css';

export const ProductManager: React.FC = () => {
  const [productQuery, setProductQuery] = useState<IProductQuery>({
    filters: [],
  });
  const { products, loading, error } = useProducts(productQuery);

  return (
    <div className="product-manager">
      <CategoryFilter
        onNewFilters={(filters) => {
          setProductQuery({ filters });
        }}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {products && loading === false && <ProductList productList={products} />}
    </div>
  );
};
