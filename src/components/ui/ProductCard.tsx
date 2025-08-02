import Image from 'next/image';
import React from 'react';

export default function ProductCard() {
  return (
    <div className='w-full p-1 sm:p-3'>
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md shadow-sm hover:shadow-md transition-shadow">
        <Image
          src="http://5.imimg.com/data5/SELLER/Default/2022/2/MD/QV/DK/83545762/g-500x500.jpeg"
          alt="Wedding Wardrobe"
          fill
          className='object-cover'
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 20vw"
          priority={true}  
        />

        {/* Overlay Text - now more prominent on mobile */}
        <div className='absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/50 to-transparent p-2 sm:p-4'>
          <div className='text-center space-y-1 sm:space-y-2'>
            <h3 className='text-white font-semibold text-base sm:text-lg md:text-xl'>24 Hour Dispatch</h3>
            <p className='text-white/90 text-sm sm:text-base'>Deliver before Rakhi</p>
            <button className='bg-white text-black px-4 py-1.5 sm:px-5 sm:py-2 mt-2 sm:mt-3 rounded-full text-sm sm:text-base hover:bg-gray-100 transition-colors duration-200'>
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}