import { useState } from 'react';
import { 
  Card, 
  Image, 
  Text, 
  Button,
  Box
} from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((q) => Math.min(99, q + 1));
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    if (quantity < 1 || quantity > 99) {
      alert('Количество должно быть от 1 до 99');
      return;
    }
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(e.target.value);
    if (numValue >= 1 && numValue <= 99) {
      setQuantity(numValue);
    }
  };

  return (
    <Card 
      padding={16}
      radius={24}
      withBorder 
      w={302}
      h={414}
      style={{ 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: '24px',
        overflow: 'hidden',
      }}
    >
      {/* Изображение товара - точные размеры 276x276 */}
      <Box
        style={{
          width: 276,
          height: 276,
          borderRadius: '16px',
          overflow: 'hidden',
          margin: '0 auto',
          marginBottom: 16,
        }}
      >
        <Image
          src={product.image}
          width={276}
          height={276}
          alt={product.name}
          fit="cover"
        />
      </Box>

      {/* Контент карточки с правильными отступами */}
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          paddingBottom: 8, // Добавляем отступ снизу
        }}
      >
        {/* Первая строка: название товара и кнопки количества */}
        <Box
          style={{
            width: 270,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            margin: '0 auto',
            gap: 8,
            marginBottom: 12,
          }}
        >
          {/* Название товара */}
          <Text
            style={{
              flex: 1,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: 14,
              lineHeight: '20px',
              whiteSpace: 'normal',
              overflow: 'visible',
              wordBreak: 'break-word',
            }}
          >
            {product.name}
          </Text>

          {/* Кнопки количества */}
          <div
            style={{
              width: 90,
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              style={{ 
                width: 20,
                height: 20,
                borderRadius: 4,
                border: '1px solid #ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                backgroundColor: 'white',
                cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                opacity: quantity <= 1 ? 0.5 : 1
              }}
            >
              -
            </button>
            
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
              max={99}
              style={{ 
                width: 30,
                height: 20,
                textAlign: 'center',
                padding: 0,
                fontSize: 10,
                fontWeight: 500,
                border: '1px solid #ccc',
                borderRadius: 4
              }}
            />
            
            <button
              onClick={handleIncrement}
              style={{ 
                width: 20,
                height: 20,
                borderRadius: 4,
                border: '1px solid #ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              +
            </button>
          </div>
        </Box>

        {/* Вторая строка: цена и кнопка добавления */}
        <Box
          style={{
            width: 270,
            height: 44,
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            margin: '0 auto',
            marginTop: 'auto', // Прижимаем к низу
          }}
        >
          {/* Цена */}
          <Text
            style={{
              width: 54,
              height: 24,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 18,
              lineHeight: '24px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {product.price} $
          </Text>

          {/* Кнопка "Add to cart" */}
          <Button
            style={{
              width: 204,
              height: 44,
              padding: '10px 16px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 16,
              lineHeight: '24px',
              letterSpacing: '0%',
              borderRadius: 8,
              backgroundColor: '#DBF2E0',
              color: '#3B944E',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#54B46A';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#DBF2E0';
              e.currentTarget.style.color = '#3B944E';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.backgroundColor = '#54B46A';
              e.currentTarget.style.color = 'white';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.backgroundColor = '#54B46A';
              e.currentTarget.style.color = 'white';
            }}
            onClick={handleAddToCart}
          >
            <span>Add to cart</span>
            <IconShoppingCart 
              size={16} 
              style={{ 
                color: 'inherit',
                position: 'absolute',
                right: '30px',
                top: '15px',
              }} 
            />
          </Button>
        </Box>
      </Box>
    </Card>
  );
}