import { useState, useEffect } from 'react';
import { Loader, Notification, AppShell } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useCart } from './hooks/useCart';
import { Header } from './components/Header/Header';
import { ProductList } from './components/ProductList/ProductList';
import type { Product } from './types';

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
      header={{ height: 59 }}
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

      <AppShell.Main style={{ marginTop: 59 }}>
        {error && (
          <Notification 
            icon={<IconX size="1.1rem" />} 
            color="red" 
            onClose={() => setError(null)}
            style={{ margin: '20px auto', maxWidth: 1280, width: 'calc(100% - 40px)' }}
          >
            {error}
          </Notification>
        )}
        
        {loading ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh' 
          }}>
            <Loader size="xl" />
          </div>
        ) : (
          <ProductList 
            products={products} 
            onAddToCart={addToCart}
          />
        )}
      </AppShell.Main>
    </AppShell>
  );
}

export default App;