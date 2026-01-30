import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const CardLayanan = ({
  image,
  title,
  speed,
  price,
  originalPrice,
  discount,
  discountNote,
  isHighlighted,
}) => {
  const { t } = useLanguage();

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-101 ${
        isHighlighted ? "ring-4 ring-teal-500" : ""
      }`}
    >
      {/* Image */}
      <div className="relative h-28 sm:h-32 overflow-hidden">
        <img
          src={image}
          alt={title}
          width="256"
          height="128"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="bg-gray-100 p-4 sm:p-6">
        {/* Title & Speed */}
        <div className="text-center mb-3 sm:mb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
            {title}
          </h3>
          <p className="text-teal-500 font-semibold">{speed}</p>
        </div>

        {/* Price */}
        <div className="text-center mb-3">
          <div className="flex items-baseline justify-center gap-1 flex-wrap">
            <span className="text-gray-600 text-sm sm:text-base">Rp</span>
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">
              {price.toLocaleString("id-ID")}
            </span>
            <span className="text-gray-500 text-xs sm:text-sm">
              / {t("cardLayanan.month")}
            </span>
          </div>
          {originalPrice && (
            <div className="text-red-500 line-through text-xs mt-1">
              Rp {originalPrice.toLocaleString("id-ID")}
            </div>
          )}
        </div>

        {/* Discount Badge */}
        {discount && (
          <div className="bg-cyan-100 text-black text-center py-2 rounded-lg mb-3 font-semibold text-sm">
            {discount}
          </div>
        )}

        {/* Note */}
        <p className="text-gray-500 text-xs text-center mb-4">{discountNote}</p>

        {/* Buttons */}
        <div className="space-y-2">
          <a
            href={`https://wa.me/6282117777187?text=${encodeURIComponent(`Halo Palindo, saya ingin berlangganan paket ${title} (${speed}).`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-gradient-to-r from-teal-600 to-emerald-300 text-sm text-white font-semibold py-3 rounded-full transition-colors cursor-pointer hover:from-teal-700 hover:to-emerald-400"
          >
            {t("cardLayanan.subscribe")}
          </a>
          <a
            href={`https://wa.me/6282117777187?text=${encodeURIComponent(`Halo Palindo, saya ingin bertanya tentang paket ${title} (${speed}).`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 rounded-full border-2 border-gray-200 transition-colors cursor-pointer hover:text-gray-900 hover:border-gray-400"
          >
            {t("cardLayanan.chatSales")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardLayanan;
