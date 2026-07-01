import React from "react";

const CartDrawer = ({ open, onClose, children }) => {
  return (
    <div>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-50 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ maxWidth: 600 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        {/* Cart Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <p className="text-gray-500 text-base mt-12">No products in the cart.</p>
        </div>
        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-[#EF4056] text-white font-bold py-3 rounded-full text-base uppercase tracking-wider hover:bg-[#d93548] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </aside>
    </div>
  );
};

export default CartDrawer;
