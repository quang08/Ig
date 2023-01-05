import {
  collection,
  doc,
  getDocs,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  addDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Post from "../../components/Post";
import { db } from "../../firebase";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import Moment from "react-moment";
import Header from "../../components/Header";

function Comments({ id }) {
  const { data: session } = useSession();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  //get specific post
  const getPost = async () => {
    const docRef = doc(db, "posts", id);
    const docu = await getDoc(docRef);
    setPost(docu.data());
  };

  //Comment functionality
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

  useEffect(() => {
    getPost();
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
  //console.log(comments);

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
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 max-w-xl md:max-w-6xl mx-auto my-auto">
        <div className="bg-white border my-7 rounded-xl grid md:grid-cols-2">
          <div className="col-span-1">
            {/* img */}
            <img
              src={post.image}
              className="w-full object-cover rounded-t-lg md:rounded-tl-lg md:rounded-tr-none"
            />
            <div>
              {session && likes.length > 1 && (
                <p className="font-bold mb-1 ml-5 mt-3 text-xl">
                  {likes.length} likes
                </p>
              )}
              {session && likes.length === 1 && (
                <p className="font-bold mb-1 ml-5 mt-3 text-xl">
                  {likes.length} like
                </p>
              )}
              <Moment
                className="text-gray-400 text-xs pl-5 pr-5 uppercase"
                fromNow
              >
                {post.timestamp?.toDate()}
              </Moment>
            </div>
          </div>

          <div className="col-span-1">
            <div className="flex items-center p-3">
              <img
                className="rounded-full w-12 h-12 md:w-14 md:h-14 border p-1 mr-3 object-cover"
                src={post.profileImg}
                alt="profile pic"
              />
              <p className="flex-1 font-bold text-xl">{post.username}</p>
              {/* Flex-1: takes as much room left */}
              <DotsHorizontalIcon className="h-5" />
            </div>

            {/* Caption */}
            <div className="p-3 truncate text-lg flex items-center">
              <img
                className="rounded-full w-12 h-12 md:w-14 md:h-14 border p-1 mr-3 object-cover"
                src={post.profileImg}
                alt="profile pic"
              />
              <span className="font-bold mr-1 text-lg">{post.username} </span>
              {post.caption}
            </div>

            {(session && comments.length > 0) > 0 && (
              <div className="p-4 text-lg h-[665px] overflow-y-scroll">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-center space-x-2 mb-3"
                  >
                    <img
                      className="h-12 rounded-full"
                      src={comment.data().userImage}
                      alt="comment profile pic"
                    />
                    <p className="text-md flex-1">
                      <span className="font-bold mr-2 ml-2">
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
          </div>

          {/* Buttons */}
          {session && (
            <div className="flex justify-between p-4 pt-4 items-center w-full col-span-1">
              <div className="flex items-center space-x-4">
                {hasLiked ? (
                  <HeartIconFilled
                    onClick={likePost}
                    className="btn h-10 text-red-500"
                  />
                ) : (
                  <HeartIcon onClick={likePost} className="btn h-10" />
                )}
                <ChatIcon className="btn h-10" />
                <PaperAirplaneIcon className="btn rotate-45 h-10" />
              </div>

              <div>
                <BookmarkIcon className="btn h-10" />
              </div>
            </div>
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
      </div>
    </>
  );
}

export default Comments;

export async function getServerSideProps(context) {
  const id = context.query.id;
  return {
    props: {
      id,
    },
  };
}
