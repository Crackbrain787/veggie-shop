import { SimpleGrid } from '@mantine/core';
import type { Product } from '../../types';
import { ProductCard } from '../ProductCard/ProductCard';


interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart}
        />
      ))}
    </SimpleGrid>
  );
}