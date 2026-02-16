"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function QRCodePage() {
  const [menuUrl, setMenuUrl] = useState("");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  useEffect(() => {
    // Get current URL (production'da gerçek URL olacak)
    if (typeof window !== "undefined") {
      setMenuUrl(window.location.origin);
    }
  }, []);

  const downloadQRCode = (size: number, filename: string) => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = size;
    canvas.height = size;

    img.onload = () => {
      ctx?.drawImage(img, 0, 0, size, size);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = filename;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="min-h-screen bg-midnight py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            QR Kod Menü
          </h1>
          <p className="text-gray-400 text-lg">
            Haşim Usta Kebap - Dijital Menü
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Müşterileriniz bu QR kodu okutarak menüye ulaşabilir
          </p>
        </motion.div>

        {/* QR Code Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-12 mb-8 shadow-2xl"
        >
          <div className="flex justify-center">
            <QRCodeSVG
              id="qr-code-svg"
              value={menuUrl || "https://hasimusta.com"}
              size={300}
              level="H"
              includeMargin={true}
              bgColor="#FFFFFF"
              fgColor="#000000"
              imageSettings={{
                src: "/logo.png",
                height: 60,
                width: 60,
                excavate: true,
              }}
            />
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm font-mono break-all">
              {menuUrl || "URL yükleniyor..."}
            </p>
          </div>
        </motion.div>

        {/* Download Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <button
            onClick={() => setShowDownloadOptions(!showDownloadOptions)}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-ember hover:bg-ember-hover text-white font-bold rounded-xl transition-colors shadow-lg shadow-ember/30"
          >
            <Download className="w-6 h-6" />
            QR Kodu İndir
          </button>

          <AnimatePresence>
            {showDownloadOptions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-2 gap-4 overflow-hidden"
              >
                <button
                  onClick={() => downloadQRCode(512, "qr-menu-512.png")}
                  className="px-6 py-3 bg-midnight-surface border border-ember/30 text-white rounded-lg hover:border-ember transition-colors"
                >
                  512x512px
                  <span className="block text-xs text-gray-400 mt-1">Web için</span>
                </button>
                <button
                  onClick={() => downloadQRCode(1024, "qr-menu-1024.png")}
                  className="px-6 py-3 bg-midnight-surface border border-ember/30 text-white rounded-lg hover:border-ember transition-colors"
                >
                  1024x1024px
                  <span className="block text-xs text-gray-400 mt-1">Sosyal Medya</span>
                </button>
                <button
                  onClick={() => downloadQRCode(2048, "qr-menu-2048.png")}
                  className="px-6 py-3 bg-midnight-surface border border-ember/30 text-white rounded-lg hover:border-ember transition-colors"
                >
                  2048x2048px
                  <span className="block text-xs text-gray-400 mt-1">Baskı için</span>
                </button>
                <button
                  onClick={() => downloadQRCode(4096, "qr-menu-4096.png")}
                  className="px-6 py-3 bg-midnight-surface border border-ember/30 text-white rounded-lg hover:border-ember transition-colors"
                >
                  4096x4096px
                  <span className="block text-xs text-gray-400 mt-1">Yüksek Kalite</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Usage Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-midnight-surface/50 border border-ember/20 rounded-2xl p-8"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-ember rounded-full"></span>
            Kullanım Talimatları
          </h2>
          <div className="space-y-4 text-gray-300">
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-ember/20 text-ember rounded-full flex items-center justify-center font-bold text-sm">
                1
              </span>
              <div>
                <h3 className="font-semibold text-white mb-1">QR Kodu İndirin</h3>
                <p className="text-sm text-gray-400">
                  Masalara koymak için yüksek çözünürlük (2048px veya 4096px) seçin
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-ember/20 text-ember rounded-full flex items-center justify-center font-bold text-sm">
                2
              </span>
              <div>
                <h3 className="font-semibold text-white mb-1">Yazdırın</h3>
                <p className="text-sm text-gray-400">
                  Kartvizit boyutu (8.5x5.5cm) veya A6 (10.5x14.8cm) önerilir
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-ember/20 text-ember rounded-full flex items-center justify-center font-bold text-sm">
                3
              </span>
              <div>
                <h3 className="font-semibold text-white mb-1">Masalara Yerleştirin</h3>
                <p className="text-sm text-gray-400">
                  QR kodu masa üstüne koyun veya duvara asın
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-ember/20 text-ember rounded-full flex items-center justify-center font-bold text-sm">
                4
              </span>
              <div>
                <h3 className="font-semibold text-white mb-1">Müşteriler Tarasın</h3>
                <p className="text-sm text-gray-400">
                  Telefon kamerası ile okutulduğunda direkt menü açılır
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-midnight-surface/50 rounded-full border border-ember/20">
            <span className="text-gray-400 text-sm">İletişim:</span>
            <a href="tel:03227700044" className="text-ember font-bold hover:text-ember-hover transition-colors">
              0322 770 00 44
            </a>
            <span className="text-gray-500">|</span>
            <a href="tel:03227700045" className="text-ember font-bold hover:text-ember-hover transition-colors">
              0322 770 00 45
            </a>
          </div>
        </motion.div>

        {/* Back to Menu */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            ← Menüye Dön
          </a>
        </div>
      </div>
    </div>
  );
}
