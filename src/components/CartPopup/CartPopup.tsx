import { Group, Text, Button, ActionIcon, Stack, Divider, Image } from '@mantine/core';
import { IconPlus, IconMinus, IconTrash } from '@tabler/icons-react';
import type { CartState } from '../../types';

interface CartPopupProps {
  cart: CartState;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

export function CartPopup({ cart, onUpdateQuantity, onRemoveItem }: CartPopupProps) {
  if (cart.items.length === 0) {
    return (
      <Text size="sm" c="dimmed" style={{ padding: '20px', textAlign: 'center' }}>
        Корзина пуста
      </Text>
    );
  }

  return (
    <Stack gap="md" style={{ width: 300 }}>
      <Text fw={500} size="lg">Корзина</Text>
      
      {cart.items.map((item) => (
        <div key={item.product.id}>
          <Group justify="space-between" gap="xs">
            <Group gap="xs">
              <Image
                src={item.product.image}
                width={40}
                height={40}
                radius="sm"
                alt={item.product.name}
              />
              <div>
                <Text size="sm" fw={500} lineClamp={1}>
                  {item.product.name}
                </Text>
                <Text size="xs" c="dimmed">
                  {item.product.price} руб. × {item.quantity}
                </Text>
              </div>
            </Group>
            
            <Text size="sm" fw={600}>
              {(item.product.price * item.quantity).toFixed(2)} руб.
            </Text>
          </Group>
          
          <Group gap="xs" mt="xs">
            <ActionIcon 
              size="sm" 
              variant="outline"
              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
            >
              <IconMinus size={12} />
            </ActionIcon>
            
            <Text size="sm" style={{ minWidth: '30px', textAlign: 'center' }}>
              {item.quantity}
            </Text>
            
            <ActionIcon 
              size="sm" 
              variant="outline"
              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
            >
              <IconPlus size={12} />
            </ActionIcon>
            
            <ActionIcon 
              size="sm" 
              color="red" 
              variant="light"
              onClick={() => onRemoveItem(item.product.id)}
            >
              <IconTrash size={12} />
            </ActionIcon>
          </Group>
          
          <Divider my="sm" />
        </div>
      ))}
      
      <Group justify="space-between">
        <Text fw={600}>Итого:</Text>
        <Text fw={600} size="lg">
          {cart.totalPrice.toFixed(2)} руб.
        </Text>
      </Group>
      
  <Button color="green" fullWidth>
  Оформить заказ
</Button>
    </Stack>
  );
}