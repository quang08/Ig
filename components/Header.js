import React from "react";
import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";

import { HomeIcon } from "@heroicons/react/solid";
import ppf from "../public/3.png";
import { useSession, signIn, signOut } from "next-auth/react";

function Header() {
  const { data: session } = useSession(); //get data from useSession and name it as 'session'
  console.log(session);

  return (
    <div className="border-b border-gray-300 bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* Left */}
        <div className="relative hidden lg:inline-grid w-24 cursor-pointer">
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="relative lg:hidden w-10 flex-shrink-0 cursor-pointer">
          {/* flex-shrink-0 even when screen gets smaller the logo doesnt change in size*/}
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Left */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="text-gray-400 h-5 w-5" />
            </div>
            <input
              className="block w-full pl-10 bg-gray-50 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navBtn" />
          <MenuIcon className="h-8 md:hidden cursor-pointer text-black" />
          
        {session ? (
          <>
            <div className="relative navBtn">
              <PaperAirplaneIcon className="navBtn rotate-45" />
              <div className="absolute -top-2 -right-2 text-xs w-5 h-5 text-white bg-red-500 rounded-full flex items-center justify-center">
                3
              </div>
            </div>

            <PlusCircleIcon className="navBtn" />
            <UserGroupIcon className="navBtn" />
            <HeartIcon className="navBtn" />
            <img
              onClick={signOut}
              src={session?.user?.image}
              alt="profile pic"
              className="h-10 w-10 rounded-full cursor-pointer object-cover"
            />
          </>
        ) : (
          <button onClick={signIn}>Sign In</button>
        )}
          
        </div>
      </div>
    </div>
  );
}

export default Header;
