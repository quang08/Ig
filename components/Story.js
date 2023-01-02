import React from "react";

function Story({ img, username }) {
  return (
    <div>
      <img
        className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition-all ease-out duration-200"
        src={img}
        alt="story"
      />
      <p className="text-sm w-14 truncate">{username}</p>
    </div>
  );
}

export default Story;
