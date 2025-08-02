import Image from 'next/image';
import React from 'react';

export default function ProductCard() {
  return (
    <div className='w-full p-2 sm:p-3'>
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md shadow-sm hover:shadow-md transition-shadow">
        <Image
          src="http://5.imimg.com/data5/SELLER/Default/2022/2/MD/QV/DK/83545762/g-500x500.jpeg"
          alt="Wedding Wardrobe"
          fill
          className='object-cover'
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        />

        {/* Overlay Text */}
        <div className='absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4'>
          <div className='text-center'>
            <h3 className='text-white font-semibold text-sm sm:text-base md:text-lg lg:text-xl'>24 Hour Dispatch</h3>
            <p className='text-white/90 text-xs sm:text-sm mt-1'>Deliver before Rakhi</p>
            <button className='bg-white text-black px-3 py-1 sm:px-4 sm:py-1.5 mt-2 sm:mt-3 rounded-full text-xs sm:text-sm hover:bg-gray-100 transition-colors'>
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}