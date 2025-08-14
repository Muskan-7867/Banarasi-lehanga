import CategoryHeader from '@/components/ui/Category/CategoryHeader'
import React from 'react'

export default function PartyHeader() {
  return (
     <div>
      <CategoryHeader
        title="Home / Women / Party Wear"
        subtitle="Rakhi-Ready & Pooja-Perfect Looks"
        offerText="Shop for INR 11,999 get 7% off*"
        code="FEST7"
        tncLink="/terms-and-conditions"
      />
    </div>
  )
}
