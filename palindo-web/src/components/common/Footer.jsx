import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import assets from "../../assets/assets";
import { useLanguage } from "../../contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const footerLinks = {
    bisnis: [
      { label: t("footer.whyUs"), href: "/about-us" },
      { label: t("footer.services"), href: "/internet" },
      { label: t("footer.iot"), href: "/it-solution" },
      { label: t("footer.support"), href: "/palindo-business" },
      { label: t("footer.update"), href: "/blog" },
      { label: t("footer.partner"), href: "/contact" },
    ],
    perusahaan: [
      { label: t("footer.ourCompany"), href: "/about-us" },
      { label: t("footer.media"), href: "https://www.instagram.com/palindonet" },
      { label: t("footer.csr"), href: "/activity" },
      { label: t("footer.career"), href: "/career", badge: t("footer.hiring") },
    ],
    care: [
      { label: t("footer.privacy"), href: "/privacy-policy" },
      { label: t("footer.coverage"), href: "/palindo-home" },
    ],
  };

  const contactInfo = [
    {
      icon: <Phone className="w-4 h-4" />,
      text: "+62 821-1777-7187",
      href: "tel:+62 82117777187",
    },
    {
      icon: <Mail className="w-4 h-4" />,
      text: "info@palindo.co.id",
      href: "mailto:info@palindo.co.id",
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      text: "Cirebon, Jawa Barat",
      href: "#",
    },
  ];

  const socialMedia = [
    {
      icon: <FaFacebook className="w-5 h-5" />,
      href: "https://www.facebook.com/profile.php?id=100088483659670",
      name: "Facebook",
      color: "hover:bg-blue-600",
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      href: "https://www.instagram.com/palindonet",
      name: "Instagram",
      color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600",
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/company/pt-pangkalan-lintas-data-palindo/",
      name: "LinkedIn",
      color: "hover:bg-blue-700",
    },
    {
      icon: <FaYoutube className="w-5 h-5" />,
      href: "https://www.youtube.com/@PangkalanLintasData",
      name: "YouTube",
      color: "hover:bg-red-600",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Section - Brand & Subscribe */}
          <div className="lg:col-span-4 space-y-8">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={assets.logo}
                  alt="Palindo Logo"
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t("footer.description")}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white mb-4">
                {t("footer.contact")}
              </h4>
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center gap-3 text-gray-400 hover:text-teal-400 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-teal-500 transition-colors">
                    {contact.icon}
                  </div>
                  <span className="text-sm">{contact.text}</span>
                </a>
              ))}
            </div>

            {/* Newsletter */}
            {/* <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h4 className="font-semibold text-white mb-3">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">
                Dapatkan update promo & berita terbaru!
              </p>
              <div className="relative flex items-center bg-gray-700/50 rounded-full overflow-hidden border border-gray-600 focus-within:border-teal-500 transition-colors">
                <Mail className="absolute left-4 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 pl-11 pr-3 py-3 text-sm bg-transparent text-white placeholder-gray-400 focus:outline-none"
                />
                <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold px-6 py-3 rounded-full transition-all m-0.5">
                  Subscribe
                </button>
              </div>
            </div> */}
          </div>

          {/* Middle Section - Links */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Bisnis Column */}
              <div>
                <h3 className="text-lg font-bold mb-6 text-white relative inline-block">
                  {t("footer.business")}
                  <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-teal-500 to-transparent rounded-full"></span>
                </h3>
                <ul className="space-y-3">
                  {footerLinks.bisnis.map((link, index) => (
                    <li key={index}>
                      {link.href.startsWith("/") ? (
                        <Link
                          to={link.href}
                          className="text-gray-400 hover:text-teal-400 transition-colors text-sm flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-teal-400 transition-colors"></span>
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-teal-400 transition-colors text-sm flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-teal-400 transition-colors"></span>
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Perusahaan Column */}
              <div>
                <h3 className="text-lg font-bold mb-6 text-white relative inline-block">
                  {t("footer.company")}
                  <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-teal-500 to-transparent rounded-full"></span>
                </h3>
                <ul className="space-y-3">
                  {footerLinks.perusahaan.map((link, index) => (
                    <li key={index}>
                      {link.href.startsWith("/") ? (
                        <Link
                          to={link.href}
                          className="text-gray-400 hover:text-teal-400 transition-colors text-sm inline-flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-teal-400 transition-colors"></span>
                          {link.label}
                          {link.badge && (
                            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-1.5 py-0.5 rounded-full animate-pulse">
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-teal-400 transition-colors text-sm inline-flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-teal-400 transition-colors"></span>
                          {link.label}
                          {link.badge && (
                            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-1.5 py-0.5 rounded-full animate-pulse">
                              {link.badge}
                            </span>
                          )}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Care Column */}
              <div>
                <h3 className="text-lg font-bold mb-6 text-white relative inline-block">
                  {t("footer.care")}
                  <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-teal-500 to-transparent rounded-full"></span>
                </h3>
                <ul className="space-y-3">
                  {footerLinks.care.map((link, index) => (
                    <li key={index}>
                      {link.href.startsWith("/") ? (
                        <Link
                          to={link.href}
                          className="text-gray-400 hover:text-teal-400 transition-colors text-sm flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-teal-400 transition-colors"></span>
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-teal-400 transition-colors text-sm flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-teal-400 transition-colors"></span>
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Section - App Download */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 h-full">
              <h4 className="font-semibold text-white mb-4">
                {t("footer.download")}
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                {t("footer.downloadDesc")}
              </p>

              {/* App Icon */}
              <div className="rounded-full ">
                <img
                  src={assets.mypalindoIcon}
                  alt="myPalindo App Icon"
                  className="w-20 h-20 mb-4 rounded-lg"
                />
              </div>

              <p className="text-teal-400 text-xs font-semibold mb-4">
                #BanyakPromo
              </p>

              {/* Download Buttons */}
              <div className="space-y-2">
                {/* <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black hover:bg-gray-900 rounded-xl p-3 transition-colors group"
                >
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <img
                      src={assets.appleIcon}
                      alt="Apple Logo"
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">Download on the</p>
                    <p className="font-semibold text-sm text-white">
                      App Store
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a> */}

                <a
                  href="https://play.google.com/store/apps/details?id=id.palindo.app&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black hover:bg-gray-900 rounded-xl p-3 transition-colors group"
                >
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <img
                      src={assets.playstoreIcon}
                      alt="Google Logo"
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">GET IT ON</p>
                    <p className="font-semibold text-sm text-white">
                      Google Play
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2026 PT Pangkalan Lintas Data. {t("footer.rights")}
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">
                {t("footer.follow")}
              </span>
              <div className="flex gap-3">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`bg-gray-800 p-2.5 rounded-lg transition-all ${social.color} hover:scale-110 hover:shadow-lg`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
