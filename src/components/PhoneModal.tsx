"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, X } from "lucide-react";

export default function PhoneModal() {
  const [showModal, setShowModal] = useState(false);

  const phones = [
    { number: "03227700044", label: "Hat 1" },
    { number: "03227700045", label: "Hat 2" },
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-midnight-surface border border-ember/30 rounded-2xl p-6 w-full max-w-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Phone className="w-6 h-6 text-ember" />
                Bizi Arayın
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-400 text-sm mb-4">
              Hangi hattı aramak istersiniz?
            </p>

            <div className="space-y-3">
              {phones.map((phone, index) => (
                <button
                  key={phone.number}
                  onClick={() => handleCall(phone.number)}
                  className="w-full flex items-center justify-between px-6 py-4 bg-midnight border border-ember/30 rounded-xl hover:border-ember hover:bg-midnight-surface transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-ember/10 rounded-full flex items-center justify-center group-hover:bg-ember/20 transition-colors">
                      <Phone className="w-5 h-5 text-ember" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold">
                        {phone.number.replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4")}
                      </p>
                      <p className="text-xs text-gray-400">{phone.label}</p>
                    </div>
                  </div>
                  <span className="text-ember">→</span>
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Meşgul olması durumunda diğer hattı deneyebilirsiniz
            </p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
