import { useEffect, useState } from "react";
import { HardHat } from "lucide-react";
import { serviceCategoryApi } from "../../api/serviceCategoryApi";
import type { ServiceCategory } from "../../api/serviceCategoryApi";
import ServiceCategoryCard from "../../components/cards/ServiceCategoryCard";
import Loader from "../../components/common/Loader";

const ServiceCategoryPage = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const thumbnails = [
    "/images/services/service1.png",
    "/images/services/service2.png",
    "/images/services/service3.png",
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await serviceCategoryApi.getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Gagal memuat data layanan.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-start text-center px-4 bg-[#0e3b28] text-white font-jakarta">
        <p className="text-red-400 font-semibold mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-brm-maroon text-white rounded-md hover:bg-[#5a1e1b] transition-colors"
        >
          Muat Ulang
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full font-jakarta bg-[#0e3b28]">
      <div className="relative h-[60vh] min-h-100 w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 bg-[url('/images/bg-atas-servicecategory.png')]"></div>

        <div className="absolute inset-0 bg-linear-to-t from-[#0e3b28] via-[#0e3b28]/70 to-[#0e3b28]/30 z-10"></div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 pt-16">
          <div className="relative mb-6 animate-fade-in-up">
            <HardHat
              size={64}
              className="text-white relative z-10"
              strokeWidth={1.5}
            />
            <div className="absolute -top-2 -right-4 text-white/30 animate-spin-slow">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg animate-fade-in-up delay-100">
            Our Services
          </h1>
          <p className="text-gray-200 text-base md:text-lg max-w-2xl font-light leading-relaxed drop-shadow-md animate-fade-in-up delay-200">
            These categories introduce what Cipta Selamat Mandiri is focusing
            on.
          </p>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 py-12 md:py-16">
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {categories.map((category, index) => (
  <ServiceCategoryCard
    key={category.id}
    category={category}
    thumbnail={thumbnails[index]}
  />
))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <p className="text-gray-300 text-lg">
              Belum ada kategori layanan yang tersedia saat ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCategoryPage;
