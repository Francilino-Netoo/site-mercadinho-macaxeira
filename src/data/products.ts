import { Product } from '../types';

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Camiseta Básica',
    price: 49.90,
    description: 'Camiseta 100% algodão',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    available: true,
  },
  {
    id: '2',
    name: 'Calça Jeans',
    price: 129.90,
    description: 'Calça jeans comfort',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    available: true,
  },
  {
    id: '3',
    name: 'Tênis Casual',
    price: 199.90,
    description: 'Tênis confortável para o dia a dia',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    available: true,
  },
];