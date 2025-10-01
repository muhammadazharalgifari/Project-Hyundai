import { Clock } from 'lucide-react'
import React from 'react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6'

const MapsDealer = () => {
  return (
    <div className="mb-10 max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text bagian kiri */}
          <div className="text-center md:text-left space-y-4">
            <h1 className="text-5xl font-bold capitalize">
              Find{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent">
                Us Here
              </span>
            </h1>
            <p className="py-3 text-lg text-gray-500">
              Please visit our dealer if you want to consult directly and enjoy
              the latest and most comfortable car from Hyundai.
            </p>

            <p className="text-gray-500 text-xs">
              Jl. KH. Guru Amin No.7, Pancoran, Kec. Pancoran, Kota Jakarta
              Selatan, Daerah Khusus Ibukota Jakarta 12780
            </p>

            <div className="space-y-4">
              {/* Jam buka */}
              <div className="flex items-start md:items-center gap-3 text-gray-600">
                <Clock className="w-8 h-8 text-indigo-600 bg-indigo-100 p-2 rounded-lg hover:bg-indigo-200 hover:text-indigo-700 transition-colors shrink-0" />
                <div className="flex flex-col md:flex-row md:gap-6 text-left">
                  <p>
                    <strong>Senin - Jumat :</strong> 08:30 - 16:30
                  </p>
                  <p>
                    <strong>Sabtu :</strong> 09:00 - 14:30
                  </p>
                  <p>
                    <strong>Minggu :</strong> Closed
                  </p>
                </div>
              </div>

              {/* Kontak */}
              <div className="flex flex-col gap-3 text-gray-600">
                <div className="flex items-start md:items-center gap-3">
                  <FaWhatsapp className="text-green-600 w-8 h-8 bg-green-100 p-2 rounded-lg hover:bg-green-200 hover:text-green-700 transition-colors shrink-0" />
                  <p className="text-left">0895703083133</p>
                </div>
                <div className="flex items-start md:items-center gap-3">
                  <FaInstagram className="text-pink-600 w-8 h-8 bg-pink-100 p-2 rounded-lg hover:bg-pink-200 hover:text-red-700 transition-colors shrink-0" />
                  <p className="text-left">hyundaijakarta_gibran</p>
                </div>
              </div>
            </div>
          </div>

          {/* Maps bagian kanan */}
          <div className="h-[400px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1365384603123!2d106.84044937421672!3d-6.245731461154764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f395a5fe6867%3A0x962aca036665f9a9!2sHyundai%20Pancoran!5e0!3m2!1sid!2sid!4v1759218508255!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              className="rounded-2xl"
            ></iframe>
          </div>
        </div>
      </div>
  )
}

export default MapsDealer