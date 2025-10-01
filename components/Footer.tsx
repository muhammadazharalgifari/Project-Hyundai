import React from "react";
import { Youtube, Instagram, Twitter, Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 w-full py-10 md:py-16">
        <div className="grid md:grid-cols-3 gap-7">
          <div>
            <Link href="/" className="mb-10 block">
              <Image
                src="/Hyundai-Logo.png"
                width={128}
                height={49}
                alt="logo"
                className="bg-white rounded-lg p-2.5"
              />
            </Link>
            <p className="text-gray-400">
              Hyundai redefines driving with smart mobility solutions, advanced
              technology, modern comfort, and elegant design for your every
              journey.
            </p>
          </div>
          <div>
            <div className="flex gap-20">
              <div className="flex-1 md:flex-none ">
                <h4 className="mb-8 text-xl font-semibold text-white">Links</h4>
                <ul className="list-item space-y-5 text-gray-400">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/car">Find Cars</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
              <div className="flex-1 md:flex-none">
                <h4 className="mb-8 text-xl font-semibold text-white">
                  World Wide
                </h4>
                <ul className="list-item space-y-5 text-gray-400">
                  <li>
                    <Link href="#">Legal</Link>
                  </li>
                  <li>
                    <Link href="#">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link href="#">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="#">Sitemap</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-8 text-xl font-semibold text-white">Follow Us</h4>
            <div className="flex items-center space-x-4 md:justify-between">
              <Link href="#" className="bg-white p-2 rounded-full">
                <Youtube className="size-8 text-red-500 " />
              </Link>
              <Link href="#" className="bg-white p-2 rounded-full">
                <Instagram className="size-8 text-pink-500" />
              </Link>
              <Link href="#" className="bg-white p-2 rounded-full">
                <Twitter className="size-8 text-blue-400" />
              </Link>
              <Link href="#" className="bg-white p-2 rounded-full">
                <Facebook className="size-8 text-blue-600" />
              </Link>
            </div>
            <p className="mt-8 text-gray-400">
              Subscribe to our newsletter to get the latest news and updates
              from Hyundai.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 border-t border-gray-700 py-8 text-center text-xs text-white">
        &copy; Hak Cipta 2025 Hyundai Motors Indonesia. Seluruh hak dilindungi
        undang-undang.
      </div>
    </footer>
  );
};

export default Footer;
