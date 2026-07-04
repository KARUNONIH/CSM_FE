import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ServiceCategory } from "../../api/serviceCategoryApi";

interface ServiceCardProps {
  category: ServiceCategory;
  thumbnail?: string;
}

const ServiceCard = ({ category, thumbnail }: ServiceCardProps) => {
  return (
    
    <div
      className="group block relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
    >
      {/*to={`/services/${category.slug}`}*/}
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={thumbnail || "/images/placeholder-service.jpg"}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 scale-110 group-hover:scale-120"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/600x400?text=No+Image";
          }}
        />
      </div>

      <div className="bg-brm-maroon text-white px-4 py-2 font-bold text-lg relative z-10 -mt-4 mx-4 shadow-md rounded-sm">
        {category.name}
      </div>

      <div className="p-4 pt-6">
        <div
          className="text-gray-600 text-sm line-clamp-2 mb-4 prose prose-sm max-w-none text-justify leading-relaxed"
          dangerouslySetInnerHTML={{
            __html:
              category.description ||
              "Layanan profesional dari PT. Cipta Selamat Mandiri.",
          }}
        />

        {/* <div className="flex items-center text-brm-maroon text-sm font-semibold group-hover:gap-2 transition-all">
          Lihat Detail <ArrowRight size={16} className="ml-1" />
        </div> */}
      </div>
    </div>
  );
};

export default ServiceCard;
