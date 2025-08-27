import { IoIosMail } from "react-icons/io";
import { MdLocalPhone, MdLocationOn } from "react-icons/md";
import { FaFacebook,  FaInstagram } from "react-icons/fa";
import  Link  from "next/link"

const Footer = () => {
  const quickLinks = [
    { name: "Home", link: "/" },
    { name: "Women", link: "/women" },
    { name: "Bridal", link: "/bridal" },
    { name: "Men", link: "/men" }
  ];

  return (
    <div className="bg-transparent w-full mt-6">
      <div className="bg-gray-900 h-auto min-h-[25rem] p-6 sm:p-[4rem]">
        <div className="max-w-[85%] mx-auto">
          {/* Main content row */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            {/* Brand Info - Left aligned */}
            <div className="space-y-6 w-full md:w-auto">
              <h2 className="text-2xl font-bold text-white">Banarasi Lehanga</h2>
              <p className="text-white text-sm leading-relaxed max-w-xs">
                Your one-stop destination for quality products. We provide the
                best shopping experience with a wide range of items to choose
                from.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-white  transition">
                  <FaFacebook size={20} />
                </Link>
          
                <Link href="https://www.instagram.com/banarsi_lehnga_house.in?igsh=M2RqODB6eG43bGl0" className="text-white  transition">
                  <FaInstagram size={20} />
                </Link>
           
              </div>
            </div>

            {/* Quick Links - Centered */}
            <div className="space-y-6 w-full md:w-auto mx-auto  md:text-left">
              <h3 className="text-lg text-white font-semibold uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      className="text-white  transition duration-300 text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info - Right aligned */}
            <div className="space-y-6 w-full md:w-auto ml-auto">
              <h3 className="text-lg text-white font-semibold uppercase tracking-wider">
                Contact Us
              </h3>
              <p className="text-white text-sm leading-relaxed max-w-xs">
                Have questions or need help? Reach out to our customer support
                team anytime.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MdLocationOn
                    className="text-white mt-1 flex-shrink-0"
                    size={18}
                  />
                  <p className="text-sm text-white mt-1">
                    NF 1, Circular Road, Quilla Mohalla, Bhairon Bazar Near Mai Hira Gate, Jalandhar, Punjab 144001
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <MdLocalPhone className="text-white" size={18} />
                  <Link
                    href="tel:+14578986546"
                    className="text-white  transition text-sm"
                  >
                    09872144408
                  </Link>
                </div>
           
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white mt-12 pt-8 text-center text-sm">
            <p className="text-white">
              &copy; {new Date().getFullYear()} Banarasi Lehnga House. All rights reserved.
              |
              <Link href="/privacyandpolicy" className="hover:text-white ml-2">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;