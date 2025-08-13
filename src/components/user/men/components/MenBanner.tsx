import React from 'react'
import Banner from '../../banners/Banner'

export default function MenBanner() {
const bannerImage = [
    {
        src:"https://kalki.gumlet.io/cdn/shop/files/1-mens-slider-banner-ready-to-ship-all-country-desktop-1440x540-24-07-25.jpg?w=1480&",
        alt: "banner"
    },
    {
        src:"https://kalki.gumlet.io/cdn/shop/files/2-mens-slider-banner-see-all-mens-all-country-desktop-1440x540-23-07-25.jpg?w=1480&",
        alt: "banner"
    }
]

  return (
    <div className='flex justify-center '>

    <div className='w-[80%]'>
      <Banner image={bannerImage}/>
    </div>
    </div>
  )
}
