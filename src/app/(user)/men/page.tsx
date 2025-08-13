import CategorySection from '@/components/user/men/components/CategorySection'
import MenBanner from '@/components/user/men/components/MenBanner'
import MenProducts from '@/components/user/men/components/MenProducts'
import React from 'react'

export default function MenPage() {
  return (
   <>
     <MenProducts />
     <MenBanner />
     <CategorySection />
   </>
  )
}
