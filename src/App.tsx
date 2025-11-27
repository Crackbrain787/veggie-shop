import { useState, useEffect } from 'react';
import { Loader, Notification } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useCart } from './hooks/useCart';
import { Header } from './components/Header/Header';
import { ProductList } from './components/ProductList/ProductList';
import type { Product } from './types';
import styles from './App.module.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Фиксированный Header */}
      <Header 
        cart={cart}
        onCartItemUpdate={updateQuantity}
        onCartItemRemove={removeFromCart}
        onClearCart={clearCart}
      />

      {/* Основной контент с отступом для фиксированного Header */}
      <div style={{ marginTop: '59px', minHeight: 'calc(100vh - 59px)' }}>
        {error && (
          <Notification 
            icon={<IconX size="1.1rem" />} 
            color="red" 
            onClose={() => setError(null)}
            style={{ margin: '20px auto', maxWidth: '1440px', width: 'calc(100% - 40px)' }}
          >
            {error}
          </Notification>
        )}
        
        {loading ? (
          <div className={styles.loaderContainer}>
            <Loader size="xl" />
          </div>
        ) : (
          <ProductList 
            products={products} 
            onAddToCart={addToCart}
          />
        )}
      </div>
    </div>
  );
}

export default App;