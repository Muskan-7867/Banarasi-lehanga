"use client"
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export type CategoryType = {
  _id: string;
  name: string;
  description?: string;
  images: ProductImage[];
  approved: boolean;
};

type ProductImage = {
  url: string;
  public_id?: string;
};

const CategorySection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);
  const navigate = useRouter();

  // Dummy categories data
  const categories: CategoryType[] = [
    {
      _id: "1",
      name: "Electronics",
      description: "Latest gadgets and devices",
      images: [{ url: "https://kalki.gumlet.io/cdn/shop/files/1-mens-mini-desk-kurta-set-all-countries-250x250-23-05-25.jpg?w=180&" }],
      approved: true,
    },
    {
      _id: "2",
      name: "Clothing",
      description: "Fashion for all seasons",
      images: [{ url: "https://kalki.gumlet.io/cdn/shop/files/1-mens-mini-desk-kurta-set-all-countries-250x250-23-05-25.jpg?w=180&" }],
      approved: true,
    },
    {
      _id: "3",
      name: "Home & Garden",
      description: "Everything for your home",
      images: [{ url: "https://kalki.gumlet.io/cdn/shop/files/1-mens-mini-desk-kurta-set-all-countries-250x250-23-05-25.jpg?w=180&" }],
      approved: true,
    },
    {
      _id: "4",
      name: "Sports",
      description: "Equipment and apparel",
      images: [{ url: "https://kalki.gumlet.io/cdn/shop/files/1-mens-mini-desk-kurta-set-all-countries-250x250-23-05-25.jpg?w=180&" }],
      approved: true,
    },
    {
      _id: "5",
      name: "Books",
      description: "Best sellers and more",
      images: [{ url: "https://kalki.gumlet.io/cdn/shop/files/1-mens-mini-desk-kurta-set-all-countries-250x250-23-05-25.jpg?w=180&" }],
      approved: true,
    },
    {
      _id: "6",
      name: "Beauty",
      description: "Cosmetics and skincare",
      images: [{ url: "https://kalki.gumlet.io/cdn/shop/files/1-mens-mini-desk-kurta-set-all-countries-250x250-23-05-25.jpg?w=180&" }],
      approved: true,
    },
    {
      _id: "7",
      name: "Toys",
      description: "For kids of all ages",
      images: [{ url: "https://kalki.gumlet.io/cdn/shop/files/1-mens-mini-desk-kurta-set-all-countries-250x250-23-05-25.jpg?w=180&" }],
      approved: true,
    },
    {
      _id: "8",
      name: "Food",
      description: "Gourmet and specialty",
      images: [{ url: "https://kalki.gumlet.io/cdn/shop/files/1-mens-mini-desk-kurta-set-all-countries-250x250-23-05-25.jpg?w=180&" }],
      approved: true,
    },
    {
      _id: "9",
      name: "Books",
      description: "Best sellers and more",
      images: [{ url: "https://kalki.gumlet.io/cdn/shop/files/1-mens-mini-desk-kurta-set-all-countries-250x250-23-05-25.jpg?w=180&" }],
      approved: true,
    },
    {
      _id: "10",
      name: "Beauty",
      description: "Cosmetics and skincare",
      images: [{ url: "https://kalki.gumlet.io/cdn/shop/files/1-mens-mini-desk-kurta-set-all-countries-250x250-23-05-25.jpg?w=180&" }],
      approved: true,
    },
    {
      _id: "11",
      name: "Toys",
      description: "For kids of all ages",
      images: [{ url: "https://kalki.gumlet.io/cdn/shop/files/1-mens-mini-desk-kurta-set-all-countries-250x250-23-05-25.jpg?w=180&" }],
      approved: true,
    },
    {
      _id: "12",
      name: "Food",
      description: "Gourmet and specialty",
      images: [{ url: "https://kalki.gumlet.io/cdn/shop/files/1-mens-mini-desk-kurta-set-all-countries-250x250-23-05-25.jpg?w=180&" }],
      approved: true,
    },
  ];

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftBtn(scrollLeft > 0);
      setShowRightBtn(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  const scrollLeft = () =>
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () =>
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <div className="h-auto bg-white p-6 relative overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:text-3xl text-xl font-bold font-serif mb-8 text-primary text-center text-black"
      >
        Shop by Categories
      </motion.h1>

      <div className="relative px-6">
        {showLeftBtn && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-[5rem] -translate-y-1/2 z-10 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition bg-white/80 backdrop-blur-sm border border-primary"
          >
            <FaChevronLeft className="w-4 h-4 text-black" />
          </button>
        )}
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-8 overflow-x-auto pb-8 relative"
        style={{
          scrollbarWidth: 'none', // For Firefox
          msOverflowStyle: 'none', // For IE and Edge
        }}
      >
        <style jsx>{`
          .overflow-x-auto::-webkit-scrollbar {
            display: none; // For Chrome, Safari and Opera
          }
        `}</style>
        {categories?.map((category: CategoryType, index: number) => (
          <motion.div
            key={category._id}
            onClick={() => {
              navigate.push("/products");
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="flex flex-col items-center min-w-fit"
          >
            <div className="lg:w-32 lg:h-32 w-28 h-28 rounded-full shadow-md border-2 border-white hover:border-pink-600 transition-all duration-500 group overflow-hidden relative">
              <div className="absolute -top-12 w-12 h-[16rem] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-16 -rotate-45 group-hover:translate-x-[11rem] transition-all duration-500" />
              <motion.img
                src={
                  category.images?.[0]?.url || "https://via.placeholder.com/150"
                }
                alt={category.name}
                className="w-full h-full object-cover"
                transition={{ duration: 0.1 }}
              />
            </div>
            <span className="text-lg font-medium text-black text-center mt-2">
              {category.name}
            </span>
          </motion.div>
        ))}
      </div>

      {showRightBtn && (
        <button
          onClick={scrollRight}
          className="absolute right-6 top-[9rem] z-10 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition bg-white/80 backdrop-blur-sm border-primary border-1"
        >
          <FaChevronRight className="w-4 h-4 text-black" />
        </button>
      )}
    </div>
  );
};

export default CategorySection;