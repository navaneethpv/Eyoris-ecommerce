import React from "react";
import Image from "next/image";
const DownloadAppSection = () => {
  return (
    <>
      <div>
        <h3 className="font-semibold text-lg mb-3">Download App</h3>
        <p className="text-sm mb-3">Save $3 with App New User Only</p>
        <div className="flex items-center space-x-3 mb-3">
          <Image
            src="/assets/Images/qr-code.png"
            alt="QR Code"
            width={80}
            height={80}
            className="w-20 h-20 mt-1"
          />
          <div className="space-y-4">
            <a href="#" aria-label="Google Play Store">
              <Image
                src="/assets/Images/google-play-badge.png"
                alt="Get it on Google Play"
                width={100}
                height={40}
                className="h-10"
              />
            </a>
            <a href="#" aria-label="Apple App Store">
              <Image
                src="/assets/Images/app-store-badge.png"
                alt="Download on the App Store"
                width={100}
                height={40}
                className="h-10 mt-1"
              />
            </a>
          </div>
        </div>

        <div className="flex space-x-4 text-black text-xl justify-center mr-7 mt-1.5">
          <a href="#" aria-label="Facebook" className="hover:text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.271 0-4.192 1.58-4.192 4.615v3.385z" />
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38-.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.444v-2.425z" />
            </svg>
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l9 4-9 4z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-pink-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.204-.012 3.584-.07 4.85-1.48 3.225-1.691 4.772-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.85-.07-3.26-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.584.07-4.85 1.48-3.227 1.691-4.772 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98.281.058.662.069 4.948.069 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-.281-.059-.662-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default DownloadAppSection;
