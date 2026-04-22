import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showText?: boolean;
  iconOnly?: boolean;
  noLink?: boolean;
}

export default function Logo({
  className = "",
  width = 40,
  height = 40,
  showText = true,
  iconOnly = false,
  noLink = false
}: LogoProps) {
  const isIconOnly = iconOnly || !showText;

  const content = (
    <>
      <div className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm border border-slate-200/50`} style={{ width, height }}>
        <Image
          src="/images/logo.png"
          alt="Propnest Logo"
          fill
          className="object-contain p-1"
        />
      </div>
      {!isIconOnly && (
        <span className="text-xl font-bold tracking-tight text-white">
          Propnest
        </span>
      )}
    </>
  );

  if (noLink) {
    return <div className={`flex items-center gap-3 ${className}`}>{content}</div>;
  }

  return (
    <Link href="/" className={`flex items-center gap-3 hover:opacity-90 transition-opacity ${className}`}>
      {content}
    </Link>
  );
}
