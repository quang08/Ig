import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed';
import Header from '../components/Header';
import Modal from '../components/Modal';
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll dark:bg-neutral-900">
      <Header />
      <Feed />
      <Modal />
    </div>
  );
}
