import React from "react";

function BridalDescription() {
  return (
    <section className="w-full py-10 px-6 md:px-28 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h1 style={{ fontFamily: "var(--font-geist-mono)" }} className="text-3xl md:text-4xl font-serif text-gray-900 mb-6 relative inline-block">
          Bridal Wedding Dress –{" "}
          <span className="text-pink-600">Stylish Apparel</span> For Your Wedding Day
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-pink-300 rounded-full"></span>
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-light">
          Bridal dress can be described as <span className="italic">elegance wrapping a woman’s persona</span> 
          as a whole. For that matter, an outfit oozing divine aesthetics is what a bride-to-be needs. 
          Traditional lehenga choli is not the only option to weigh the grace of a bride. 
        </p>

        <p className="mt-4 text-gray-700 text-lg md:text-xl leading-relaxed font-light">
          There are absolutely <span className="font-semibold text-pink-600">light-weighted, stunning, designer,</span> 
          and quirky dresses that can steal the show as the bride walks down the aisle. 
          Beauty of <span className="italic">‘less is more’</span>, edginess, style and modernism is brought to the fore 
          with an exquisite bridal wear collection of <span className="font-semibold text-gray-900">BANARASI</span>.
        </p>

        <p className="mt-4 text-gray-700 text-lg md:text-xl leading-relaxed font-light">
          Spotlighting the changing face of trends, BANARASI offers a few key fashion pieces from 
          its ocean of designer wedding wear.
        </p>
      </div>
    </section>
  );
}

export default BridalDescription;
