import { useEffect, useState } from 'react';
import { Product } from '../models/Product';
import { getProductList, IProductQuery } from '../api/products.service';

export const useProducts = (query: IProductQuery) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getProductList(query);

        setProducts(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return { products, loading, error };
};
