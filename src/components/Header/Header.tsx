import { useState } from 'react';
import { Button, Badge } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import type { CartState } from '../../types';
import { CartPopup } from '../CartPopup/CartPopup';
import styles from './Header.module.css';

interface HeaderProps {
  cart: CartState;
  onCartItemUpdate: (productId: number, quantity: number) => void;
  onCartItemRemove: (productId: number) => void;
  onClearCart: () => void;
}

export function Header({ cart, onCartItemUpdate, onCartItemRemove, onClearCart }: HeaderProps) {
  const [cartOpened, setCartOpened] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Логотип слева */}
        <div className={styles.logo}>
          Vegetable
          <span className={styles.logoShop}>SHOP</span>
        </div>

        {/* Правая часть с информацией о корзине и кнопкой */}
        <div className={styles.cartSection}>
          <div className={styles.cartInfo}>
            <span className={styles.cartText}>Товаров: <Badge color="blue">{cart.totalItems}</Badge></span>
            <span className={styles.cartText}>Сумма: <Badge color="green">{cart.totalPrice.toFixed(2)} руб.</Badge></span>
          </div>
          
          {/* Контейнер для кнопки корзины с popup */}
          <div className={styles.cartButtonContainer}>
            <Button 
              className={styles.cartButton}
              leftSection={<IconShoppingCart size={20} />}
              onClick={() => setCartOpened((o) => !o)}
            >
              Cart
              {cart.totalItems > 0 && (
                <Badge 
                  ml="sm" 
                  color="green" 
                  variant="filled"
                >
                  {cart.totalItems}
                </Badge>
              )}
            </Button>

            {/* Popup корзины */}
            {cartOpened && (
              <div className={styles.cartPanel}>
                <CartPopup
                  cart={cart}
                  onUpdateQuantity={onCartItemUpdate}
                  onRemoveItem={onCartItemRemove}
                  onClearCart={onClearCart}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}