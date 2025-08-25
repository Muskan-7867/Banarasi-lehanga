"use client";
import { ProductT } from "@/types";
import Image from "next/image";

interface CartItemProps {
  item: ProductT;
  onRemove: (itemId: string) => void;
}

export default function CartItem({ item, onRemove }: CartItemProps) {
  const firstImage = item.images?.[0]?.url
  const sizeName =
    Array.isArray(item.size) && item.size.length > 0
      ? item.size[0]?.name
      : item.size?.name || "Not specified";

  return (
    <li className="py-6 flex">
      <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100 relative">
        <Image
          fill
          src={firstImage}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.name}</h3>
            <p className="ml-4">₹{item.price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">Size: {sizeName}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
         
          <button
            type="button"
            className="font-medium text-indigo-600 hover:text-indigo-500"
            onClick={() => onRemove(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
