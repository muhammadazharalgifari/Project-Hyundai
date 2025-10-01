"use client";

import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface Car {
  name: string;
  CarSpec: {
    Specification: {
      name: string;
      SpecCategory: {
        name: string;
      };
    };
  }[];
}

const CarSpecifications = ({ car }: { car: Car }) => {
  const [isOpen, setIsOpen] = useState(false);

  const specs = car.CarSpec.map(
    (spec) =>
      `${spec.Specification.SpecCategory.name} : ${spec.Specification.name}`
  );

  return (
    <div>
      {/* tampil singkat */}
      {specs.slice(0, 1).map((s, i) => (
        <p key={i} className="text-xs text-gray-500">
          {s}
        </p>
      ))}
      {specs.length > 3 && (
        <button
          onClick={() => setIsOpen(true)}
          className="text-indigo-600 text-xs font-medium hover:underline mt-1"
        >
          Selengkapnya
        </button>
      )}

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6">
            <DialogTitle className="text-2xl font-semibold mb-4">
              Specification{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent">
                {car.name}
              </span>
            </DialogTitle>

            {/* grid untuk spesifikasi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specs.map((s, i) => (
                <div
                  key={i}
                  className="p-3 border-b border-gray-400 rounded-lg text-sm text-gray-800"
                >
                  {s}
                </div>
              ))}
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Tutup
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default CarSpecifications;
