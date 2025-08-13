import React from 'react'
import Banner from '../../banners/Banner'

export default function HomeBanner() {
const bannerImage = [
    {
        src:"https://www.cbazaar.com/blog/wp-content/uploads/2020/01/WP_BLog_Jan21.jpg",
        alt: "banner"
    },

      {
        src:"https://kalki.gumlet.io/cdn/shop/files/4-slider-banner-mens-wear-india-uk-global-desktop-2800x1050-06-08-25.jpg?w=1480&",
        alt: "banner"
    },
  
]

  return (
    <div>
      <Banner image={bannerImage}/>
    </div>
  )
}
