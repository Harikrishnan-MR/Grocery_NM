import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';

export default function CartSidebar() {
  const { state, dispatch } = useCart();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!state.isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      />

      <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-gray-800 shadow-xl z-50">
        <div className="h-full flex flex-col">
          <div className="px-4 py-6 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Shopping Cart</h2>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <ShoppingBag className="h-12 w-12 mb-4" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">₹{item.price.toFixed(2)}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() =>
                            dispatch({
                              type: 'UPDATE_QUANTITY',
                              payload: { id: item.id, quantity: item.quantity - 1 },
                            })
                          }
                          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-gray-600 dark:text-gray-300 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: 'UPDATE_QUANTITY',
                              payload: { id: item.id, quantity: item.quantity + 1 },
                            })
                          }
                          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <button
                        onClick={() =>
                          dispatch({ type: 'REMOVE_ITEM', payload: item.id })
                        }
                        className="p-1 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        <X className="h-5 w-5" />
                      </button>
                      <p className="font-medium text-gray-900 dark:text-white">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t dark:border-gray-600 px-4 py-6 bg-gray-50 dark:bg-gray-700">
            <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white mb-4">
              <p>Subtotal</p>
              <p>₹{total.toFixed(2)}</p>
            </div>
            <button
              onClick={() => setIsCheckoutModalOpen(true)}
              disabled={state.items.length === 0}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        total={total}
      />
    </>
  );
}