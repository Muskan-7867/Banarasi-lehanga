// components/PriceDisplay.tsx
interface PriceDisplayProps {
  price: number;
  originalPrice: number;
  
}

export default function PriceDisplay({ price, originalPrice }: PriceDisplayProps) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold">₹{price.toLocaleString()}</span>
        <span className="text-lg text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
    
      </div>
     
    </div>
  );
}