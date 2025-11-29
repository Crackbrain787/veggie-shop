import { Text, ActionIcon, Image, Box, NumberInput } from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import type { CartState } from '../../types';

interface CartPopupProps {
  cart: CartState;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export function CartPopup({ cart, onUpdateQuantity }: CartPopupProps) {
  if (cart.items.length === 0) {
    return (
      <Box
        w={301}
        h={226.71}
        p={24}
        style={{ 
          borderRadius: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24
        }}
      >
        <Image
          src="../src/assets/cart_empty.png" 
          width={117.9}
          height={106.7}
          alt="Empty cart"
          style={{
            display: 'block',
            margin: '0 auto'
          }}
        />
        <Text 
          size="sm" 
          c="dimmed"
          style={{
            textAlign: 'center',
            width: '100%'
          }}
        >
          You cart is empty!
        </Text>
      </Box>
    );
  }

  return (
    <Box w={444} p={24}>
      {cart.items.map((item, index) => (
        <Box key={item.product.id} style={{ width: 396, height: 64, marginBottom: 16 }}>
          {/* Основной контейнер товара */}
          <Box style={{ display: 'flex', height: '100%' }}>
            {/* Фото товара */}
            <Image
              src={item.product.image}
              width={64}
              height={64}
              radius={6}
              alt={item.product.name}
              style={{ marginRight: 12 }}
            />
            
            {/* Блок с названием и информацией */}
            <Box style={{ width: 320, height: '100%' }}>
              {/* Верхняя строка: название товара */}
              <Box style={{ width: 320, height: 28, marginBottom: 4 }}>
                <Text size="sm" fw={500} style={{ lineHeight: '28px' }}>
                  {item.product.name}
                </Text>
              </Box>
              
              {/* Нижняя строка: цена и управление количеством */}
              <Box style={{ 
                width: 320, 
                height: 30, 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                {/* Цена */}
                <Text size="sm" fw={600}>
                  {item.product.price} $
                </Text>
                
                {/* Управление количеством - в одну строку без отступов */}
                <Box style={{ 
                  display: 'flex', 
                  width: 90, 
                  height: 30,
                  justifyContent: 'space-between'
                }}>
                  <ActionIcon
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      backgroundColor: '#F1F3F5',
                      border: '1px solid #DEE2E6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0,
                      cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <IconMinus size={14} />
                  </ActionIcon>

                  <NumberInput
                    value={item.quantity}
                    onChange={(value) => onUpdateQuantity(item.product.id, Number(value))}
                    min={1}
                    max={99}
                    hideControls
                    styles={{
                      root: { width: 30 },
                      input: {
                        width: 30,
                        height: 30,
                        textAlign: 'center',
                        padding: 0,
                        fontSize: 12,
                        fontWeight: 600,
                        border: 'none',
                        backgroundColor: 'transparent',
                      },
                    }}
                  />

                  <ActionIcon
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      backgroundColor: '#F1F3F5',
                      border: '1px solid #DEE2E6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0,
                      cursor: 'pointer',
                    }}
                  >
                    <IconPlus size={14} />
                  </ActionIcon>
                </Box>
              </Box>
            </Box>
          </Box>
          
          {/* Разделитель между товарами - длиной 320px */}
          {index < cart.items.length - 1 && (
            <Box 
              style={{ 
                width: 320,
                height: '1px',
                backgroundColor: '#E9ECEF',
                marginTop: 16,
                marginBottom: 16
              }} 
            />
          )}
        </Box>
      ))}
      
      {/* Разделитель после всех товаров - длиной 396px */}
      <Box 
        style={{ 
          width: 396,
          height: '1px',
          backgroundColor: '#E9ECEF',
          marginTop: 16,
          marginBottom: 16
        }} 
      />
      
      {/* Итоговая стоимость - в одной строке */}
      <Box style={{ 
        width: 396, 
        height: 24,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text fw={600}>Total</Text>
        <Text fw={600} size="lg">
          {cart.totalPrice.toFixed(2)} $
        </Text>
      </Box>
    </Box>
  );
}