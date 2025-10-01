import { Metadata } from "next";
import HeaderSection from "@/components/Header-Section";
import Image from "next/image";
import React from "react";
import { Pin, NotepadText } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are"
}

const AboutPage = () => {
  return (
    <div>
      <HeaderSection title="About Us" subTitle="Learn more about our company." />
      <div className="max-w-screen-xl mx-auto py-10 md:py-20 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="order-1 md:order-2">
            <h1 className="text-5xl md:text-4xl font-bold text-gray-900 mb-4">
              Who We{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent">
                Are.
              </span>
            </h1>
            <p className="text-gray-700 py-5 text-justify">
              Didirikan pada tahun 2020, Hyundai Motors Indonesia adalah anak
              perusahaan penjualan dan distributor resmi Hyundai Motor Company
              untuk mobil penumpang Hyundai di Indonesia. Visi perusahaan,
              {' "'}Progress for Humanity{'" '}, adalah dasar dari dedikasi kami
              dalam menyediakan jajaran produk dengan teknologi yang membantu
              membangun solusi untuk masa depan yang lebih berkelanjutan.
              Perusahaan ini berencana meraih posisi terdepan dalam
              elektrifikasi menurut Strategi 2025 dengan berfokus untuk
              menghadirkan produk dan layanan yang paling diinginkan pelanggan
              dan menjadi Produsen Solusi Mobilitas Cerdas.
            </p>
            <ul className="list-item space-y-6 pt-8">
              <li className="flex gap-5 group transition-all duration-300">
                <div className="flex-none mt-1">
                  <div className="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Pin className="size-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Vision :</h4>
                  <p className="text-gray-600 text-justify">
                    Menjadi Produsen Solusi Mobilitas Cerdas yang berfokus pada
                    {' "'}Progress for Humanity{'" '}, dengan menghadirkan
                    produk dan layanan otomotif berteknologi ramah lingkungan
                    serta berorientasi pada manusia untuk membangun masa depan
                    yang lebih berkelanjutan dan memberikan kehidupan yang lebih
                    baik bagi masyarakat.
                  </p>
                </div>
              </li>
              <li className="flex gap-5 group transition-all duration-300">
                <div className="flex-none mt-1 ">
                  <div className="bg-purple-100 rounded-lg w-12 h-12 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <NotepadText className="size-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Mission :</h4>
                  <div className="text-gray-600 flex flex-col space-y-3 text-justify">
                    <p>
                      • Menghadirkan jajaran produk dan layanan Hyundai yang
                      paling diinginkan pelanggan, sesuai dengan Strategi 2025
                      menuju elektrifikasi.
                    </p>
                    <p>
                      • Memberikan kebebasan bergerak yang memenuhi kebutuhan
                      dasar dan nilai emosional masyarakat guna menciptakan
                      pengalaman bermakna.
                    </p>
                    <p>
                      • Memperluas peran Hyundai di luar transportasi otomotif
                      menjadi mitra seumur hidup bagi pelanggan.
                    </p>
                    <p>
                      • Mengembangkan teknologi ramah lingkungan dan
                      berorientasi manusia untuk masa depan mobilitas.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="order-2 md:order-1">
            <Image
              src="/About-Image.jpg"
              alt="About Image"
              width={650}
              height={579}
            />
            <h1 className="text-5xl md:text-4xl font-bold text-gray-900 my-10">
              ASEAN{"'"}s First{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent">
                Manufacturing Hub.
              </span>
            </h1>
            <p className="text-gray-700 text-justify">
              Hyundai menginvestasikan USD 1,55 miliar untuk mengembangkan pusat
              manufaktur pertamanya di ASEAN. Didirikan pada tahun 2019, pabrik
              modern ini berada di lokasi seluas 8,35 juta kaki persegi (77,6
              hektar) di Kota Deltamas, Bekasi, yang akan dioperasikan oleh PT
              Hyundai Motor Manufacturing Indonesia (HMMI). Pabrik tersebut
              diperkirakan akan memulai produksi komersial pada paruh kedua 2021
              dengan kapasitas per tahun 150.000 unit dan pada akhirnya 250.000
              unit setiap tahun saat mencapai kapasitas maksimumnya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
