export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  available: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AdminState {
  isAdmin: boolean;
  password: string;
}