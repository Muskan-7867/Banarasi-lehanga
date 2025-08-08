import Categories from '@/components/user/best-sellers/components/Categories'
import Header from '@/components/user/best-sellers/components/Header'
import ProductsSection from '@/components/user/best-sellers/components/ProductsSection'
import React from 'react'

export default function BestSellers() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className='flex flex-col lg:flex-row mt-12 lg:mt-20 md:mt-28 px-4 sm:px-8 md:px-16 lg:px-32'>
        <Categories />
        <ProductsSection />
      </div>
    </div>
  )
}