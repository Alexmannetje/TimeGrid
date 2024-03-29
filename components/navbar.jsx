"use client";

import ProfileButton from "./profilebutton";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="bg-gray-100 border-gray-200 dark:bg-gray-900 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/dashboard" className="flex items-center">
          <Image
            src="/TimeGrid_Logo.png"
            className="mr-3"
            alt="Logo"
            width={32}
            height={32}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            TimeGrid
          </span>
        </a>
        <div
          className="items-center bg-gray-100 justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul
            className="flex flex-col items-center
           font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-100 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <a
                className="text-white bg-gray-700 hover:bg-gray-900 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-gray-800 dark:hover:bg-gray-900 dark:focus:ring-gray-800"
                href="/dashboard"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-900 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Test
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-900 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Test
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-900 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Test
              </a>
            </li>
            <li>
              <div className="flex ">
                <a
                  className="text-white bg-gray-700 hover:bg-gray-900 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-gray-800 dark:hover:bg-gray-900 dark:focus:ring-gray-800"
                  href="/grid"
                >
                  grid
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div className="md:order-2">
          {/* <a
            href="/login"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <img
              className="w-8 h-8 rounded-full"
              src="/TimeGrid_Logo.png"
              alt="user photo"
            />
          </a> */}

          <ProfileButton />
        </div>
      </div>
    </nav>
  );
}
