import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, HardHat, Globe } from "lucide-react";
import { clientApi } from "../../api/clientApi";
import type { ClientItem } from "../../api/clientApi";
import ProjectListCard from "../../components/cards/ProjectListCard";
import Loader from "../../components/common/Loader";

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState<ClientItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/clients");
    }
  };

  useEffect(() => {
    const fetchClientDetail = async () => {
      if (!id) return;
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        const data = await clientApi.getClientById(id);
        setClient(data);
      } catch (err) {
        console.error("Failed to fetch client detail:", err);
        setError("Klien tidak ditemukan atau gagal dimuat.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientDetail();
  }, [id]);

  if (loading) return <Loader />;

  if (error || !client) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50 font-jakarta">
        <p className="text-red-600 font-semibold mb-4 text-lg">
          {error || "Data tidak ditemukan"}
        </p>
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-[#5a1e1b] text-white rounded-md hover:bg-[#8a2f2b] transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full font-jakarta bg-gray-50">
      <div className="relative h-[50vh] min-h-100 w-full overflow-hidden bg-[#0e3b28]">
        <img
          src="/images/bg-hero-home.png"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#0e3b28] via-[#0e3b28]/80 to-transparent"></div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center">
          <div className="absolute top-24 md:top-32 left-6 md:left-12">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              <ArrowLeft size={16} /> Back
            </button>
          </div>

          <div className="mt-10 max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {client.name}
            </h1>
            <p className="text-gray-100 text-lg font-light leading-relaxed border-l-4 border-white/30 pl-4">
              Get to know our client and discover the successful projects we
              have completed together.
            </p>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-6 md:px-12 pt-0 pb-16 -mt-20 relative z-20 max-w-5xl mb-8 md:mb-16">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-32 h-32 md:w-44 md:h-44 shrink-0 flex items-center justify-center p-2">
            {client.logo ? (
              <img
                src={client.logo}
                alt={client.name}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <span className="font-bold text-gray-400 text-2xl text-center">
                {client.name}
              </span>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {client.name}
            </h2>
            <p className="text-gray-500 mb-6">
              Trusted partner of PT. Cipta Selamat Mandiri
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 bg-[#0e3b28]/10 text-[#0e3b28] px-5 py-2.5 rounded-full font-semibold text-sm">
                <HardHat size={18} />
                <span>{client.projects?.length ?? 0} Finished Projects</span>
              </div>

              {client.website && (
                <a
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-[#5a1e1b] hover:text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors"
                >
                  <Globe size={18} /> Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-12 pb-16 md:pb-24 max-w-7xl">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0e3b28] mb-3">
            Finished Projects
          </h2>
          <p className="text-gray-600 text-lg">
            These are our projects done for{" "}
            <span className="font-bold text-gray-800">{client.name}</span>.
          </p>
        </div>

        {client.projects && client.projects.length > 0 ? (
          <div className="flex flex-col gap-16 lg:gap-24">
            {client.projects.map((project, index) => (
              <ProjectListCard
                key={project.id}
                project={project}
                isReversed={index % 2 !== 0}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-16 text-center shadow-sm border border-dashed border-gray-200 max-w-2xl mx-auto">
            <div className="inline-block p-6 rounded-full bg-white mb-6 shadow-sm">
              <HardHat size={48} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-[#5a1e1b] mb-3">
              No Projects Yet
            </h3>
            <p className="text-gray-500 text-lg">
              Saat ini belum ada proyek publik yang diselesaikan untuk klien
              ini.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ClientDetail;
