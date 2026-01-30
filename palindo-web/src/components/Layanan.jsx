import React, { useState, useEffect } from "react";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import CardLayanan from "./common/CardLayanan";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import api from "../services/api";

const Layanan = () => {
  const [activeTab, setActiveTab] = useState("fiber");
  const { t, language } = useLanguage();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const tabs = [
    { id: "fiber", label: t("layananSection.tabs.fiber") },
    { id: "combo", label: t("layananSection.tabs.combo") },
    { id: "addon", label: t("layananSection.tabs.addon") },
  ];

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const response = await api.get("/service-packages", {
          params: { category: activeTab },
        });
        setPackages(response.data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [activeTab]);

  // Helper for localization
  const getLocalized = (data) => {
    if (typeof data === "string") return data;
    return data?.[language] || data?.["id"] || data?.["en"] || "";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-16 md:py-36 bg-gradient-to-b from-teal-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          {/* Decorative Wave */}

          {/* Tabs & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6"
          >
            {/* Tabs */}
            <div className="w-full lg:w-auto flex flex-row bg-gray-200 rounded-full p-1 gap-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 sm:flex-none px-2 sm:px-6 py-2 rounded-full text-xs sm:text-base font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-teal-600 to-emerald-300 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filter Button */}
            <button className="w-full lg:w-auto justify-center flex items-center gap-2 px-6 py-2 border-2 border-gray-300 rounded-full hover:border-teal-500 hover:text-teal-500 transition-colors font-semibold">
              <SlidersHorizontal className="w-5 h-5" />
              {t("layananSection.sort")}
            </button>
          </motion.div>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-teal-600" />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          >
            {packages.map((paket, index) => (
              <motion.div key={paket.id || index} variants={itemVariants}>
                <CardLayanan
                  image={
                    paket.image
                      ? paket.image.startsWith("http")
                        ? paket.image
                        : `${baseUrl}/uploads/${paket.image}`
                      : "https://placehold.co/600x400?text=No+Image"
                  }
                  title={getLocalized(paket.title)}
                  speed={paket.speed}
                  price={paket.price}
                  originalPrice={paket.original_price}
                  discount={getLocalized(paket.discount)}
                  discountNote={getLocalized(paket.discount_note)}
                  isHighlighted={paket.is_highlighted}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Export both components
export default Layanan;
