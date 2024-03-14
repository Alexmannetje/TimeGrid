import NavBar from "@/components/navbar";

export default function grid() {
  return (
    <div>
      <NavBar />

      <div className="container mx-auto mt-10">
        <div className="wrapper bg-white rounded shadow w-full ">
          <div className="header flex justify-between border-b p-2">
            <span className="text-lg font-bold">2020 July</span>
            <div className="buttons">
              <button className="p-1">
                <svg
                  width="1em"
                  fill="gray"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-arrow-left-circle"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"
                  />
                </svg>
              </button>
              <button className="p-1">
                <svg
                  width="1em"
                  fill="gray"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-arrow-right-circle"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                  <span className="xl:block lg:block md:block sm:block hidden">
                    Sunday
                  </span>
                  <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                    Sun
                  </span>
                </th>
                <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                  <span className="xl:block lg:block md:block sm:block hidden">
                    Monday
                  </span>
                  <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                    Mon
                  </span>
                </th>
                <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                  <span className="xl:block lg:block md:block sm:block hidden">
                    Tuesday
                  </span>
                  <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                    Tue
                  </span>
                </th>
                <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                  <span className="xl:block lg:block md:block sm:block hidden">
                    Wednesday
                  </span>
                  <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                    Wed
                  </span>
                </th>
                <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                  <span className="xl:block lg:block md:block sm:block hidden">
                    Thursday
                  </span>
                  <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                    Thu
                  </span>
                </th>
                <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                  <span className="xl:block lg:block md:block sm:block hidden">
                    Friday
                  </span>
                  <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                    Fri
                  </span>
                </th>
                <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                  <span className="xl:block lg:block md:block sm:block hidden">
                    Saturday
                  </span>
                  <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                    Sat
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center h-20">
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300 ">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">1</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">2</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">3</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">4</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">6</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-hidden transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">7</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500 text-sm">8</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
              </tr>

              <tr className="text-center h-20">
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">9</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">10</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">12</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">13</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">14</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">15</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500 text-sm">16</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
              </tr>

              <tr className="text-center h-20">
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">16</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">17</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">18</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">19</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">20</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">21</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500 text-sm">22</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
              </tr>

              <tr className="text-center h-20">
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">23</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">24</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">25</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">26</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">27</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">28</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500 text-sm">29</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
              </tr>

              <tr className="text-center h-20">
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">30</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">31</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border bg-gray-100 p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">1</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border bg-gray-100 p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">2</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border bg-gray-100 p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">3</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border bg-gray-100 p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500">4</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
                <td className="border bg-gray-100 p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                  <div className="flex flex-col h-40 xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                    <div className="top h-5 w-full">
                      <span className="text-gray-500 text-sm">5</span>
                    </div>
                    <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// import { FunctionComponent, useEffect, useState } from "react";
// import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
// import classNames from "./helper";

// const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December"
// ];

// const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// const grid: FunctionComponent = () => {
//     const date = new Date();
//     const [month, setMonth] = useState(date.getMonth());
//     const [year, setYear] = useState(date.getFullYear());
//     const [numOfDays, setNumOfDays] = useState<number[]>([]);
//     const [emptyDays, setEmptyDays] = useState<number[]>([]);

//     const isToday = (date: number) => {
//         const today = new Date();
//         const d = new Date(year, month, date);

//         return today.toDateString() === d.toDateString();
//     };

//     const getNoOfDays = () => {
//         let i;
//         let daysInMonth = new Date(year, month + 1, 0).getDate();

//         // find where to start grid day of week
//         let dayOfWeek = new Date(year, month).getDay();
//         let emptyDaysArray = [];
//         for (i = 1; i <= dayOfWeek; i++) {
//             emptyDaysArray.push(i);
//         }

//         let daysArray = [];
//         for (i = 1; i <= daysInMonth; i++) {
//             daysArray.push(i);
//         }

//         setEmptyDays(emptyDaysArray);
//         setNumOfDays(daysArray);
//     };

//     useEffect(() => {
//         getNoOfDays();
//         console.log(month, year);
//     }, [month]);

//     const events = [
//         {
//             event_date: new Date(2021, 9, 4),
//             event_title: "My Birthday :)",
//             event_theme: "red"
//         },

//         {
//             event_date: new Date(2021, 11, 25),
//             event_title: "Xmas Day",
//             event_theme: "green"
//         },
//         {
//             event_date: new Date(2021, 9, 31),
//             event_title: "Halloween",
//             event_theme: "yellow"
//         },
//         {
//             event_date: new Date(2021, 11, 31),
//             event_title: "New Years Eve",
//             event_theme: "yellow"
//         }
//     ];

//     const themes = [
//         {
//             value: "blue",
//             label: "Blue Theme"
//         },
//         {
//             value: "red",
//             label: "Red Theme"
//         },
//         {
//             value: "yellow",
//             label: "Yellow Theme"
//         },
//         {
//             value: "green",
//             label: "Green Theme"
//         },
//         {
//             value: "purple",
//             label: "Purple Theme"
//         }
//     ];
//     const btnclassName = (limit: number) => {
//         return classNames(
//             month === limit ? "cursor-not-allowed opacity-25" : "",
//             "leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center focus:outline-none"
//         );
//     };

//     const nextMonth = () => {
//         setMonth(month + 1);
//         getNoOfDays();
//     };

//     const prevMonth = () => {
//         setMonth(month - 1);
//         getNoOfDays();
//     };

//     const eventclassName = (t: string) => {
//         switch (t) {
//             case "blue":
//                 return "border-blue-200 text-blue-800 bg-blue-100";
//             case "red":
//                 return "border-red-200 text-red-800 bg-red-100";
//             case "yellow":
//                 return "border-yellow-200 text-yellow-800 bg-yellow-1000";
//             case "green":
//                 return "border-green-200 text-green-800 bg-green-100";
//             default:
//                 return "border-purple-200 text-purple-800 bg-purple-100";
//         }
//     };

//     return (
//         <>
//             <div className="container mx-auto py-4 px-6">
//                 <div className="bg-white rounded-lg shadow overflow-hidden">
//                     <div className="flex items-center justify-between px-6 py-4 border-b">
//                         <div>
//               <span className="text-lg font-bold text-gray-800">
//                 {monthNames[month]}
//               </span>
//                             <span className="ml-1 text-lg text-gray-600 font-normal">
//                 {year}
//               </span>
//                         </div>
//                         <div className="border rounded-lg px-1 pt-1">
//                             {/* Previous Month Button */}
//                             <button
//                                 type="button"
//                                 onClick={() => prevMonth()}
//                                 disabled={month === 0}
//                                 className={btnclassName(0)}
//                             >
//                                 <ArrowLeftIcon className="h-6 w-6 text-gray-500 inline-flex leading-none" />
//                             </button>
//                             <div className="border-r inline-flex h-6" />
//                             {/* Next Month Button */}
//                             <button
//                                 type="button"
//                                 onClick={() => nextMonth()}
//                                 disabled={month === 11}
//                                 className={btnclassName(11)}
//                             >
//                                 <ArrowRightIcon className="h-6 w-6 text-gray-500 inline-flex leading-none" />
//                             </button>
//                         </div>
//                     </div>
//                     <div className="-mx-1 -mb-1">
//                         <div
//                             className="flex flex-wrap -mb-8"
//                             style={{ marginBottom: "-30px" }}
//                         >
//                             {days.map((day) => (
//                                 <div key={day} className="px-2 py-2 w-[14.28%]">
//                                     <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
//                                         {day}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="flex flex-wrap">
//                             {emptyDays.map((emptyDay) => (
//                                 <div
//                                     key={emptyDay}
//                                     className="text-center border-r border-b px-4 pt-2 h-32 w-[14.28%]"
//                                 />
//                             ))}
//                             {numOfDays.map((date, index) => (
//                                 <div
//                                     key={index}
//                                     className="px-4 pt-2 border-r border-b relative h-32 w-[14.28%]"
//                                 >
//                                     <div
//                                         className={classNames(
//                                             isToday(date)
//                                                 ? "bg-blue-500 text-white"
//                                                 : "text-gray-700 hover:bg-blue-200",
//                                             "inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100"
//                                         )}
//                                     >
//                                         {date}
//                                     </div>

//                                     <div className="overflow-y-auto mt-1 h-20">
//                                         {events
//                                             .filter(
//                                                 (e) =>
//                                                     new Date(e.event_date).toDateString() ===
//                                                     new Date(year, month, date).toDateString()
//                                             )
//                                             .map((e) => (
//                                                 <div
//                                                     key={e.event_title}
//                                                     className={classNames(
//                                                         eventclassName(e.event_theme),
//                                                         "px-2 py-1 rounded-lg mt-1 overflow-hidden border"
//                                                     )}
//                                                 >
//                                                     <p className="text-sm truncate leading-tight">
//                                                         {e.event_title}
//                                                     </p>
//                                                 </div>
//                                             ))}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default grid;
