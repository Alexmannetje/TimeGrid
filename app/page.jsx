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
            href="/Calendar"
          >
            kalender
          </a>
          <div>
            <article class="flex items-center gap-4 h-32 rounded-lg border-2 border-gray-200 bg-gray-50 p-6 sm:justify-between">
              <span class="rounded-full bg-blue-100 p-3 text-blue-600">
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
                <p class="text-2xl font-medium text-gray-900">$240.94</p>

                <p class="text-sm text-gray-500">Total Sales</p>
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
                <p class="text-2xl font-medium text-gray-900">$240.94</p>

                <p class="text-sm text-gray-500">Total Sales</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
