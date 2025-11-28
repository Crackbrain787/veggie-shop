import { Text, SimpleGrid } from '@mantine/core';
import type { Product } from '../../types';
import { ProductCard } from '../ProductCard/ProductCard';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <div style={{ 
      maxWidth: 1280, 
      margin: '0 auto', 
      padding: '0 20px',
      marginTop: 180 // Отступ для заголовка Catalog
    }}>
      <Text 
        fw={600} 
  size="32px" 
  style={{ 
    position: 'absolute',
    top: 119,
    left: 80,
    fontFamily: 'Inter',
    lineHeight: '40px',
    width: 121,
    height: 40
  }}
      >
        Catalog
      </Text>
      
      <SimpleGrid 
  cols={4} 
  spacing="md"
  style={{ 
    maxWidth: 1280,
    margin: '0 auto',
    marginTop: 180 
  }}
>
  {products.map((product) => (
    <ProductCard 
      key={product.id} 
      product={product} 
      onAddToCart={onAddToCart}
    />
  ))}
</SimpleGrid>
    </div>
  );
}