import Head from "next/head";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="" />
      </Head>

      <div>
        <nav>
          {/* TODO: Logo */}

          <ul></ul>
        </nav>

        <aside></aside>

        <header>
          <h1>August 2023</h1>
          <h2>Week 32</h2>

          <ul>
            <li>
              <button type="button" aria-label="Previous week"></button>
            </li>
            <li>
              <button type="button" aria-label="Choose date"></button>
            </li>
            <li>
              <button type="button" aria-label="Next week"></button>
            </li>
          </ul>
        </header>

        <main></main>
      </div>
    </>
  );
}
