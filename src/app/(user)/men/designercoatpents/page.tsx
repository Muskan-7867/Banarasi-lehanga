
import CoatHeader from '@/components/user/men/coatpents/CoatHeader';
import CoatPentProducts from '@/components/user/men/coatpents/CoatPentProducts';

import React from 'react'

function CoatPentPage() {
  return (
    <div className="min-h-screen">
      <CoatHeader />
      <div className="flex flex-col lg:flex-row mt-12 lg:mt-20 md:mt-28 px-4 sm:px-8 md:px-16 lg:px-32">
        {/* <div className="lg:sticky  lg: top-20 lg:h-screen lg:overflow-y-hidden lg:pr-8">
          <Categories/>
        </div> */}

        <div className="flex-1 lg:overflow-y-auto">
          <CoatPentProducts/>
        </div>
      </div>
    </div>
  );
}

export default CoatPentPage
