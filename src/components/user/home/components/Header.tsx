import React from 'react'
import { IoShirt } from 'react-icons/io5'

export default function Header() {
  return (
    <div className="w-full app-color flex justify-center items-center gap-2 text-xs sm:text-sm md:text-base h-4 sm:h-4 md:h-6 px-2 sm:px-4">
      <IoShirt className="text-base sm:text-lg md:text-xl" />
      <h1 className="font-semibold whitespace-nowrap text-center">
        Banarasi Lehanga House
      </h1>
    </div>
  )
}
