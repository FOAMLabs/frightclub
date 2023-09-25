
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Flashlight from '../components/Flashlight';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>🧛‍♂️ Fright Club 🧟‍♂️</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
      <Flashlight />

      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
};

export default Home;
