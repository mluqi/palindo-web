import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Rocket,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import SEO from "../../../components/common/SEO";

const PalindoBusiness = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Palindo Business | Solusi Internet Bisnis"
        description={t("palindoBusiness.hero.description")}
        url={window.location.href}
      />
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Business Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-blue-800/50 border border-blue-700/50 rounded-full px-4 py-1.5 mb-6">
              <Building2 className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-medium text-blue-100">
                {t("palindoBusiness.hero.badge")}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Palindo <span className="text-blue-400">Business</span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              {t("palindoBusiness.hero.description")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-blue-500/30"
              >
                {t("palindoBusiness.hero.cta")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t("palindoBusiness.content.title")}
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-6">{t("palindoBusiness.content.p1")}</p>
                <p>{t("palindoBusiness.content.p2")}</p>
              </div>

              <div className="mt-8 space-y-4">
                {[
                  t("palindoBusiness.features.stable"),
                  t("palindoBusiness.features.priority"),
                  t("palindoBusiness.features.support"),
                  t("palindoBusiness.features.ip"),
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                  alt="Office working environment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-900/10"></div>
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      {t("palindoBusiness.uptime")}
                    </p>
                    <p className="text-xl font-bold text-gray-900">99.5%</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PalindoBusiness;
