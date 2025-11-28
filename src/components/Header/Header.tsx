import { useState } from 'react';
import { AppShell, Container, Group, Button, Paper, Badge } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { CartPopup } from '../CartPopup/CartPopup';
import type { CartState } from '../../types';
import classes from './Header.module.css';

interface HeaderProps {
  cart: CartState;
  onCartItemUpdate: (productId: number, quantity: number) => void;
  onCartItemRemove: (productId: number) => void;
  onClearCart: () => void;
}

export function Header({ cart, onCartItemUpdate, onCartItemRemove, onClearCart }: HeaderProps) {
  const [cartOpened, setCartOpened] = useState(false);

  return (
    <AppShell.Header className={classes.headerRoot}>
      <Container size={1440} className={classes.container}>
        
        {/* LOGO */}
        <Group align="center" gap="xs">
          <span className={classes.logoText}>Vegetable</span>
          <span className={classes.logoShop}>SHOP</span>
        </Group>

        {/* CART BUTTON */}
        <div style={{ position: 'relative' }}>
          <Button 
  leftSection={
    cart.totalItems > 0 && (
      <Badge 
        circle 
        variant="filled" 
        color="white" 
        c="black"
        size="sm"
        styles={{
          root: { 
            width: 20, 
            height: 20, 
            minWidth: 20, 
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 600,
            position: 'absolute',
            left: 9,
            top: 3
          }
        }}
      >
        {cart.totalItems}
      </Badge>
    )
  }
  rightSection={
    <IconShoppingCart 
      size={20} 
      style={{ 
        position: 'absolute',
        right: 2,
        top: 2.49
      }}
    />
  }
  styles={{
    root: {
      width: 144,
      height: 44,
      fontFamily: 'Inter',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: 0,
      position: 'relative',
      paddingLeft: 40, // Место для счетчика
      paddingRight: 40, // Место для иконки
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }}
  onClick={() => setCartOpened((o) => !o)}
>
  Cart
</Button>

          {cartOpened && (
            <Paper shadow="md" radius="md" className={classes.cartPopup}>
              <CartPopup
  cart={cart}
  onUpdateQuantity={onCartItemUpdate}
  onRemoveItem={onCartItemRemove}
  onClearCart={onClearCart}
  onCheckout={() => {
    // Здесь можно добавить логику оформления заказа
    alert(`Заказ на ${cart.totalPrice.toFixed(2)} руб. оформлен!`);
    onClearCart();
    setCartOpened(false);
  }}
/>
            </Paper>
          )}
        </div>
      </Container>
    </AppShell.Header>
  );
}