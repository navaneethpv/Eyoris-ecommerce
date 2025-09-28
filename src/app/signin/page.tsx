"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();
  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in or create a account</h2>
          </div>

          <form className="space-y-6">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-900 transition duration-150"
                placeholder="Enter mobile number or email"
              />
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
                I agree with{" "}
                <Link href="/privacy-policy" className="font-medium text-black hover:text-gray-800">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms-of-use" className="font-medium text-black hover:text-gray-800">
                  Terms of Use
                </Link>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                onClick={()=>router.push("/phone")}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
