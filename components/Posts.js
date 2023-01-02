import React from "react";
import Post from "./Post";
import ppf from "../public/3.png";

const posts = [
  {
    id: "123",
    username: "_nguyenthequang_",
    userImg: { ppf },
    img: { ppf },
    caption: "Hello World",
  },
  {
    id: "456",
    username: "_nguyenthequang_",
    userImg: { ppf },
    img: { ppf },
    caption: "Hello World",
  },
];

function Posts() {
  return (
    <div>
      {posts.map((post) => (
        <Post
            key={post.id}
            id={post.id}
            username={post.username}
            userImg={post.userImg}
            img={post.img}
            caption={post.caption}
        />
      ))}
    </div>
  );
}

export default Posts;
