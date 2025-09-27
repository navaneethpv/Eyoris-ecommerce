import Image from "next/image";
import Link from "next/link";

export default function ForgotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Decorative image and Logo */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#F3F5F7]">
        {/* Logo */}
        <div className="absolute top-8 left-8 z-10">
          <Link href="/">
            <Image
              src="/assets/Images/logo.png"
              alt="Eyoris Logo"
              width={100}
              height={30}
              className="object-contain"
            />
          </Link>
        </div>
        <Image
          src="/assets/Images/siginIn.png"
          alt="Cozy chair with blanket"
          fill
          className="object-contain"
        />
      </div>

      {/* Right side - Content area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
