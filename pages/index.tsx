import type { NextPage } from "next";
import Head from "next/head";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify 2.0</title>
      </Head>
      <main className="flex overflow-hidden">
        <Sidebar />
        <Center />
      </main>
    </div>
  );
};

export default Home;
