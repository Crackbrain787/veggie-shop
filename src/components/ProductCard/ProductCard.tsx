import { useState } from 'react';
import { 
  Card, 
  Image, 
  Text, 
  Button, 
  ActionIcon, 
  NumberInput,
} from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';
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

  const handleQuantityChange = (value: string | number) => {
    const numValue = Number(value);
    if (numValue >= 1 && numValue <= 99) {
      setQuantity(numValue);
    }
  };

  return (
    <Card 
  shadow="sm" 
  padding="lg" 
  radius="md" 
  withBorder 
  w={302} 
  h={414}
  style={{ 
    display: 'flex', 
    flexDirection: 'column',
    padding: 16 // Точный padding как в макете
  }}
>
  {/* Изображение */}
  <Card.Section 
    style={{ 
      width: 276, 
      height: 276, 
      margin: '0 auto 16px auto' // Центрируем и добавляем отступ
    }}
  >
    <Image
      src={product.image}
      width={276}
      height={276}
      alt={product.name}
      fit="cover"
    />
  </Card.Section>

  {/* Контент карточки */}
  <div style={{ 
    width: 270, 
    margin: '0 auto', // Центрируем контент внутри карточки
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  }}>
    {/* Первая строка */}
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 30,
      marginBottom: 12
    }}>
      <Text 
        fw={500} 
        size="sm" 
        style={{ 
          flex: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {product.name}
      </Text>
      
      {/* Кнопки количества */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        width: 90,
        height: 30
      }}>
        <ActionIcon 
          variant="outline" 
          size="sm"
          onClick={handleDecrement}
          disabled={quantity <= 1}
          w={24}
          h={24}
        >
          <IconMinus size={14} />
        </ActionIcon>
        
        <NumberInput
          value={quantity}
          onChange={handleQuantityChange}
          min={1}
          max={99}
          hideControls
          styles={{ 
            input: { 
              width: 40, 
              height: 24,
              minHeight: 24,
              textAlign: 'center',
              padding: '0 5px',
              fontSize: 12,
              fontWeight: 500
            } 
          }}
        />
        
        <ActionIcon 
          variant="outline" 
          size="sm"
          onClick={handleIncrement}
          w={24}
          h={24}
        >
          <IconPlus size={14} />
        </ActionIcon>
      </div>
    </div>

    {/* Вторая строка */}
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 44,
      marginTop: 'auto'
    }}>
      <Text fw={600} size="lg" style={{ width: 54 }}>
        {product.price} руб.
      </Text>
      <Button 
        styles={{
          root: {
            backgroundColor: '#E7FAEB',
            color: 'black',
            borderRadius: 8,
            width: 204,
            height: 44,
            fontWeight: 500,
            fontSize: 14,
            '&:hover': {
              backgroundColor: '#d4f5db'
            }
          }
        }}
        onClick={handleAddToCart}
      >
        Добавить в корзину
      </Button>
    </div>
  </div>
</Card>
  );
}