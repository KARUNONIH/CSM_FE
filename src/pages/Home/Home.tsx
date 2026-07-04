import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { homeApi } from '../../api/homeApi';
import type { HomeData } from '../../api/homeApi';
import Loader from '../../components/common/Loader';

const Home = () => {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVideoFinished, setIsVideoFinished] = useState(false);

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [activeArticleTab, setActiveArticleTab] = useState<'news' | 'release'>('news');

  const clientScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await homeApi.getHomeData();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch home data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const scrollContainer = clientScrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 1;
    let animationId: number;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollSpeed;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [data?.clients]);

  const nextProject = () => {
    if (!data?.featured_projects) return;
    setCurrentProjectIndex((prev) => (prev === data.featured_projects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    if (!data?.featured_projects) return;
    setCurrentProjectIndex((prev) => (prev === 0 ? data.featured_projects.length - 1 : prev - 1));
  };

  if (loading) return <Loader />;
  if (!data) return null;

  const currentProject = data.featured_projects[currentProjectIndex];
  const activeArticles = activeArticleTab === 'news' ? data.articles.latest_news : data.articles.news_release;

  const duplicatedClients = data.clients ? [...data.clients, ...data.clients] : [];

  const thumbnails = [
    "/images/services/service1.png",
    "/images/services/service2.png",
    "/images/services/service3.png",
  ];

  return (
    <div className="w-full font-jakarta">
      <section className="relative w-full aspect-video lg:aspect-auto lg:h-[100vh] lg:min-h-[500px] overflow-hidden bg-black flex items-center">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/bg-hero-home.png"
            alt="Hero background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/20"></div>
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-black/30"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center text-center">
          <div className="max-w-[1100px] text-white space-y-1.5 sm:space-y-4 md:space-y-6 pt-10 sm:pt-14 md:pt-20 flex flex-col items-center">
            <h1
              className="text-lg sm:text-3xl md:text-6xl font-bold leading-tight animate-fade-in-up"
              style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}
            >
              Professional K3 Inspection, Certification & Calibration Services
            </h1>
            <p
              className="text-[10px] sm:text-sm md:text-xl text-gray-200 font-light max-w-4xl leading-relaxed animate-fade-in-up delay-100"
              style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}
            >
              PT. Cipta Selamat Mandiri provides professional inspection, testing,
                  certification, calibration, and occupational safety (K3) training
                  services to help industries meet regulations while ensuring safe,
                  reliable, and compliant operations.
            </p>
            <div className="pt-1 sm:pt-2 md:pt-4 animate-fade-in-up delay-200">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 sm:px-6 sm:py-2  md:px-8 md:py-3 rounded-full border border-white text-black bg-white hover:bg-white/70 hover:text-white transition-all duration-300 font-medium text-[10px] sm:text-sm md:text-base"
                // style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
              >
                See More <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {currentProject && (
        <section className="bg-[#fcfbf9] py-16 relative">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="w-full lg:w-3/5 relative">
                <button
                  onClick={prevProject}
                  aria-label="Previous Project"
                  className="absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white border border-[#5a1e1b] text-[#5a1e1b] hover:bg-[#5a1e1b] hover:text-white transition-all shadow-lg"
                >
                  <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                </button>

                <div className="relative h-50 md:h-75 lg:h-112.5 rounded-2xl overflow-hidden shadow-xl">
                  <img src={currentProject.thumbnail || '/images/placeholder-project.jpg'} alt={currentProject.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>

                <button
                  onClick={nextProject}
                  aria-label="Next Project"
                  className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white border border-[#5a1e1b] text-[#5a1e1b] hover:bg-[#5a1e1b] hover:text-white transition-all shadow-lg"
                >
                  <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                </button>

                <div className="flex justify-center gap-2 mt-6">
                  {data.featured_projects.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentProjectIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === currentProjectIndex ? 'w-8 bg-[#5a1e1b]' : 'w-2 bg-gray-300'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-2/5 space-y-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#5a1e1b] leading-tight">{currentProject.title}</h2>
                <h3 className="text-xl font-semibold text-[#8a2f2b]">{currentProject.subtitle || 'Featured Project'}</h3>

                <div
                  className="text-gray-600 leading-relaxed line-clamp-4"
                  dangerouslySetInnerHTML={{
                    __html: currentProject.description || '',
                  }}
                />

                <div className="pt-2">
                  <Link to={`/projects/${currentProject.slug}`} className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#5a1e1b] text-[#5a1e1b] hover:bg-[#5a1e1b] hover:text-white transition-all duration-300">
                    See More <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-4">
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-[#5a1e1b] mb-1">Articles</h2>
              <p className="text-gray-500 text-sm md:text-base">Find out what Cipta Selamat Mandiri is up to.</p>
            </div>

            <div className="flex bg-[#fcf9f6] p-1 rounded-full border border-gray-200">
              <button
                onClick={() => setActiveArticleTab('news')}
                className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeArticleTab === 'news' ? 'bg-[#8a2f2b] text-white shadow-md' : 'text-gray-500 hover:text-[#5a1e1b]'}`}
              >
                Latest News
              </button>
              <button
                onClick={() => setActiveArticleTab('release')}
                className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeArticleTab === 'release' ? 'bg-[#8a2f2b] text-white shadow-md' : 'text-gray-500 hover:text-[#5a1e1b]'}`}
              >
                News Release
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {activeArticles.length > 0 ? (
              activeArticles.map((article) => (
                <div key={article.id} className="group flex flex-col md:flex-row gap-4 md:items-center py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-lg px-3 -mx-3">
                  <div className="w-full md:w-1/4 text-gray-500 font-medium text-xs md:text-sm">{article.published_at || 'Date unavailable'}</div>
                  <div className="w-full md:w-3/4 flex items-start gap-3">
                    <span className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wide ${article.type === 'news' ? 'bg-[#0e3b28]' : 'bg-[#5a1e1b]'}`}>
                      {article.type === 'news' ? 'News Update' : 'Press Release'}
                    </span>
                    <Link to={`/articles/${article.slug}`} className="block group-hover:translate-x-1 transition-transform duration-300">
                      <h4 className="text-base md:text-lg font-bold text-gray-800 group-hover:text-[#5a1e1b] transition-colors mb-0.5">{article.title}</h4>
                      <p className="text-gray-500 text-xs md:text-sm line-clamp-1">{article.excerpt}</p>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-8">No articles found in this category.</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img src="/images/bg-hero-servicelist.png" alt="Services Background" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-[#0e3b28]/90 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-300 text-lg border-t border-white/20 pt-4 inline-block">These categories introduce what Cipta Selamat Mandiri is focusing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {data.services.map((service, index) => {
    return (
      <div
        key={service.id}
        className="relative group overflow-hidden rounded-xl bg-gray-800 border border-white/10 aspect-video md:aspect-square lg:aspect-4/3"
      >
        <img
          src={thumbnails[index] || "/images/placeholder-service.jpg"}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-5 md:p-8">
          <span className="inline-block px-3 py-1 bg-[#8a2f2b] text-white text-xs font-bold uppercase tracking-wider mb-2 rounded-sm">
            {service.name}
          </span>

          <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 line-clamp-1">
            {service.description?.slice(0, 50) || service.name}
          </h3>

          {/* <Link
            to={`/services/${service.slug}`}
            className="text-sm font-medium text-gray-300 group-hover:text-white flex items-center gap-1 mt-2"
          >
            Learn more <ArrowRight size={14} />
          </Link> */}
        </div>
      </div>
    );
  })}
</div>

          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white text-white hover:bg-white hover:text-[#0e3b28] transition-all duration-300">
              See All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#fcfbf9] overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 text-center md:text-left mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold text-[#5a1e1b] mb-4">Our Clients</h2>
              <div className="w-24 h-1 bg-[#5a1e1b] mb-6 mx-auto md:mx-0"></div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Why Choose PT. Cipta Selamat Mandiri</h3>
              <p className="text-gray-600">Lokasi strategis dan mudah untuk akses ke customer, tenaga ahli, inspektor, dan trainer berkualitas, bersertifikasi serta pengalaman yang luas, pendidikan dan pelatihan yang terintegritas, menggunakan sistem berbasis penempatan, jaringan / network yang luas.</p>
            </div>
            <div className="hidden md:block">
              <Link
                to="/clients"
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:border-[#5a1e1b] hover:text-[#5a1e1b] bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                See More <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden py-4" ref={clientScrollRef}>
          <div className="flex items-center gap-16 md:gap-24 animate-marquee whitespace-nowrap px-4">
            {duplicatedClients.map((client, index) => (
              <div key={`${client.id}-${index}`} className="flex flex-col items-center justify-center min-w-30 md:min-w-40 opacity-100 transition-opacity duration-300">
                <img src={client.logo || '/images/placeholder-logo.png'} alt={client.name} className="h-16 md:h-24 w-auto object-contain mb-3" title={client.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link to="/clients" className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-gray-300 text-gray-600 hover:border-[#5a1e1b] hover:text-[#5a1e1b] bg-white shadow-sm hover:shadow-md transition-all duration-300">
            See More <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
