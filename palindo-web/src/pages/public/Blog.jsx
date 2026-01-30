import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import BlogCard from "../../components/common/BlogCard";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { useSearchParams } from "react-router-dom";
import api from "../../services/api";
import SEO from "../../components/common/SEO";

const Blog = () => {
  const { t } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10) || 1;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await api.get("/blog/published", {
          params: { page, limit: 7 }, // Fetch enough for featured + grid
        });
        setArticles(response.data.articles);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page]);

  // Helper to format article data for BlogCard
  const formatArticle = (article) => ({
    ...article,
    date: new Date(article.published_at).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    readTime: article.read_time,
  });

  // Determine Featured Post (First featured article or first article)
  const featuredArticle = articles.find((a) => a.is_featured) || articles[0];

  // Filter out the featured article from the list for the grid
  const gridArticles = articles
    .filter((a) => a.id !== featuredArticle?.id)
    .map(formatArticle);

  const formattedFeatured = featuredArticle
    ? formatArticle(featuredArticle)
    : null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, page - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);

      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${t("blogPage.headerTitle")} | Palindo`}
        description={t("blogPage.headerSubtitle")}
        image="https://images.unsplash.com/photo-1499750310159-5b600aaf0327?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
        url={window.location.href}
      />

      {/* Hero Section */}
      <div className="relative bg-teal-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1499750310159-5b600aaf0327?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Blog Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900 via-teal-900/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-teal-800/50 border border-teal-700/50 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 text-teal-100">
              <BookOpen className="w-4 h-4" />
              <span>Palindo Blog</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t("blogPage.headerTitle")}
            </h1>
            <p className="text-xl text-teal-100 leading-relaxed mb-8">
              {t("blogPage.headerSubtitle")}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-teal-600" />
          </div>
        ) : (
          <>
            {/* Featured Post Section */}
            {formattedFeatured && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-20"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-8 w-1 bg-teal-500 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {t("blogPage.recentPost")}
                  </h2>
                </div>

                <BlogCard {...formattedFeatured} featured={true} />
              </motion.div>
            )}

            {/* Articles Grid Section */}
            {gridArticles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-8 w-1 bg-orange-500 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {t("blogPage.weeklyMostRead")}
                  </h2>
                  <TrendingUp className="w-6 h-6 text-orange-500 ml-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {gridArticles.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <BlogCard {...post} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center items-center gap-2 mt-16"
        >
          <button
            disabled={page === 1}
            onClick={() => setSearchParams({ page: Math.max(1, page - 1) })}
            className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-gray-600 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setSearchParams({ page: pageNum })}
                className={`w-10 h-10 rounded-full font-semibold transition-all cursor-pointer ${
                  page === pageNum
                    ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            disabled={page === totalPages}
            onClick={() =>
              setSearchParams({ page: Math.min(totalPages, page + 1) })
            }
            className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-gray-600 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
