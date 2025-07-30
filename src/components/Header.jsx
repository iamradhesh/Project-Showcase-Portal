"use client";
import Image from "next/image";
import { HiOutlinePencilSquare, HiOutlineUser, HiOutlineBars3 } from "react-icons/hi2";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const USER_IMAGE =
    "https://res.cloudinary.com/dknvsbuyy/image/upload/v1686314044/1617826370281_30f9a2a96a.jpg";

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Section */}
            <div className="flex-shrink-0 ">
              <Image
                src="/image/logo.png"
                alt="Logo"
                width={160}
                height={40}
                className="h-8 w-auto sm:h-10"
                priority
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 gap-2">
                <HiOutlinePencilSquare className="w-4 h-4" />
                Create Post
              </button>
              
              <button className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors duration-200 gap-2">
                <HiOutlineUser className="w-4 h-4" />
                Sign In
              </button>
              
              <div className="relative">
                <Image
                  src={USER_IMAGE}
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-400 transition-colors cursor-pointer"
                />
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center space-x-2">
              <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                <HiOutlinePencilSquare className="w-5 h-5" />
                <span className="sr-only">Create Post</span>
              </button>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <HiOutlineBars3 className="w-6 h-6" />
                <span className="sr-only">Open menu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors duration-200 gap-2">
                <HiOutlineUser className="w-4 h-4" />
                Sign In
              </button>
              
              <div className="flex items-center justify-center pt-2">
                <Image
                  src={USER_IMAGE}
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border-2 border-gray-200"
                />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;