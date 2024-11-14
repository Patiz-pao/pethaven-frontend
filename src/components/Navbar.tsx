"use client";
import React from "react";
import { Menu, X } from "lucide-react";
import { useToggleNavbar } from "@/hooks/useToggleNavbar";
import Link from "next/link";

const Navbar = () => {
  const { isOpen, isMobile, toggleNav } = useToggleNavbar();

  return (
    <nav className="bg-orange-100 py-2 border-b-2 border-orange-300 z-50">
      <div className="container mx-auto text-center lg:px-0 lg:p-0">
        <div className="h-auto">
          <div className="text-blue-600 text-2xl font-bold py-4">
            PetHaven
          </div>

          {isMobile && (
            <button
              onClick={toggleNav}
              className="text-gray-600 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? (
                <X className="h-6 w-6 transform transition-transform duration-200 rotate-0 hover:rotate-90" />
              ) : (
                <Menu className="h-6 w-6 transform transition-transform duration-200 hover:scale-110" />
              )}
            </button>
          )}

          {!isMobile && (
            <div className="justify-items-center">
              <ul className="space-x-4 flex text-lg gap-3">
                <li>
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-orange-400 transition-colors duration-200"
                  >
                    หน้าแรก
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-gray-600 hover:text-orange-400 transition-colors duration-200"
                  >
                    สินค้า
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-orange-400 transition-colors duration-200"
                  >
                    เกี่ยวกับเรา
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-orange-400 transition-colors duration-200"
                  >
                    ติดต่อเรา
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {isMobile && (
          <div
            className={`transform transition-all duration-300 ease-in-out overflow-hidden ${
              isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="space-y-2 py-4">
              <li>
                <Link
                  href="/"
                  className="block text-gray-600 hover:text-orange-400 py-2 transition-all duration-200 hover:translate-x-1"
                >
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="block text-gray-600 hover:text-orange-400 py-2 transition-all duration-200 hover:translate-x-1"
                >
                  สินค้า
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block text-gray-600 hover:text-orange-400 py-2 transition-all duration-200 hover:translate-x-1"
                >
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block text-gray-600 hover:text-orange-400 py-2 transition-all duration-200 hover:translate-x-1"
                >
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
