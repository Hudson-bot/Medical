import { useCart } from "../../context/CartContext.jsx"; // Import useCart

function CartPage({ onBack }) {
  const { cart, updateQuantity, removeFromCart } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="mx-auto p-4 mt-16 bg-indigo-50">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div> 
      <button
        onClick={onBack}
        className="bg-indigo-900 text-white px-4 py-2 rounded-lg hover:opacity-75 transition duration-300"
      >
        Back to Shop
      </button>
      <button
      
        className="bg-indigo-900 text-white px-4 py-2 rounded-lg hover:opacity-75 transition duration-300"
      >
        Payment
      </button>
      </div>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="mt-5 bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <p className="text-xs text-gray-600">Price: ${item.price}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                    disabled={item.quantity === 1}
                    className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-300 transition duration-300"
                  >
                    -
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                    className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-300 transition duration-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition duration-300 text-xs"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;