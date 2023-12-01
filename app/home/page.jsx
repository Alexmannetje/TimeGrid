"use client";

import NavBar from "@/components/navbar";
import { useClerk, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
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
              <img
                className="w-24 h-24 rounded-full"
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
        <div className="bg-white">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Technical Specifications
              </h2>
              <p className="mt-4 text-gray-500">
                The walnut wood card tray is precision milled to perfectly fit a
                stack of Focus cards. The powder coated steel divider separates
                active cards from new ones, or can be used to archive important
                task lists.
              </p>

              <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8"></dl>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
              <img
                src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
                alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                className="rounded-lg bg-gray-100"
              />
              <img
                src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
                alt="Top down view of walnut card tray with embedded magnets and card groove."
                className="rounded-lg bg-gray-100"
              />
              <img
                src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
                alt="Side of walnut card tray with card groove and recessed card area."
                className="rounded-lg bg-gray-100"
              />
              <img
                src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
                alt="Walnut card tray filled with cards and card angled in dedicated groove."
                className="rounded-lg bg-gray-100"
              />
            </div>
          </div>
        </div>
        <footer className="bg-gray-100 rounded-lg shadow-md m-12 dark:bg-gray-800 max-w-screen-2xl mx-auto">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              <a href="/meow">©</a> 2023{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                Flowbite™
              </a>
              . All Rights Reserved.
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
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    )
  );
}
