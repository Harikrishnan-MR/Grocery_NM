import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

type PaymentMethod = 'razorpay' | 'cod';

export default function CheckoutModal({ isOpen, onClose, total }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('razorpay');
  const { dispatch } = useCart();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    
    if (paymentMethod === 'razorpay') {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: total * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'FreshCart',
        description: 'Grocery Purchase',
        handler: function(response: any) {
          // Handle successful payment
          dispatch({ type: 'CLEAR_CART' });
          onClose();
          alert('Payment successful! Order placed.');
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#16a34a'
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } else {
      // Handle COD
      dispatch({ type: 'CLEAR_CART' });
      onClose();
      alert('Order placed successfully! You can pay on delivery.');
    }
    
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Checkout</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Total Amount: ₹{total.toFixed(2)}
          </p>

          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                checked={paymentMethod === 'razorpay'}
                onChange={() => setPaymentMethod('razorpay')}
                className="h-4 w-4 text-green-600"
              />
              <span className="text-gray-700 dark:text-gray-200">Pay Online (UPI/Card/Net Banking)</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="radio"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="h-4 w-4 text-green-600"
              />
              <span className="text-gray-700 dark:text-gray-200">Cash on Delivery</span>
            </label>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Processing...' : paymentMethod === 'razorpay' ? 'Pay Now' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}