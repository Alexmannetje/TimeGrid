
"use client";

import NavBar from "@/components/navbar";
import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  return (
    user && (
      <div>
        <NavBar />
        <div className="container mx-auto flex justify-between">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 mt-16 flex-1">
            <a
              className="h-40 rounded-lg bg-gray-200 flex items-center gap-4 border-2 border-gray-300 p-6 sm:justify-between"
              href="/"
            >
              profile
              <Image
                className="rounded-full"
                width={64}
                height={64}
                src={user.imageUrl || null}
                alt="user photo"
              />
            </a>
            <a
              className="h-40 rounded-lg bg-gray-200 flex items-center gap-4 border-2 border-gray-300 p-6 sm:justify-between"
              href="/calendar"
            >
              calendar
            </a>
            <div>
              {/* <article className="flex items-center gap-4 rounded-lg h-32 p-6 sm:justify-between">
                <span className="rounded-full bg-blue-100 p-3 text-blue-600 sm:order-last">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>

                <div>
                  <p className="text-2xl font-medium text-gray-900">$242,56</p>

                  <p className="text-sm text-gray-500">Brutto inkomen</p>
                </div>
              </article> */}
            </div>
            <div>
              {/* <article className="flex items-center gap-4 h-32 rounded-lg p-6 sm:justify-between">
                <div></div>

                <div>
                  <p className="text-2xl font-medium text-center text-gray-900">
                    17
                  </p>

                  <p className="text-sm text-gray-500">Gewerkte uren</p>
                </div>
              </article> */}
            </div>

            <div className="h-40 rounded-lg bg-gray-200 flex items-center gap-4 border-2 border-gray-300 p-6 sm:justify-between">
              settings
            </div>
            <div className="h-40 rounded-lg bg-gray-200 flex items-center gap-4 border-2 border-gray-300 p-6 sm:justify-between">
              contact
            </div>

            <a></a>
          </div>
        </div>

        <footer className="bg-gray-100 rounded-lg shadow-md m-12 dark:bg-gray-800 max-w-screen-2xl mx-auto">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              <a href="/logo">©</a> 2023{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                TimeGrid™
              </a>
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a onClick={() => signOut(() => router.push("/"))} className="hover:underline">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    )
  );
}
