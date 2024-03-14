"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Main() {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <section className="text-gray-600 body-font">
      <div className="max-w-7xl mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 md:ml-24 pt-6 flex flex-col md:items-start md:text-left mb-40 items-center text-center justify-center">
          <h1 className="mb-5 sm:text-6xl text-5xl items-center Avenir xl:w-2/2 text-gray-900">
            Easy to use grid.
          </h1>
          {/* <div className="flex justify-center">
            <a
              className="inline-flex items-center px-6 py-5 mt-2 font-medium text-2xl text-white transition duration-500 ease-in-out transform border rounded-lg bg-gray-900 "
              href="/dashboard"
            >
              <span className="justify-center">Go to dashboard</span>
            </a>
          </div> */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {isSignedIn ? (
              <a
                href="/dashboard"
                className="inline-flex items-center px-6 py-5 mt-2 font-medium text-2xl text-white transition duration-500 ease-in-out transform border rounded-lg bg-gray-900 "
              >
                Dashboard →
              </a>
            ) : (
              <a
                href="/login"
                className="inline-flex items-center px-6 py-5 mt-2 font-medium text-2xl text-white transition duration-500 ease-in-out transform border rounded-lg bg-gray-900 "
              >
                Sign in or Log in →
              </a>
            )}
          </div>
        </div>
        <div className="xl:mr-44 sm:mr-0 sm:mb-28 mb-0 lg:mb-0 mr-48 md:pl-10">
          <Image
            className="md:ml-1 ml-24"
            width={300}
            height={300}
            alt="TimeGrid_logo"
            src="/TimeGrid_Logo.png"
          />
        </div>
      </div>
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="py-24 md:py-36">
            <h1 className="mb-5 text-6xl Avenir font-semibold text-gray-900">
              Contact us for support
            </h1>
            <h1 className="mb-9 text-2xl font-semibold text-gray-600">
              Enter your email address and send your complaint.
            </h1>
            <input
              placeholder="name@example.com"
              name="email"
              type="email"
              autoComplete="email"
              className="border border-gray-600 w-1/4 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-900"
            ></input>{" "}
            <a
              className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-white transition duration-500 ease-in-out transform border rounded-lg bg-gray-900"
              href="/"
            >
              <span className="justify-center">Send</span>
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}
