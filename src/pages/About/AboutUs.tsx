import {
  CheckCircle as CheckIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { certificateApi } from "../../api/certificateApi";
import type { CertificateItem } from "../../api/certificateApi";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const About = () => {
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [loadingCertificates, setLoadingCertificates] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
  };

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await certificateApi.getAllCertificates();
        setCertificates(data);
        if (data.length > 0) setActiveIndex(Math.floor(data.length / 2));
      } catch (error) {
        console.error("Failed to fetch certificates:", error);
      } finally {
        setLoadingCertificates(false);
      }
    };
    fetchCertificates();
  }, []);

  const getTranslateX = () => {
    const cardWidth = isMobile ? 280 : 320;
    const centerOffset = isMobile ? 140 : 160;
    return `translateX(calc(50% - ${
      activeIndex * cardWidth + centerOffset
    }px))`;
  };

  return (
    <main className="w-full font-jakarta">
      <section className="h-62.5 md:h-87.5 lg:h-87.5 bg-linear-to-l from-white to-brm-beige-2 flex items-center pt-16 md:pt-24 lg:pt-24 py-4">
        <img
          src="/images/logo-csm-2.png"
          alt="Logo CSM"
          className="h-32 md:h-40 lg:h-40 mx-auto object-contain"
        />
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="flex gap-6 items-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-linear-to-r from-[#772824] to-[#C92D29] bg-clip-text text-transparent whitespace-nowrap">
            Who We Are
          </h1>
          <div className="flex-1 h-[1.5px] bg-[#C92D29] mt-[-8px]"></div>
        </div>

        <p className="text-justify text-black leading-relaxed">
          PT. Cipta Selamat Mandiri adalah perusahaan kontraktor yang bergerak
          di bidang jasa konstruksi, berkomitmen untuk menghadirkan solusi
          pembangunan yang berkualitas, efisien, dan berkelanjutan. Dengan
          dukungan sumber daya manusia yang profesional serta pengalaman dalam
          menangani berbagai proyek konstruksi, kami hadir sebagai mitra
          terpercaya bagi klien.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            "Quality Driven",
            "Professional Team",
            "Safety First",
            "Sustainable Development",
          ].map((text, idx) => (
            <div
              key={idx}
              className="font-medium text-white rounded-full py-2 px-6 shadow-md bg-linear-to-r from-brm-green to-brm-green-2 hover:scale-[1.03] transition flex items-center justify-center"
            >
              <CheckIcon className="w-5 h-5 text-white mr-3 shrink-0" />
              <span className="whitespace-nowrap">{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-2 pb-12 md:pt-6 md:pb-24 flex flex-col lg:flex-row gap-16">
        <div className="lg:pl-40 py-4 md:py-16 px-6 max-w-2xl mx-auto gap-12 flex flex-col">
          <div>
            <div className="flex gap-6 items-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#772824] to-[#C92D29] bg-clip-text text-transparent whitespace-nowrap">
                Our Vision
              </h1>
              <div className="flex-1 h-[1.5px] bg-[#C92D29]"></div>
            </div>
            <p className="text-justify text-black leading-relaxed">
              Menjadi perusahaan yang terpercaya dan profesional dalam dunia K3 serta meningkatkan sumber daya manusia untuk kemajuan bersama.
            </p>
          </div>

          <div>
            <div className="flex gap-6 items-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#772824] to-[#C92D29] bg-clip-text text-transparent whitespace-nowrap">
                Our Mission
              </h1>
              <div className="flex-1 h-[1.5px] bg-[#C92D29]"></div>
            </div>

           <p className="text-justify text-black leading-relaxed">
  1. Memberikan service excellent dalam pelaksanaan pemeriksaan, pengujian,
  sertifikasi, training, dan konsultasi yang profesional serta mengacu pada
  peraturan yang berlaku. <br />
  2. Ikut serta dalam peningkatan mutu sumber daya manusia yang unggul. <br />
  3. Menciptakan lingkungan yang berdampak positif untuk kemajuan manusia.{" "}
  <br />
  4. Berupaya selalu melakukan inovasi yang berkelanjutan melalui proses
  sistem manajemen pemberdayaan.
</p>
          </div>
        </div>

        <div className="hidden lg:block relative h-auto w-full min-h-100">
          <img
            src="/images/about-img-1.png"
            alt="About Us Image"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-l from-white/0 to-white"></div>
        </div>
      </section>

      <section className="relative h-auto w-full bg-brm-green pt-16 pb-24 px-4 md:px-6 text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: `url('/images/about-img-2.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "overlay",
          }}
        ></div>

        <div className="relative z-10 mx-auto md:mx-36 max-w-7xl">
          <div className="flex flex-col gap-4 items-center mb-8 md:mb-12">
            <img
              src="/images/license-icon.png"
              alt="License Icon"
              className="w-20 h-20 md:w-24 md:h-24 object-contain"
            />
            <h1 className="text-2xl md:text-4xl font-bold">Our Certificates</h1>
          </div>

          {loadingCertificates ? (
            <div className="flex justify-center py-10">
              <p className="text-white/80 animate-pulse">
                Loading certificates...
              </p>
            </div>
          ) : certificates.length === 0 ? (
            <p className="text-center text-white/80">
              No certificates available
            </p>
          ) : (
            <div className="relative w-full">
              <div className="relative">
                <button
                  aria-label="Previous slide"
                  onClick={prevSlide}
                  className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/20 backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>

                <button
                  aria-label="Next slide"
                  onClick={nextSlide}
                  className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/20 backdrop-blur-sm"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>

                <div className="relative h-96 md:h-125 overflow-hidden">
                  <div
                    className="flex items-center transition-transform duration-500 ease-out h-full"
                    style={{ transform: getTranslateX() }}
                  >
                    {certificates.map((item, index) => {
                      const isActive = index === activeIndex;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setActiveIndex(index)}
                          className={`shrink-0 w-70 md:w-[320px] px-4 transition-all duration-500 cursor-pointer flex flex-col items-center justify-center ${
                            isActive
                              ? "scale-105 md:scale-110 opacity-100 z-10"
                              : "scale-90 opacity-40 blur-[1px] hover:opacity-60"
                          }`}
                        >
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              loading="lazy"
                              className="h-48 md:h-64 w-auto shadow-2xl mb-4 object-contain bg-white rounded-lg"
                            />
                          ) : (
                            <div className="h-48 md:h-64 w-50 bg-white/10 flex items-center justify-center mb-4 rounded-lg">
                              <span className="text-xs text-white/50">
                                No Image
                              </span>
                            </div>
                          )}

                          <div
                            className={`text-center transition-opacity duration-500 ${
                              isActive ? "opacity-100" : "opacity-0"
                            }`}
                          >
                            <h3 className="font-bold text-base md:text-lg leading-tight px-2">
                              {item.title}
                            </h3>
                            <p className="text-xs md:text-sm text-white/80 mt-1">
                              {item.issued_by}{" "}
                              {item.issued_year ? `• ${item.issued_year}` : ""}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {certificates.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2 transition-all rounded-full ${
                      index === activeIndex
                        ? "bg-white w-8"
                        : "bg-white/30 w-2 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-6 md:mt-8 max-w-3xl mx-auto px-4 min-h-15 text-center">
                <div
                  className="opacity-90 leading-relaxed text-sm md:text-base [&>p]:mb-2 [&>h2]:font-bold [&>h2]:text-lg [&>h2]:mb-2"
                  dangerouslySetInnerHTML={{
                    __html: certificates[activeIndex]?.description || "",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <h2 className="text-2xl font-bold mb-8 text-center text-brm-green">
          All Certificates
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {certificates.map((item) => (
            <div key={item.id} className="flex flex-col items-center group">
              <div className="relative overflow-hidden rounded-lg shadow-md mb-4 bg-white p-2">
                <img
                  src={item.thumbnail || "/images/placeholder.png"}
                  alt={item.title}
                  loading="lazy"
                  className="h-32 md:h-48 w-full object-contain transform group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="flex flex-col items-center text-center">
                <h3 className="font-bold text-sm md:text-base text-gray-800 mb-1 leading-tight group-hover:text-[#C92D29] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500">{item.issued_by}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;
