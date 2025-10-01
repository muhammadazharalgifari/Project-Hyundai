"use client";

import { useState } from "react";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

const Navlink = () => {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      {session?.user && (
        <div className="hidden md:flex items-center justify-end md:order-2 gap-3 relative">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center space-x-2 focus:outline-none cursor-pointer"
          >
            <Image
              src={session.user.image || "/Default-Profile.png"}
              width={36}
              height={36}
              alt="Profile Picture"
              className="size-12 rounded-full object-cover border"
            />
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {openDropdown && (
            <div className="absolute right-0 top-12 w-56 bg-white border border-gray-100 rounded-lg shadow-lg p-3 z-50 space-y-2">
              <div className="px-4 py-3 border-b border-gray-100 space-y-2">
                <p className="text-sm text-gray-700 truncate capitalize">
                  {session.user.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {session.user.email}
                </p>
              </div>
              <button
                onClick={() => signOut()}
                className="w-full mt-4 py-2.5 px-4 border-t border-red-500 text-red-500 rounded-lg text-sm font-medium cursor-pointer flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center p-2 justify-center text-sm text-gray-500 hover:bg-gray-100 rounded-md md:hidden"
      >
        {!open ? (
          <Menu className="size-6 text-blue-800" />
        ) : (
          <X className="size-6" />
        )}
      </button>

      {/* Mobile & Desktop Links */}
      <div
        className={clsx("w-full md:block md:w-auto", {
          hidden: !open,
        })}
      >
        <ul className="flex flex-col font-semibold text-sm uppercase p-4 mt-4 rounded-sm bg-gray-50 md:flex-row md:items-center md:space-x-10 md:mt-0 md:p-0 md:border-0 md:bg-white">
          <li>
            <Link
              href="/"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
            >
              Home
            </Link>
          </li>

          {/* kalau admin */}
          {session?.user?.role === "admin" ? (
            <>
              <li>
                <Link
                  href="/admin/dashboard"
                  className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/category"
                  className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
                >
                  Category
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/specification"
                  className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
                >
                  Specification
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/cars"
                  className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
                >
                  Manage Cars
                </Link>
              </li>
            </>
          ) : (
            /* kalau user biasa */
            <>
              <li>
                <Link
                  href="/about"
                  className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/cars"
                  className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
                >
                  Find Cars
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
                >
                  Contact
                </Link>
              </li>
            </>
          )}

          {/* Auth (mobile) */}
          {session ? (
            <li className="pt-4 md:hidden px-3">
              <div className="flex flex-col gap-4">
                <Image
                  src={session.user.image || "/Default-Profile.png"}
                  width={36}
                  height={36}
                  alt="Profile Picture"
                  className="size-12 rounded-full object-cover border"
                />
                <div className="flex flex-col gap-2">
                  <p className="text-gray-700 text-sm capitalize">
                    {session.user.name}
                  </p>
                  <p className="text-gray-400 text-xs lowercase">
                    {session.user.email}
                  </p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="py-2.5 px-6 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-2xl cursor-pointer font-medium shadow-md flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </li>
          ) : (
            <li className="pt-4 md:pt-0">
              <Link
                href="/signin"
                className="py-2.5 px-6 bg-gradient-to-r from-indigo-500 to-indigo-800 text-white hover:from-indigo-600 hover:to-indigo-900 rounded-2xl"
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navlink;
