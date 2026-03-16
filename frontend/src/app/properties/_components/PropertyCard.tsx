import Image from "next/image";

interface PropertyCardProps {
  imageUrl: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: string;
  badge?: string;
  badgeColor?: "black" | "white";
  className?: string;
}

export default function PropertyCard({
  imageUrl,
  title,
  price,
  location,
  beds,
  baths,
  sqft,
  badge,
  badgeColor = "black",
  className = "",
}: PropertyCardProps) {
  const badgeClasses =
    badgeColor === "white"
      ? "bg-white/90 backdrop-blur-md text-black"
      : "bg-black/60 backdrop-blur-md text-white";

  return (
    <div className={`glass-panel p-4 group cursor-pointer border border-white/5 ${className}`}>
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {badge && (
          <div
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${badgeClasses}`}
          >
            {badge}
          </div>
        )}
      </div>
      <div className="px-1">
        <div className="text-emerald-400 font-bold text-xl mb-1">{price}</div>
        <h3 className="font-semibold text-lg mb-1 truncate">{title}</h3>
        <p className="text-slate-400 text-sm mb-4 truncate">{location}</p>
        <div className="flex items-center gap-4 text-sm text-slate-300 border-t border-white/5 pt-4">
          <span>{beds} Beds</span>
          <span>•</span>
          <span>{baths} Baths</span>
          <span>•</span>
          <span>{sqft} sqft</span>
        </div>
      </div>
    </div>
  );
}
