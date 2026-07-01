"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomeMain from "@/components/home/HomeMain";

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-grow"><HomeMain /></main>
      <Footer />
    </>
  );
}
