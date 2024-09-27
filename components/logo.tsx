import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden md:flex items-center gap-x-2 hover:opacity-75 transition-opacity">
        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
        <p className="text-lg font-bold text-neutral-700">TaskPro</p>
      </div>
    </Link>
  );
};
