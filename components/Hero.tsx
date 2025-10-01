import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/Hero-Image.jpg"
          alt="Hero Image"
          fill
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-6xl font-extrabold leading-tight mb-3 capitalize">
          Smart mobility for a better tomorrow.
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Driving the future with Hyundai.
        </p>
        <div className="flex gap-5">
          <Link
            href="/cars"
            className="bg-gradient-to-r from-indigo-500 to-indigo-800 text-white hover:from-indigo-600 hover:to-indigo-900 py-2 px-6 md:px-10 text-lg font-semibold hover:scale-105 hover:shadow-lg rounded-lg flex items-center space-x-2 group transition-all duration-300"
          >
            <span>Find Car</span>
            <ArrowRight className="size-6 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="bg-transparent border border-indigo-500 from-indigo-500 to-indigo-800 text-white hover:from-indigo-600 hover:to-indigo-900 py-2 px-6 md:px-10 text-lg font-semibold hover:scale-105 hover:shadow-lg rounded-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
