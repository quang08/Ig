import React from "react";
import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import Header from "../../components/Header";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function SignIn({ providers }) {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = systemTheme;

  return (
    <>
      <Header currentTheme={currentTheme} />

      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center">
        <img className="w-80" src='https://links.papareact.com/ocw'/>
        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className="flex items-center p-5 bg-blue-500 rounded-lg text-white text-2xl" onClick={() => SignIntoProvider(provider.id, {callbackUrl: "/"})}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
