import React from 'react'
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import Image from 'next/image';
import ppf from "../public/3.png";


function Post({id, username, userImg, img, caption}) {
  return (
    <div className='bg-white border my-7 rounded-md'>
      {/* Header */}
      <div className="flex items-center p-5">
        <Image
          className="rounded-full w-12 h-12 border p-1 mr-3"
          src={ppf}
          alt="profile pic"
        />
        <p className="flex-1 font-bold">{username}</p> {/* Flex-1: takes as much room left */}
        <DotsHorizontalIcon className="h-5" />
      </div>
    </div>
  );
}

export default Post