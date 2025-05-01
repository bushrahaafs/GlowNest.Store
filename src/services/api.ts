import axios from 'axios';

// رابط الـ API
const API_BASE_URL = 'https://localhost:7237/api';

// تعريف نوع البيانات اللي بنرسلها
export interface OrderData {
  cartItems: { productName: string; quantity: number; price: number }[];
  deliveryInfo: {
    name: string;
    address: string;
    city: string;
    phone: string;
  };
  paymentInfo: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    method: string;
  };
  userId?: number | null; // ✅ أضف هذا السطر
}

// createOrder تستقبل OrderData وتنفذ POST
export const createOrder = async (order: OrderData): Promise<{ orderId: number }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders/create-full-order`, order);
    return response.data; // يفترض يحتوي على { orderId: رقم }
  } catch (error) {
    console.error('❌ Error creating full order:', error);
    throw error;
  }
};




