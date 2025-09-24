export default function SigninLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Decorative image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-50 items-center justify-center p-12">
        <div className="max-w-md">
          <img
            src="/images/siginIn.png"
            alt="Cozy chair with blanket"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Right side - Content area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
