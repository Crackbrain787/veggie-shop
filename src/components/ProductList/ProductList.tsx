import { Text, Box } from '@mantine/core';
import type { Product } from '../../types';
import { ProductCard } from '../ProductCard/ProductCard';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <Box style={{ 
      width: '100%',
      minHeight: '100vh',
      padding: '20px 0',
    }}>
      <Box style={{ 
        width: '100%',
        maxWidth: 1280,
        margin: '0 auto',
        position: 'relative',
        padding: '120px 40px 0 40px', // Равные отступы слева и справа
      }}>
        {/* Заголовок Catalog */}
        <Text
          style={{
            position: 'absolute',
            top: 0,
            left: 30,
            width: 121,
            height: 40,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: 32,
            lineHeight: '40px',
            letterSpacing: '0%',
            opacity: 1,
            color: 'black',
            zIndex: 10,
          }}
        >
          Catalog
        </Text>
        
        {/* Сетка товаров - 4 колонки с правильными отступами */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 302px)',
            gap: '16px',
            justifyContent: 'center', // Центрируем сетку
          }}
        >
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </Box>
    </Box>
  );
}