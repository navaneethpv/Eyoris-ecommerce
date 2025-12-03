import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div>
      {/* Component: AuthLayout (page) */}
      <div className="bg-white">
        {/* Component: AuthWrapper */}
        <div className="flex justify-center h-screen">
          {/* Component: LeftHero - visible on large screens */}
          <div
            className="hidden h-screen bg-cover bg-no-repeat lg:block lg:w-2/3"
            style={{
              backgroundImage: "url('/assets/Images/signIn.jpg')", // Set as background image for proper coverage
            }}
          >
            {/* Component: LeftHero content */}
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Meraki UI
                </h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                  autem ipsa, nulla laboriosam dolores, repellendus perferendis
                  libero suscipit nam temporibus molestiae
                </p>
              </div>
            </div>
          </div>

          {/* Component: SignUpContainer */}
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            {/* Component: SignCard */}
            <div className="flex-1">
              {/* Component: Brand */}
              <div className="text-center">
                {/* Component: Logo */}
                <div className="flex justify-center mx-auto">
                  <Image
                    className="w-auto h-7 sm:h-8"
                    src="https://merakiui.com/images/logo.svg"
                    alt=""
                    width={100}
                    height={32}
                  />
                </div>

                {/* Component: PageTitle */}
                <p className="mt-3 text-black text-2xl font-bold sm:text-3xl">
                  Create your account
                </p>
              </div>

              {/* Component: SignUpFormWrapper */}
              <div className="mt-8">
                {/* Component: SignUpForm */}
                <form className="flex flex-col gap-6 mt-8">
                  {/* Component: FirstNameField */}
                  <div>
                    <label className="block mb-2 text-sm text-black">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  {/* Component: LastNameField */}
                  <div>
                    <label className="block mb-2 text-sm text-black">
                      Last name
                    </label>
                    <input
                      type="text"
                      placeholder="Snow"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  {/* Component: PhoneField */}
                  <div>
                    <label className="block mb-2 text-sm text-black">
                      Phone number
                    </label>
                    <input
                      type="text"
                      placeholder="XXX-XX-XXXX-XXX"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  {/* Component: EmailField */}
                  <div>
                    <label className="block mb-2 text-sm text-black">
                      Email address
                    </label>
                    <input
                      type="email"
                      placeholder="johnsnow@example.com"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  {/* Component: PasswordField */}
                  <div>
                    <label className="block mb-2 text-sm text-black">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  {/* Component: ConfirmPasswordField */}
                  <div>
                    <label className="block mb-2 text-sm text-black">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  {/* Component: SubmitButton */}
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Sign Up
                  </button>
                </form>

                {/* Component: FooterPrompt */}
                <p className="mt-6 text-sm text-center text-black">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign in
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
