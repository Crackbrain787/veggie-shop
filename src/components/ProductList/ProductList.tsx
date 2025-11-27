import { Text } from '@mantine/core';
import type { Product } from '../../types';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <div className={styles.productListContainer}>
      <Text className={styles.catalogTitle}>Catalog</Text>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}