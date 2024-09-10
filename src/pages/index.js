import Banner from "@/components/Banner";
import Header from "@/components/Header";
import ProductFeed from "@/components/ProductFeed";
import axios from "axios";
import { getSession } from "next-auth/react";
import Head from "next/head";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      {/* header */}
      <Header />

      {/* main */}
      <main className="max-w-screen-2xl mx-auto">
        {/* banner */}
        <Banner />

        {/* productFeed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const response = await axios("https://fakestoreapi.com/products")
  return {
    props: {
      products: response.data,
      session
    }
  }
}
