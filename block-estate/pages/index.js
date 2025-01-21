import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>BlockEstate</title>
        <meta name="description" content="Find your dream property with BlockEstate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
        <main className={styles.main}>
          <div className={styles.logoContainer}>
            <Image
              className={styles.logo}
              src="https://tse3.mm.bing.net/th?id=OIP.qV6dz_0LA40DMpAMN8RJRwHaE7&pid=Api"
              alt="BlockEstate logo"
              width={360}
              height={76}
              priority
            />
          </div>
          <h1>Welcome to BlockEstate</h1>
          <p>Your trusted platform for finding and listing properties.</p>
          <div className={styles.ctas}>
            <a className={styles.primary} href="/list">
              List Your Property
            </a>
            <a href="/listings" className={styles.secondary}>
              View Listed Properties
            </a>
          </div>
        </main>
        <footer className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} BlockEstate. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}