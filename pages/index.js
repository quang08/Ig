import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";
import styles from "../styles/Home.module.css";
import { useTheme } from "next-themes";

export default function Home() {
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = systemTheme;

  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll dark:bg-neutral-900">
      <Header currentTheme={currentTheme} />
      <Feed />
      <Modal />
    </div>
  );
}
