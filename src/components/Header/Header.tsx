import { useState } from 'react';
import { 
  Container, 
  Group, 
  Text, 
  Button, 
  Badge,
  Title
} from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import type { CartState } from '../../types';
import { CartPopup } from '../CartPopup/CartPopup';
import styles from './Header.module.css'; // ← ДОБАВЛЯЕМ ИМПОРТ СТИЛЕЙ

interface HeaderProps {
  cart: CartState;
  onCartItemUpdate: (productId: number, quantity: number) => void;
  onCartItemRemove: (productId: number) => void;
  onClearCart: () => void;
}

export function Header({ cart, onCartItemUpdate, onCartItemRemove, onClearCart }: HeaderProps) {
  const [cartOpened, setCartOpened] = useState(false);

  return (
    <Container size="xl" className={styles.headerContainer}> {/* ← ИСПОЛЬЗУЕМ CSS КЛАСС */}
      <Group justify="space-between" align="center" style={{ height: '100%' }}>
        <Title order={1} size="h2" c="green">  
          🥦 Vegetable Store
        </Title>

        {/* Кнопка для открытия корзины */}
        <Button 
          variant="light" 
          leftSection={<IconShoppingCart size={20} />}
          onClick={() => setCartOpened((o) => !o)}
        >
          Корзина
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

        {/* Панель корзины */}
        {cartOpened && (
          <div className={styles.cartPanel}> {/* ← ИСПОЛЬЗУЕМ CSS КЛАСС */}
            <CartPopup
              cart={cart}
              onUpdateQuantity={onCartItemUpdate}
              onRemoveItem={onCartItemRemove}
              onClearCart={onClearCart}
            />
          </div>
        )}

        <Group gap="xl">
          <Text component="div" fw={500}>
            Товаров: <Badge color="blue">{cart.totalItems}</Badge>
          </Text>
          <Text component="div" fw={500}>
            Сумма: <Badge color="green">{cart.totalPrice.toFixed(2)} руб.</Badge>
          </Text>
        </Group>
      </Group>
    </Container>
  );
}