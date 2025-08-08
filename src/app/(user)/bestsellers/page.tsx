import Categories from '@/components/user/best-sellers/components/Categories'
import Header from '@/components/user/best-sellers/components/Header'
import ProductsSection from '@/components/user/best-sellers/components/ProductsSection'
import React from 'react'

export default function BestSellers() {
  return (
    <div className="min-h-screen ">
      <Header />
      <div className='flex mt-28 px-32'>
        <Categories />
        <ProductsSection />
      </div>
    </div>
  )
}