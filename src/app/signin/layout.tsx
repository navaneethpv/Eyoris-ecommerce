import Image from "next/image";

export default function SigninLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Decorative image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#F3F5F7]">
        <Image
          src="/assets/siginIn.png"
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
