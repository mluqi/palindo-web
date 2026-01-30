"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Articles",
      [
        {
          title: JSON.stringify({
            id: "5 Keunggulan Internet Fiber Optik Dibandingkan Kabel Biasa",
            en: "5 Advantages of Fiber Optic Internet Over Regular Cable",
            cn: "光纤互联网相比普通电缆的 5 大优势",
          }),
          slug: "5-keunggulan-internet-fiber-optik",
          content: JSON.stringify({
            id: "<p>Di era digital ini, kecepatan internet adalah segalanya. Fiber optik menawarkan transmisi data menggunakan cahaya, yang berarti kecepatan yang jauh lebih tinggi dan latensi yang lebih rendah dibandingkan kabel tembaga tradisional. Selain itu, fiber optik lebih tahan terhadap gangguan cuaca dan interferensi elektromagnetik.</p><p>Bagi Anda yang bekerja dari rumah atau gemar streaming video 4K, beralih ke fiber optik adalah investasi terbaik untuk kenyamanan digital Anda.</p>",
            en: "<p>In this digital age, internet speed is everything. Fiber optics offer data transmission using light, which means significantly higher speeds and lower latency compared to traditional copper cables. Additionally, fiber optics are more resistant to weather disruptions and electromagnetic interference.</p><p>For those working from home or enjoying 4K video streaming, switching to fiber optics is the best investment for your digital comfort.</p>",
            cn: "<p>在这个数字时代，互联网速度就是一切。光纤使用光传输数据，这意味着与传统铜缆相比，速度明显更快，延迟更低。此外，光纤更能抵抗天气干扰和电磁干扰。</p><p>对于在家工作或喜欢 4K 视频流的人来说，切换到光纤是您数字舒适度的最佳投资。</p>",
          }),
          excerpt: JSON.stringify({
            id: "Pelajari mengapa teknologi fiber optik menjadi standar baru untuk koneksi internet cepat dan stabil di rumah maupun kantor.",
            en: "Learn why fiber optic technology is the new standard for fast and stable internet connections at home and in the office.",
            cn: "了解为什么光纤技术是家庭和办公室快速稳定互联网连接的新标准。",
          }),
          image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          author: "Admin Palindo",
          category: "Technology",
          tags: JSON.stringify(["Fiber Optic", "Internet", "Technology"]),
          read_time: "5 min read",
          is_featured: true,
          is_published: true,
          published_at: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: JSON.stringify({
            id: "Tips Mengamankan Jaringan WiFi Rumah dari Peretas",
            en: "Tips to Secure Your Home WiFi Network from Hackers",
            cn: "保护您的家庭 WiFi 网络免受黑客攻击的提示",
          }),
          slug: "tips-mengamankan-jaringan-wifi",
          content: JSON.stringify({
            id: "<p>Keamanan jaringan rumah seringkali diabaikan. Langkah pertama yang paling mudah adalah mengganti password default router Anda. Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol.</p><p>Selain itu, pastikan enkripsi WPA2 atau WPA3 aktif. Jangan lupa untuk secara rutin memperbarui firmware router Anda untuk menambal celah keamanan terbaru.</p>",
            en: "<p>Home network security is often overlooked. The easiest first step is to change your router's default password. Use a combination of uppercase letters, lowercase letters, numbers, and symbols.</p><p>Also, ensure WPA2 or WPA3 encryption is active. Don't forget to regularly update your router's firmware to patch the latest security vulnerabilities.</p>",
            cn: "<p>家庭网络安全经常被忽视。最简单的第一步是更改路由器的默认密码。使用大写字母、小写字母、数字和符号的组合。</p><p>此外，确保 WPA2 或 WPA3 加密处于活动状态。不要忘记定期更新路由器的固件以修补最新的安全漏洞。</p>",
          }),
          excerpt: JSON.stringify({
            id: "Jangan biarkan orang asing menggunakan internet Anda. Ikuti panduan sederhana ini untuk meningkatkan keamanan WiFi rumah.",
            en: "Don't let strangers use your internet. Follow this simple guide to improve your home WiFi security.",
            cn: "不要让陌生人使用您的互联网。按照这个简单的指南来提高您的家庭 WiFi 安全性。",
          }),
          image:
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          author: "Security Team",
          category: "Tips & Tricks",
          tags: JSON.stringify(["Security", "WiFi", "Tips"]),
          read_time: "4 min read",
          is_featured: false,
          is_published: true,
          published_at: new Date(new Date().setDate(new Date().getDate() - 2)),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: JSON.stringify({
            id: "Transformasi Digital: Mengapa Bisnis Perlu Internet Dedicated?",
            en: "Digital Transformation: Why Businesses Need Dedicated Internet?",
            cn: "数字化转型：为什么企业需要专用互联网？",
          }),
          slug: "mengapa-bisnis-perlu-internet-dedicated",
          content: JSON.stringify({
            id: "<p>Koneksi internet broadband biasa mungkin cukup untuk rumahan, namun bisnis membutuhkan lebih. Internet Dedicated menawarkan rasio bandwidth 1:1, yang berarti kecepatan upload dan download simetris.</p><p>Ini sangat krusial untuk kegiatan seperti video conference, transfer file besar, dan akses server cloud tanpa hambatan. Jaminan SLA (Service Level Agreement) juga memastikan bisnis Anda tetap online.</p>",
            en: "<p>Regular broadband internet connections might be enough for homes, but businesses need more. Dedicated Internet offers a 1:1 bandwidth ratio, meaning symmetrical upload and download speeds.</p><p>This is crucial for activities like video conferencing, large file transfers, and seamless cloud server access. SLA (Service Level Agreement) guarantees also ensure your business stays online.</p>",
            cn: "<p>普通的宽带互联网连接对于家庭来说可能足够了，但企业需要更多。专用互联网提供 1:1 的带宽比率，这意味着对称的上传和下载速度。</p><p>这对于视频会议、大文件传输和无缝云服务器访问等活动至关重要。SLA（服务级别协议）保证也确保您的业务保持在线。</p>",
          }),
          excerpt: JSON.stringify({
            id: "Pahami perbedaan antara internet broadband dan dedicated, serta manfaatnya untuk produktivitas perusahaan Anda.",
            en: "Understand the difference between broadband and dedicated internet, and its benefits for your company's productivity.",
            cn: "了解宽带和专用互联网之间的区别，以及它对您公司生产力的好处。",
          }),
          image:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          author: "Palindo Business",
          category: "Business",
          tags: JSON.stringify([
            "Business",
            "Dedicated Internet",
            "Productivity",
          ]),
          read_time: "6 min read",
          is_featured: false,
          is_published: true,
          published_at: new Date(new Date().setDate(new Date().getDate() - 5)),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: JSON.stringify({
            id: "Mengenal Internet of Things (IoT) dan Masa Depan Smart Home",
            en: "Understanding Internet of Things (IoT) and the Future of Smart Homes",
            cn: "了解物联网 (IoT) 和智能家居的未来",
          }),
          slug: "mengenal-iot-dan-smart-home",
          content: JSON.stringify({
            id: "<p>Bayangkan kulkas yang bisa memesan susu sendiri saat habis, atau lampu yang menyala otomatis saat Anda memasuki ruangan. Itulah janji dari Internet of Things (IoT).</p><p>Dengan koneksi internet yang semakin cepat dan stabil, perangkat pintar kini dapat saling terhubung untuk membuat hidup lebih efisien. Palindo mendukung ekosistem ini dengan menyediakan infrastruktur jaringan yang handal.</p>",
            en: "<p>Imagine a fridge that orders milk when it runs out, or lights that turn on automatically when you enter a room. That is the promise of the Internet of Things (IoT).</p><p>With increasingly fast and stable internet connections, smart devices can now connect with each other to make life more efficient. Palindo supports this ecosystem by providing reliable network infrastructure.</p>",
            cn: "<p>想象一下，冰箱会在牛奶用完时自动订购，或者灯会在您进入房间时自动打开。这就是物联网 (IoT) 的承诺。</p><p>随着互联网连接越来越快、越来越稳定，智能设备现在可以相互连接，让生活更高效。Palindo 通过提供可靠的网络基础设施来支持这个生态系统。</p>",
          }),
          excerpt: JSON.stringify({
            id: "Bagaimana perangkat pintar yang saling terhubung akan mengubah cara kita hidup di masa depan?",
            en: "How will interconnected smart devices change the way we live in the future?",
            cn: "互联智能设备将如何改变我们未来的生活方式？",
          }),
          image:
            "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          author: "Tech Editor",
          category: "Lifestyle",
          tags: JSON.stringify(["IoT", "Smart Home", "Future"]),
          read_time: "4 min read",
          is_featured: false,
          is_published: true,
          published_at: new Date(new Date().setDate(new Date().getDate() - 10)),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: JSON.stringify({
            id: "Cara Memilih Paket Internet yang Tepat untuk Keluarga",
            en: "How to Choose the Right Internet Package for Your Family",
            cn: "如何为您的家庭选择合适的互联网套餐",
          }),
          slug: "cara-memilih-paket-internet-keluarga",
          content: JSON.stringify({
            id: "<p>Memilih paket internet bisa membingungkan. Pertama, hitung jumlah perangkat yang akan terhubung. Untuk keluarga kecil dengan 3-5 perangkat, kecepatan 30 Mbps mungkin cukup.</p><p>Namun, jika Anda sering streaming 4K atau bermain game online, pertimbangkan paket 50 Mbps ke atas. Palindo menawarkan berbagai opsi paket yang fleksibel sesuai kebutuhan Anda.</p>",
            en: "<p>Choosing an internet package can be confusing. First, count the number of devices that will be connected. For a small family with 3-5 devices, 30 Mbps might be enough.</p><p>However, if you frequently stream 4K or play online games, consider packages of 50 Mbps and above. Palindo offers various flexible package options to suit your needs.</p>",
            cn: "<p>选择互联网套餐可能会令人困惑。首先，计算将连接的设备数量。对于拥有 3-5 台设备的小家庭，30 Mbps 可能就足够了。</p><p>但是，如果您经常流式传输 4K 或玩在线游戏，请考虑 50 Mbps 及以上的套餐。Palindo 提供各种灵活的套餐选项以满足您的需求。</p>",
          }),
          excerpt: JSON.stringify({
            id: "Panduan praktis menentukan kecepatan dan bandwidth yang sesuai agar tidak salah pilih paket internet.",
            en: "Practical guide to determining the appropriate speed and bandwidth so you don't choose the wrong internet package.",
            cn: "确定合适速度和带宽的实用指南，以免选错互联网套餐。",
          }),
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          author: "Admin Palindo",
          category: "Tips & Tricks",
          tags: JSON.stringify(["Internet", "Family", "Guide"]),
          read_time: "3 min read",
          is_featured: false,
          is_published: true,
          published_at: new Date(new Date().setDate(new Date().getDate() - 15)),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Articles", null, {});
  },
};
