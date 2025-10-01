import Image from "next/image";
import React from "react";

const HeaderSection = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <header className="relative max-h-64 text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/Hero-Image.jpg"
          alt="Hero Image"
          fill
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative flex flex-col justify-center items-center h-60 text-center pt-20">
        <h1 className="text-5xl font-bold leading-tight capitalize">{title}</h1>
        <p className="text-lg md:text-xl text-gray-300">{subTitle}</p>
      </div>
    </header>
  );
};

export default HeaderSection;
