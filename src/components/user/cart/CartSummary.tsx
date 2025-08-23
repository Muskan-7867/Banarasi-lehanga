"use client";


interface CartSummaryProps {
  subtotal: string;
 
  onViewCart: () => void;
}

export default function CartSummary({ subtotal,  onViewCart }: CartSummaryProps) {
  return (
    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
        <p>Subtotal</p>
        <p>₹{subtotal}</p>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={onViewCart}
          className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
        >
          View Cart
        </button>
      
      </div>
    </div>
  );
}