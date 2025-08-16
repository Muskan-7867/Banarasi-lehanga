// components/ProductOption.tsx
interface ProductOptionProps {
id?: string;
  name: string;
  price: number;
  description?: string;
  onSelect?: () => void;
}

export default function ProductOption({ name, price, description, onSelect }: ProductOptionProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
      <div>
        <p className="font-medium">{name}</p>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
      <button 
        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
        onClick={onSelect}
      >
        + ₹{price.toLocaleString()}
      </button>
    </div>
  );
}