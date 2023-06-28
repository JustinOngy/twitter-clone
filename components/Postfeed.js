import { McLaren } from "@next/font/google";
import { useEffect, useState } from "react";
import Tweet from "./Tweet";
import TweetInput from "./TweetInput";

export default function PostFeed() {
  return (
    <div
      className="sm:ml-16 xl:ml-[350px] max-w-2xl flex-grow
      border-gray-300 border-x
      ">
      <div
        className="px-3 py-2 text-lg sm:text-xl font-bold
          border-b border-gray-300 sticky top-0 z-50
          ">
        Home
      </div>
      <TweetInput />
      <Tweet />
    </div>
  );
}
