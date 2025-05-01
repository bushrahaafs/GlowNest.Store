interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// الحصول على عناصر السلة
export const getCartItems = (): CartItem[] => {
  const items = localStorage.getItem('cart');
  return items ? JSON.parse(items) : [];
};

// إضافة عنصر للسلة
export const addToCart = (item: CartItem): void => {
  const cart = getCartItems();
  const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};

// حذف عنصر من السلة
export const removeFromCart = (id: number): void => {
  const cart = getCartItems();
  const updatedCart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

// تفريغ السلة
export const clearCart = () => {
  localStorage.removeItem('cart');
};

export const updateCartItemQuantity = (id: number, quantity: number) => {
  const cart = getCartItems().map(item =>
    item.id === id ? { ...item, quantity } : item
  );
  localStorage.setItem('cart', JSON.stringify(cart));
};





  
  
  