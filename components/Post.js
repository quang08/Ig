import React from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import Image from "next/image";
import ppf from "../public/3.png";
import post from "../public/2.jpg";

function Post({ id, username, userImg, img, caption }) {
  return (
    <div className="bg-white border my-7 rounded-md">
      {/* Header */}
      <div className="flex items-center p-5">
        <Image
          className="rounded-full w-12 h-12 border p-1 mr-3 object-cover"
          src={ppf}
          alt="profile pic"
        />
        <p className="flex-1 font-bold">{username}</p>
        {/* Flex-1: takes as much room left */}
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* img */}
      <Image src={post} className="w-full object-cover" />

      {/* Buttons */}
      <div className="flex justify-between px-4 pt-4">
        <div className="flex items-center space-x-4">
          <HeartIcon className="btn" />
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn rotate-45" />
        </div>

        <div>
          <BookmarkIcon className="btn" />
        </div>
      </div>

      {/* likes count */}

      {/* Caption */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      {/* comments */}

      {/* input box */}
      <form className="flex items-center p-4">
        <EmojiHappyIcon className="h-7" />
        <input
          className="flex-1 border-none outline-none focus:ring-0"
          type="text"
          placeholder="Add a comment..."
        />
        <button className="font-semibold text-blue-400">Post</button>
      </form>
    </div>
  );
}

export default Post;
