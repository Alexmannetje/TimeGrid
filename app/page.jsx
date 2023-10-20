import NavBar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto flex justify-between">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-16 flex-1">
          <a className="h-32 rounded-lg bg-gray-200" href="/login">
            profile
          </a>
          <div className="h-32 rounded-lg bg-gray-200">calender</div>
          <div className="h-32 rounded-lg bg-gray-200">
            <article class="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
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
          <div className="h-32 rounded-lg bg-gray-200">settings</div>
          <div className="h-32 rounded-lg bg-gray-200">contact</div>
          <div className="h-32 rounded-lg bg-gray-200">
            <article class="flex items-center  rounded-lg border border-gray-100 bg-white p-6 sm:justify-between">
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
