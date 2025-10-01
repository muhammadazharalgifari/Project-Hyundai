import { Metadata } from "next";
import HeaderSection from "@/components/Header-Section";
import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa6";
import ContactForm from "@/components/Contact-Form";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Us",
};

const ContactPage = async () => {
  const session = await auth();
  const user = session?.user ?? null;
  return (
    <div>
      <HeaderSection
        title="Contact Us"
        subTitle="Please contact us, If you need a consultation"
      />
      <div className="max-w-screen-xl mx-auto py-10 md:py-20 px-4">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col md:flex-row flex-1">
            <div className="w-full md:w-1/2 md:h-auto">
              <Image
                src="/profile-3.jpg"
                width={400}
                height={400}
                alt="Dealer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex flex-col space-y-4 w-full md:w-1/2">
              <h1 className="text-5xl md:text-4xl font-bold text-gray-900 text-center">
                Sales{" "}
                <span className="bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent">
                  Counter.
                </span>
              </h1>
              <h3 className="text-gray-700 text-lg md:text-sm font-semibold text-center">
                Muhammad Gibran Ramadhan
              </h3>
              <p className="text-sm text-gray-500 text-justify">
                Consult immediately, get special price offers and attractive
                promotions for Hyundai Pancoran Jakarta.
              </p>
              <p className="text-sm text-gray-500 text-justify">
                Jl. KH. Guru Amin No.7, Pancoran, Kec. Pancoran, Kota Jakarta
                Selatan, Daerah Khusus Ibukota Jakarta 12780
              </p>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <FaWhatsapp className="text-green-500" />
                  <span className="text-gray-500 text-sm">0895703083133</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaInstagram className="text-pink-500" />
                  <span className="text-gray-500 text-sm">
                    hyundaijakarta_gibran
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 mx-auto">
            <ContactForm user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
