import { AppShell } from '@mantine/core';
import { useCart } from './hooks/useCart';
import { Header } from './components/Header/Header';

function App() {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

  const testProduct = {
    id: 1,
    name: "Морковь",
    price: 50,
    image: "https://via.placeholder.com/150",
    category: "Овощи"
  };

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
        />
      </AppShell.Header>

      <AppShell.Main pt={80}>
        <div style={{ padding: "20px" }}>
          <h1>🥦 Магазин овощей - ТЕСТ Mantine v7</h1>
          
          <div style={{ marginBottom: "20px" }}>
            <button 
              onClick={() => addToCart(testProduct, 1)}
              style={{ 
                padding: "10px 20px", 
                fontSize: "16px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Добавить морковь в корзину
            </button>
          </div>

          <div style={{ 
            padding: "10px", 
            backgroundColor: "#d4edda", 
            border: "1px solid #c3e6cb",
            borderRadius: "5px",
            color: "#155724"
          }}>
            ✅ Mantine v7 работает! Header с корзиной должен функционировать.
          </div>
        </div>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;