import { useState } from "react";
import { useCart } from "../../context/CartContext.jsx"; // Import useCart
import axios from "../../axiosConfig.js";

function CartPage({ onBack }) {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Initialize Razorpay payment
  const initializeRazorpayPayment = async () => {
    setLoading(true);
    
    try {
      // Create order on your backend
      const { data: orderData } = await axios.post('/api/payments/create-order', {
        amount: totalPrice * 100, // Convert to paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
      });

      if (!orderData?.success) {
        throw new Error('Failed to create order');
      }

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        openRazorpay(orderData.order);
      };
      document.body.appendChild(script);

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initialization failed. Please try again.');
      setLoading(false);
    }
  };

  const openRazorpay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay key ID
      amount: order.amount,
      currency: order.currency,
      name: 'MediCare Pharmacy',
      description: 'Medicine Purchase',
      image: '/logo.png', // Your logo URL
      order_id: order.id,
      handler: async function (response) {
        // Verify payment on your backend
        try {
          const { data: verifyData } = await axios.post('/api/payments/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyData.success) {
            alert('Payment successful! Your order has been placed.');
            clearCart(); // Clear cart after successful payment
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        } catch (error) {
          console.error('Verification error:', error);
          alert('Payment verification failed. Please contact support.');
        }
      },
      prefill: {
        name: 'Customer Name', // You can get this from user profile
        email: 'customer@example.com',
        contact: '9999999999'
      },
      notes: {
        address: 'Medicine delivery address'
      },
      theme: {
        color: '#4f46e5' // Indigo color
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  const handlePayment = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    initializeRazorpayPayment();
  };

  return (
    <div className="mx-auto p-4 mt-16 bg-indigo-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="bg-indigo-900 text-white px-4 py-2 rounded-lg hover:opacity-75 transition duration-300"
        >
          Back to Shop
        </button>
        <h1 className="text-2xl font-bold text-indigo-900">Your Cart</h1>
        <div className="w-20"></div> {/* Spacer for alignment */}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
          <button
            onClick={onBack}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          <div className="space-y-4 mb-6">
            {cart.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <h3 className="text-sm font-semibold">{item.name}</h3>
                    <p className="text-xs text-gray-600">Price: ₹{item.price}</p>
                    <p className="text-xs text-gray-500">Category: {item.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition duration-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition duration-300"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300 text-xs"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total Amount:</span>
              <span className="text-xl font-bold text-indigo-900">₹{totalPrice.toFixed(2)}</span>
            </div>
            
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 text-lg font-semibold flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                `Pay ₹${totalPrice.toFixed(2)}`
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Secure payment powered by Razorpay
            </p>
          </div>
        </div>
      )}

      {/* Simple Payment Modal (optional) */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Confirm Payment</h3>
            <p className="mb-4">Total amount: ₹{totalPrice.toFixed(2)}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={initializeRazorpayPayment}
                className="flex-1 bg-indigo-600 text-white py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;