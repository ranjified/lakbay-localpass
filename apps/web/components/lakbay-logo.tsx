type LakbayLogoProps = {
  className?: string;
  markClassName?: string;
  showText?: boolean;
  inverted?: boolean;
};

const logoMarkSrc = "/SVGs/3.svg";

export function LakbayLogo({
  className = "",
  markClassName = "h-12 w-12",
  showText = true,
  inverted = false
}: LakbayLogoProps) {
  const textColor = inverted ? "text-white" : "text-lakbay-green";
  const subTextColor = inverted ? "text-lakbay-gold" : "text-lakbay-blue";
  const captionColor = inverted ? "text-white/70" : "text-lakbay-green/70";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className={`grid shrink-0 place-items-center overflow-hidden rounded-full border border-lakbay-green/20 bg-lakbay-paper shadow-[0_10px_30px_rgba(0,71,126,0.12)] ${markClassName}`}>
        <img src={logoMarkSrc} alt="Lakbay LocalPass woven route mark" className="h-full w-full object-cover" />
      </span>
      {showText ? (
        <span className="leading-none">
          <span className={`block text-xl font-black ${textColor}`}>Lakbay</span>
          <span className={`block text-lg font-semibold ${subTextColor}`}>LocalPass</span>
          <span className={`mt-1 block text-[10px] font-bold uppercase tracking-[0.18em] ${captionColor}`}>
            Tayabas City Tourism-Tech
          </span>
        </span>
      ) : null}
    </span>
  );
}
