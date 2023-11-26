import NavBar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto flex justify-between">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-16 flex-1">
          <a
            className="h-32 rounded-lg bg-gray-200 flex items-center gap-4 border-2 border-gray-300 p-6 sm:justify-between"
            href="/login"
          >
            profile
            <img
              className="w-24 h-24 border-2 border-gray-400 rounded-full"
              src="/pfp.png"
              alt="user photo"
            />
          </a>
          <a
            className="h-32 rounded-lg bg-gray-200 flex items-center gap-4 border-2 border-gray-300 p-6 sm:justify-between"
            href="/calendar"
          >
            kalender
          </a>
          <div>
            <article class="flex items-center gap-4 h-32 rounded-lg border-2 border-gray-200 bg-gray-50 p-6 sm:justify-between">
              <div>
              </div>

              <div>
                <p class="text-2xl font-medium text-center text-gray-900">17</p>

                <p class="text-sm text-gray-500">Gewerkte uren</p>
              </div>
            </article>
          </div>
          <div className="h-32 rounded-lg bg-gray-200 flex items-center gap-4 border-2 border-gray-300 p-6 sm:justify-between">
            settings
          </div>
          <div className="h-32 rounded-lg bg-gray-200 flex items-center gap-4 border-2 border-gray-300 p-6 sm:justify-between">
            contact
          </div>
          <div>
            <article class="flex items-center gap-4 rounded-lg h-32 border-2 border-gray-200 bg-gray-50 p-6 sm:justify-between">
              <span class="rounded-full bg-blue-100 p-3 text-blue-600 sm:order-last">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>

              <div>
                <p class="text-2xl font-medium text-gray-900">$242,56</p>

                <p class="text-sm text-gray-500">Brutto inkomen</p>
              </div>
            </article>
          </div>
        </div>
      </div>
      

<footer class="bg-gray-100 rounded-lg shadow-md m-4 dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">About</a>
        </li>
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
        </li>
        <li>
            <a href="#" class="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
</footer>

    </div>
  )
};
