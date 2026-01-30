import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { useLanguage } from "../../contexts/LanguageContext";
import { motion } from "framer-motion";
import SEO from "../../components/common/SEO";

const Contact = () => {
  const { t } = useLanguage();
  const locations = [
    {
      title: t("contactPage.cirebon"),
      address: "Cirebon, Jawa Barat",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4029.547165153878!2d108.53147301065437!3d-6.711856965594202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ee3e4e75ced87%3A0x6142621b1d33070c!2sPT%20PANGKALAN%20LINTAS%20DATA!5e1!3m2!1sid!2sid!4v1751990746619!5m2!1sid!2sid",
    },
    {
      title: t("contactPage.pangkalan"),
      address: "Pangkalan, Jawa Barat",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2133.493260608839!2d108.2027215728242!3d-6.397535916509396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6eb787f4470f03%3A0x7e4132ff2972085f!2sPT%20PANGKALAN%20LINTAS%20DATA!5e1!3m2!1sid!2sid!4v1736317294826!5m2!1sid!2sid",
    },
    {
      title: t("contactPage.bongas"),
      address: "Bongas, Indramayu, Jawa Barat",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3588.220571624084!2d107.98615524655759!3d-6.379437554544363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e694b0060d0a685%3A0xde505fe917fa2f89!2sPalindonet%20(%20POP%20Bongas)!5e1!3m2!1sid!2sid!4v1736320886723!5m2!1sid!2sid",
    },
    {
      title: t("contactPage.sanca"),
      address: "Sanca & Gantar, Indramayu, Jawa Barat",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224.16087162057386!2d107.94419244724695!3d-6.610441369152945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e692f00666fc515%3A0x32fcfd9a752d2180!2sNyi%20poci!5e1!3m2!1sid!2sid!4v1736321992440!5m2!1sid!2sid",
    },
  ];

  const socialMedia = [
    {
      icon: <FaFacebook className="w-6 h-6" />,
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100088483659670",
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: <FaInstagram className="w-6 h-6" />,
      name: "Instagram",
      href: "https://www.instagram.com/palindonet",
      color: "text-pink-600 bg-pink-50",
    },
    {
      icon: <FaWhatsapp className="w-6 h-6" />,
      name: "WhatsApp",
      href: "https://wa.me/6282117777187",
      color: "text-green-500 bg-green-50",
    },
    {
      icon: <FaLinkedin className="w-6 h-6" />,
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/pt-pangkalan-lintas-data-palindo/",
      color: "text-blue-700 bg-blue-50",
    },
    {
      icon: <FaYoutube className="w-6 h-6" />,
      name: "YouTube",
      href: "https://www.youtube.com/@PangkalanLintasData",
      color: "text-red-600 bg-red-50",
    },
  ];

  const [selectedLocation, setSelectedLocation] = useState(0);

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title={`${t("contactPage.title")} | Palindo`}
        description={t("contactPage.subtitle")}
        url={window.location.href}
      />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section 1: Contact Info & Social Media */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t("contactPage.title")}
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              {t("contactPage.subtitle")}
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 p-2 rounded-lg text-teal-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {t("contactPage.phone")}
                  </p>
                  <p className="font-medium text-gray-900">+62 821-1777-7187</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 p-2 rounded-lg text-teal-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {t("contactPage.email")}
                  </p>
                  <p className="font-medium text-gray-900">info@palindo.id</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Social Media */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {t("contactPage.followUs")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-transform hover:scale-101 ${social.color}`}
                >
                  <div className="mb-2">{social.icon}</div>
                  <span className="font-medium text-sm text-gray-900">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Section 2: Locations & Map */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Locations List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t("contactPage.locationTitle")}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {t("contactPage.locationSubtitle")}
              </p>

              <div className="space-y-4">
                {locations.map((loc, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedLocation(index)}
                    className={`flex items-start gap-4 p-4 rounded-xl transition-all cursor-pointer border ${
                      selectedLocation === index
                        ? "bg-teal-50 border-teal-200 shadow-sm"
                        : "bg-gray-50 border-gray-100 hover:bg-gray-100"
                    }`}
                  >
                    <div className="bg-white p-3 rounded-full shadow-sm text-teal-600 shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {loc.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{loc.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-100 rounded-3xl overflow-hidden shadow-lg h-[600px] lg:h-[600px] relative border border-gray-200 sticky top-24"
          >
            <iframe
              src={locations[selectedLocation].mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map Location"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
