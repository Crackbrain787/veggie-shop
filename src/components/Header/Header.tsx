import { useState } from 'react';
import { Text, Button, Box } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import type { CartState } from '../../types';
import { CartPopup } from '../CartPopup/CartPopup';

interface HeaderProps {
  cart: CartState;
  onCartItemUpdate: (productId: number, quantity: number) => void;
  onCartItemRemove: (productId: number) => void;
  onClearCart: () => void;
}

export function Header({ cart, onCartItemUpdate }: HeaderProps) {
  const [cartOpened, setCartOpened] = useState(false);

  return (
    <Box
      component="header"
      style={{
        width: '100%',
        height: 59,
        backgroundColor: 'var(--card-bg)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Внутренний контейнер с ограниченной шириной */}
      <Box
        style={{
          width: '100%',
          maxWidth: 1440,
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          margin: '0 auto',
        }}
      >
        {/* Логотип */}
        <Box style={{ display: 'flex', alignItems: 'center', position: 'relative', height: 33 }}>
          {/* Серый фон для "Vegetable" */}
          <Box
            style={{
              backgroundColor: '#F7F7F7',
              borderRadius: 31,
              width: 209,
              height: 33,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 15,
              position: 'relative',
            }}
          >
            <Text
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '22px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: 'var(--text-black)',
              }}
            >
              Vegetable
            </Text>
            
            {/* Зеленый прямоугольник "SHOP" */}
            <Box
              style={{
                backgroundColor: 'var(--green-primary)',
                borderRadius: 31,
                width: 80,
                height: 33,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                right: 0,
                top: 0,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '20px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: 'var(--text-white)',
                  verticalAlign: 'middle',
                }}
              >
                SHOP
              </Text>
            </Box>
          </Box>
        </Box>

        {/* Кнопка корзины с попапом */}
        <Box style={{ position: 'relative' }}>
          <Button
            styles={{
              root: {
                backgroundColor: 'var(--green-primary)',
                color: 'var(--text-white)',
                width: cart.totalItems > 0 ? 174 : 144, // Меняем ширину при наличии товаров
                height: 44,
                padding: '10px 40px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: 16,
                lineHeight: '24px',
                letterSpacing: '0%',
                borderRadius: 8,
                position: 'relative',
                '&:hover': {
                  backgroundColor: 'var(--green-dark)',
                }
              }
            }}
            onClick={() => setCartOpened((o) => !o)}
          >
            {/* Счетчик товаров - абсолютное позиционирование */}
            {cart.totalItems > 0 && (
              <Box
                style={{
                  position: 'absolute',
                  left: 12, // КОРРЕКТИРОВКА: измените это значение для перемещения счетчика по горизонтали
                  top: 12,  // КОРРЕКТИРОВКА: измените это значение для перемещения счетчика по вертикали
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'black',
                }}
              >
                {cart.totalItems}
              </Box>
            )}
            
            {/* Текст Cart - абсолютное позиционирование */}
            <Text 
              span 
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: 16,
                lineHeight: '24px',
                letterSpacing: '0%',
                position: 'absolute',
                left: '50%', // КОРРЕКТИРОВКА: измените это значение для перемещения текста по горизонтали
                top: '50%',  // КОРРЕКТИРОВКА: измените это значение для перемещения текста по вертикали
                transform: 'translate(-50%, -50%)',
              }}
            >
              Cart
            </Text>
            
            {/* Иконка корзины - абсолютное позиционирование */}
            <Box
              style={{
                position: 'absolute',
                right: 12, // КОРРЕКТИРОВКА: измените это значение для перемещения иконки по горизонтали
                top: 12,   // КОРРЕКТИРОВКА: измените это значение для перемещения иконки по вертикали
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconShoppingCart size={20} />
            </Box>
          </Button>

          {/* Popup корзины */}
          {cartOpened && (
  <Box
    style={{
      position: 'absolute',
      top: '100%',
      right: 0,
      backgroundColor: 'var(--card-bg)',
      border: '1px solid var(--gray-light)',
      padding: 20,
      zIndex: 1001,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: 'var(--border-radius-lg)',
      minWidth: 350,
      marginTop: 8,
    }}
  >
    <CartPopup
      cart={cart}
      onUpdateQuantity={onCartItemUpdate}
    />
  </Box>
)}
        </Box>
      </Box>
    </Box>
  );
}