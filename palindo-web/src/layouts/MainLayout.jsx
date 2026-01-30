import React from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollToTopButton from "../components/common/ScrollToTopButton";
import WhatsAppButton from "../components/common/WhatsAppButton";
import assets from "../assets/assets";

const MainLayout = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div className="flex flex-col min-h-screen">
        {/* Preload Logo untuk LCP Optimization */}
        <link
          rel="preload"
          as="image"
          href={assets.logo}
          fetchPriority="high"
        />
        {/* Transition Overlay */}
        <motion.div
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
          initial={{ x: "0%" }}
          animate={{
            x: "100%",
            transitionEnd: { x: "-100%" },
            transition: { duration: 0.6, delay: 0.8, ease: "easeInOut" },
          }}
          exit={{
            x: "0%",
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
        >
          <motion.img
            src={assets.logo}
            fetchPriority="high"
            width="150"
            height="48"
            alt="Loading..."
            className="h-12 md:h-20 w-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="flex flex-col min-h-screen"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.5, delay: 1.0, ease: "easeInOut" },
          }}
        >
          <Navbar />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
          <WhatsAppButton />
          <ScrollToTopButton />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MainLayout;
