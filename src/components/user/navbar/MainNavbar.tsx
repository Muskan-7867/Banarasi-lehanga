"use client"
import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
// import { motion } from "framer-motion";
import SecondNavbar from "./SecondNavbar";

export default function MainNavbar() {
  // const [hidden, setHidden] = useState(false);
  // const [lastScrollY, setLastScrollY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;

  //     if (currentScrollY > lastScrollY && currentScrollY > 200) {
  //       // Scrolling down
  //       setHidden(true);
  //     } else if (currentScrollY < lastScrollY) {
  //       // Scrolling up
  //       setHidden(false);
  //     }

  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [lastScrollY]);

  return (
    // <motion.div
    //   variants={{
    //     visible: { y: 0 },
    //     hidden: { y: "-100%" }
    //   }}
    //   animate={hidden ? "hidden" : "visible"}
    //   transition={{ duration: 0.35, ease: "easeInOut" }}
    //   className="fixed top-0 left-0 right-0 z-[100] shadow-sm backdrop-blur-2xl"
    // >
    <div>
 <Header />
      <Navbar />
      <SecondNavbar />
    </div>
     
    // </motion.div>
  );
}
