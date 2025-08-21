import SherwaniHeader from '@/components/user/men/sherwanis/SherwaniHeader';
import SherwanisProducts from '@/components/user/men/sherwanis/SherwanisProducts';
import Categories from '@/components/user/women/bridallehanga/components/Categories';
import React from 'react'

function SherwaniesPage() {
  return (
    <div className="min-h-screen">
      <SherwaniHeader />
      <div className="flex flex-col lg:flex-row mt-12 lg:mt-20 md:mt-28 px-4 sm:px-8 md:px-16 lg:px-32">
        <div className="lg:sticky  lg:top-20 lg:h-screen lg:overflow-y-hidden lg:pr-8">
          <Categories/>
        </div>

        <div className="flex-1 lg:overflow-y-auto">
          <SherwanisProducts/>
        </div>
      </div>
    </div>
  );
}

export default SherwaniesPage
