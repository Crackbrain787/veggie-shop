import { useState } from 'react';
import { 
  Card, 
  Image, 
  Text, 
  Group, 
  Button, 
  ActionIcon, 
  NumberInput,
  Badge
} from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import type { Product } from '../../types';
import styles from './ProductCard.module.css'; // ← ДОБАВЛЯЕМ ИМПОРТ СТИЛЕЙ

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

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
      shadow={isHovered ? "md" : "sm"}
      padding="lg"
      radius="md"
      withBorder
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={styles.productCard} // ← ИСПОЛЬЗУЕМ CSS КЛАСС
    >
      <Card.Section className={styles.imageSection}>
  <Image
    src={product.image}
    height={160}
    alt={product.name}
    fit="cover"
    style={{ width: '100%', height: '160px' }}
  />
</Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} size="lg">{product.name}</Text>
        <Badge color="green" variant="light">
          {product.category}
        </Badge>
      </Group>

      <Text size="xl" fw={700} c="green" mb="md">
        {product.price} руб.
      </Text>

      <Group gap="xs" mb="md">
        <ActionIcon 
          variant="outline" 
          size="lg" 
          onClick={handleDecrement}
          disabled={quantity <= 1}
        >
          <IconMinus size={16} />
        </ActionIcon>
        
        <NumberInput
          value={quantity}
          onChange={handleQuantityChange}
          min={1}
          max={99}
          styles={{ input: { width: 60, textAlign: 'center' } }}
        />
        
        <ActionIcon variant="outline" size="lg" onClick={handleIncrement}>
          <IconPlus size={16} />
        </ActionIcon>
      </Group>

      <Button 
        variant="filled" 
        color="green" 
        fullWidth 
        radius="md"
        onClick={handleAddToCart}
      >
        Добавить в корзину
      </Button>
    </Card>
  );
}