import { db } from "@/firebase";
import { McLaren } from "@next/font/google";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import Tweet from "./Tweet";
import TweetInput from "./TweetInput";

export default function PostFeed() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTweets(snapshot.docs);
    });
    return unsubscribe;
  }, []);

  return (
    <div
      className="sm:ml-16 xl:ml-[350px] max-w-2xl flex-grow
      border-gray-300 border-x
      ">
      <div
        className="px-3 py-2 text-lg sm:text-xl font-bold
          border-b border-gray-300 sticky top-0 z-50 bg-blur
          ">
        Home
      </div>
      <TweetInput />

      {tweets.map((tweet) => {
        return <Tweet key={tweet.id} id={tweet.id} data={tweet.data()} />;
      })}

      <Tweet />
    </div>
  );
}
