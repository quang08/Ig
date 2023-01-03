import React from 'react'
import ppf from "../public/3.png";
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react";

function MiniProfile() {
  const { data: session } = useSession(); 
  //console.log(session)

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      {/*<Image src={ppf} className='h-16 w-16 rounded-full p-[2px] border object-cover'/>*/}
      <img
        onClick={signOut}
        src={session?.user?.image}
        alt="profile pic"
        className="h-10 w-10 rounded-full cursor-pointer object-cover"
      />

      <div className="mx-4 flex-1">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">Quang</h3>
      </div>

      <button className="text-blue-400 font-semibold text-sm">Sign Out</button>
    </div>
  );
}

export default MiniProfile