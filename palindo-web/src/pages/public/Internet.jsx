import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Wifi,
  Zap,
  ShieldCheck,
  Headphones,
  ArrowRight,
  CheckCircle2,
  Building2,
  Home,
  MapPin,
  ChevronDown,
  ChevronUp,
  Globe,
  Rocket,
  Search,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import SEO from "../../components/common/SEO";

const Internet = () => {
  const { t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const featureIcons = [
    <Rocket className="w-8 h-8 text-teal-600" />,
    <Globe className="w-8 h-8 text-teal-600" />,
    <ShieldCheck className="w-8 h-8 text-teal-600" />,
    <Headphones className="w-8 h-8 text-teal-600" />,

  ];

  const featuresData = t("internetPage.whyUs.features") || [];
  const features = featuresData.map((f, i) => ({
    ...f,
    icon: featureIcons[i],
  }));

  const serviceIcons = [
    <Home className="w-12 h-12 text-white" />,
    <Building2 className="w-12 h-12 text-white" />,
  ];

  const serviceImages = [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  ];

  const serviceLinks = ["/palindo-home", "/palindo-business"];
  const serviceColors = [
    "bg-gradient-to-br from-teal-500 to-emerald-500",
    "bg-gradient-to-br from-blue-600 to-indigo-700",
  ];

  const servicesData = t("internetPage.services.items") || [];
  const services = servicesData.map((s, i) => ({
    ...s,
    icon: serviceIcons[i],
    image: serviceImages[i],
    link: serviceLinks[i],
    color: serviceColors[i],
  }));

  const faqs = t("internetPage.faq.items") || [];

  // Fallback if translation returns undefined (e.g. during initial load or missing key)
  if (
    !featuresData.length ||
    !servicesData.length ||
    !faqs.length
  ) {
    // You might want to return a loader here or just render nothing until loaded
    // For now, we proceed, assuming context provides default or empty arrays
  }

  const serviceLinkText = t("internetPage.services.linkText");

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${t("internetPage.hero.title").replace("\n", " ")} ${t("internetPage.hero.titleHighlight")} | Palindo`}
        description={t("internetPage.hero.subtitle")}
        url={window.location.href}
      />
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Internet Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 text-teal-300">
              <Globe className="w-4 h-4" />
              <span>{t("internetPage.hero.badge")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight whitespace-pre-line">
              {t("internetPage.hero.title")} <br />
              <span className="text-teal-400">
                {t("internetPage.hero.titleHighlight")}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
              {t("internetPage.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/palindo-home"
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-teal-500/30"
              >
                {t("internetPage.hero.btnHome")}
              </Link>
              <Link
                to="/palindo-business"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold py-3 px-8 rounded-full transition-all"
              >
                {t("internetPage.hero.btnBusiness")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("internetPage.whyUs.title")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("internetPage.whyUs.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
              >
                <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm text-teal-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Selection */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("internetPage.services.title")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("internetPage.services.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 ${service.color} opacity-90 mix-blend-multiply`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>

                <div className="relative p-8 md:p-12 h-full flex flex-col justify-between min-h-[400px]">
                  <div>
                    <div className="bg-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                      {service.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-white/90 text-lg mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 text-white/90"
                        >
                          <CheckCircle2 className="w-5 h-5 text-teal-300 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-2 text-white font-bold text-lg group-hover:gap-4 transition-all"
                  >
                    {serviceLinkText} <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Coverage Check Section */}
      <div className="py-24 bg-gradient-to-r from-teal-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t("internetPage.coverage.title")}
          </h2>
          <p className="text-teal-100 text-lg mb-8">
            {t("internetPage.coverage.subtitle")}
          </p>

          <div className="bg-white p-2 rounded-full shadow-2xl flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
            <div className="flex-1 flex items-center px-6 py-3 sm:py-0">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder={t("internetPage.coverage.placeholder")}
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full font-bold transition-colors flex items-center gap-2">
              <Search className="w-4 h-4" /> {t("internetPage.coverage.button")}
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("internetPage.faq.title")}
            </h2>
            <p className="text-gray-600">{t("internetPage.faq.subtitle")}</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openFaqIndex === index
                    ? "bg-teal-50 border-teal-200"
                    : "bg-white border-gray-100 hover:border-teal-100"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-teal-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <div
                  className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaqIndex === index
                      ? "max-h-40 pb-6 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
              {t("internetPage.cta.title")}
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto relative z-10">
              {t("internetPage.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link
                to="/contact"
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg shadow-teal-500/30"
              >
                {t("internetPage.cta.btnSales")}
              </Link>
              <a
                href="https://wa.me/6282117777187"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors"
              >
                {t("internetPage.cta.btnChat")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Internet;
