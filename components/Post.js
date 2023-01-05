import React, { use, useEffect, useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";
import { useRouter } from "next/router";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const router = useRouter();

  //********Likes**********
  //3. save likes in setLikes array
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  //2. everytime new like, set setHasliked to true/false
  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  //1. check if not liked, create a doc 'likes' and save username and uid
  //if liked, delete that doc to create that like/unlike action
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  //********Comments**********
  //2. update the comments array to populate comments
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [db, id]);

  //console.log(comments)

  //1. add comments to the backend
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment; //for snappier UX
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      //embed comments to posts collection
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white border my-7 rounded-lg">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          className="rounded-full w-12 h-12 border p-1 mr-3 object-cover"
          src={userImg}
          alt="profile pic"
        />
        <p className="flex-1 font-bold">{username}</p>
        {/* Flex-1: takes as much room left */}
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* img */}
      <img src={img} className="w-full object-cover" />

      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex items-center space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn rotate-45" />
          </div>

          <div>
            <BookmarkIcon className="btn" />
          </div>
        </div>
      )}

      {/* Caption and likes count */}
      <div className="p-5 truncate text-lg">
        {likes.length > 1 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        {likes.length === 1 && (
          <p className="font-bold mb-1">{likes.length} like</p>
        )}
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </div>

      {/* comments */}
      {(session && comments.length > 0) && (
        <div className="pl-3 pr-5 ml-5 h-20 overflow-y-scroll">
          {comments.slice(0, 2).map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={comment.data().userImage}
                alt="comment profile pic"
              />
              <p className="text-md flex-1">
                <span className="font-bold mr-2">
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>

              <Moment className="text-gray-400 text-sm" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {(session && comments.length > 3) && (
        <p
          onClick={() => router.push(`/p/${id}`)}
          className="text-gray-400 pl-3 pr-5 ml-5 cursor-pointer"
        >
          View all {comments.length} comments
        </p>
      )}

      {/* input box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            className="flex-1 border-none outline-none focus:ring-0"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
