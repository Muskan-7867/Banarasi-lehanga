import Image from "next/image";
import React from "react";

export default function MenBanner2() {
  return (
    <div className="flex justify-center gap-6 px-4 sm:px-8 py-6 mb-18">
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full h-auto lg:h-[32rem] max-w-[98rem] gap-6">
        {/* First image - full width on mobile, 8 cols on desktop */}
        <div className="col-span-1 lg:col-span-8 relative aspect-square lg:aspect-auto">
          <Image
            fill
            quality={100}
            src="https://kalki.gumlet.io/cdn/shop/files/1-square-banner-desk-kurta-jackets-520-24-07-25-all-countries-with-text.jpg?w=1020&"
            alt="banner"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Second image - full width on mobile, 4 cols on desktop */}
        <div className="col-span-1 lg:col-span-4 relative aspect-square lg:aspect-auto">
          <Image
            fill
            quality={100}
            src="https://kalki.gumlet.io/cdn/shop/files/2-square-banner-desk-kurta-set-all-countries-24-07-25-with-taxt.jpg?w=1020&"
            alt="banner"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </div>
  );
}