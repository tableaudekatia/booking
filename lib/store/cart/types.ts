export interface CartItem {
  serviceId: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export interface CartStore extends CartState {
  addToCart: (serviceId: string) => void;
  removeFromCart: (serviceId: string) => void;
  clearCart: () => void;
  updateTotal: () => void;
}