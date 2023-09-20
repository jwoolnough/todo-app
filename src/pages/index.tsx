import Head from "next/head";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="" />
      </Head>

      {/* <aside>
          <div className="flex h-[5.5rem] items-center p-4">
            <h3 className="text-lg font-bold text-white">Tasks</h3>
          </div>

          {["This week", "This month", "At some point"].map((category) => (
            <div
              className="mb-2 rounded-xl border bg-slate-900 px-4 py-3"
              key={category}
            >
              {category}
            </div>
          ))}
        </aside> */}

      <header className="flex items-center justify-between p-6">
        <div className="flex items-baseline gap-4">
          <h1 className="text-lg font-bold leading-tight text-white md:text-2xl">
            August 2023
          </h1>
          <h2 className="text-lg leading-tight">Week 32</h2>
        </div>

        <ul className="flex items-center gap-2">
          <li>
            <button
              type="button"
              className="block hover:text-white"
              aria-label="Previous week"
            >
              <FiChevronLeft size={22} />
            </button>
          </li>
          <li>
            <button
              type="button"
              className="block hover:text-white"
              aria-label="Choose date"
            >
              <FiCalendar size={22} />
            </button>
          </li>
          <li>
            <button
              type="button"
              className="block hover:text-white"
              aria-label="Next week"
            >
              <FiChevronRight size={22} />
            </button>
          </li>
          <li className="max-sm:hidden">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-100 hover:text-slate-950"
            >
              Go to today
            </button>
          </li>
        </ul>
      </header>

      <main className="mr-2 flex-grow rounded-xl border bg-slate-900 p-6 max-sm:ml-2 sm:mb-2"></main>
    </>
  );
}
