import { useState } from 'react';
import { 
  Container, 
  Group, 
  Text, 
  Button, 
  Badge,
  Popover,
  Title
} from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import type { CartState } from '../../types';
import { CartPopup } from '../CartPopup/CartPopup';

interface HeaderProps {
  cart: CartState;
  onCartItemUpdate: (productId: number, quantity: number) => void;
  onCartItemRemove: (productId: number) => void;
}

export function Header({ cart, onCartItemUpdate, onCartItemRemove }: HeaderProps) {
  const [cartOpened, setCartOpened] = useState(false);

  return (
    <Container size="xl" style={{ height: '100%' }}>
      <Group justify="space-between" align="center" style={{ height: '100%' }}>
        <Title order={1} size="h2" c="green">  {/* ЗАМЕНИЛ color на c */}
          🥦 Vegetable Store
        </Title>
        
        <Popover
          opened={cartOpened}
          onClose={() => setCartOpened(false)}
          position="bottom-end"
          withArrow
        >
          <Popover.Target>
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
          </Popover.Target>
          
          <Popover.Dropdown>
            <CartPopup
              cart={cart}
              onUpdateQuantity={onCartItemUpdate}
              onRemoveItem={onCartItemRemove}
            />
          </Popover.Dropdown>
        </Popover>

        <Group gap="xl">
          <Text fw={500}>  {/* ЗАМЕНИЛ weight на fw */}
            Товаров: <Badge color="blue">{cart.totalItems}</Badge>
          </Text>
          <Text fw={500}>  {/* ЗАМЕНИЛ weight на fw */}
            Сумма: <Badge color="green">{cart.totalPrice.toFixed(2)} руб.</Badge>
          </Text>
        </Group>
      </Group>
    </Container>
  );
}