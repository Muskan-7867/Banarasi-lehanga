import Image from 'next/image'
import React from 'react'

export default function Banner() {
  return (
    <div className="w-full aspect-[16/6] relative mt-6">
      <Image
        src="https://kalki.gumlet.io/cdn/shop/files/2_slider_banner_banner_new_arrival_all_country_1640x615_1_8_25.jpg?w=1480&"
        alt="banner"
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
      />
    </div>
  )
}