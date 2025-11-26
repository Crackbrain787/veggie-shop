import { useState, useEffect } from 'react';
import { AppShell, Container, Loader, Notification } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useCart } from './hooks/useCart';
import { Header } from './components/Header/Header';
import { ProductList } from './components/ProductList/ProductList';
import type { Product } from './types';
import styles from './App.module.css'; // ← ДОБАВЛЯЕМ ИМПОРТ СТИЛЕЙ

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
    <AppShell
      header={{ height: 80 }}
      padding="md"
    >
      <AppShell.Header>
        <Header 
          cart={cart}
          onCartItemUpdate={updateQuantity}
          onCartItemRemove={removeFromCart}
          onClearCart={clearCart}
        />
      </AppShell.Header>

      <AppShell.Main pt={80}>
        <Container size="xl">
          {error && (
            <Notification 
              icon={<IconX size="1.1rem" />} 
              color="red" 
              onClose={() => setError(null)}
              mb="md"
            >
              {error}
            </Notification>
          )}
          
          {loading ? (
            <div className={styles.loaderContainer}> {/* ← ИСПОЛЬЗУЕМ CSS КЛАСС */}
              <Loader size="xl" />
            </div>
          ) : (
            <ProductList 
              products={products} 
              onAddToCart={addToCart}
            />
          )}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;