import Head from "next/head";
import Image from "next/image";
import Login from "../components/Login";

export default function Home() {
  return (
    <div>
      <Head>
        <title>CRUD</title>
        <meta name="description" content="fullstack test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Login key={"mainLogin"} />
      </main>
    </div>
  );
}
