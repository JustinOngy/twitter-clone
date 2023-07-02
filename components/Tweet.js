import { openCommentModal, setCommentTweet } from "@/redux/modalSlice";
import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";

export default function Tweet({ data, id }) {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div
      className="border-b border-gray-300 cursor-pointer"
      onClick={() => router.push("/" + id)}>
      <TweetHeader
        username={data?.username}
        name={data?.name}
        timestamp={data?.timestamp?.toDate()}
        text={data?.tweet}
        photoUrl={data?.photoUrl}
      />
      <div className="p-3 ml-16 text-gray-500 flex space-x-14">
        <div
          onClick={(e) => {
            e.stopPropagation();
            dispatch(
              setCommentTweet({
                id: id,
                tweet: data?.tweet,
                photoUrl: data?.photoUrl,
                name: data?.name,
                username: data?.username,
              })
            );

            dispatch(openCommentModal());
          }}>
          <ChatIcon className="w-5 cursor-pointer hover:text-green-400 " />
        </div>

        <HeartIcon className="w-5 cursor-pointer hover:text-pink-400 " />

        <ChartBarIcon className="w-5 cursor-pointer hover:text-blue-400 " />

        <UploadIcon className="w-5 cursor-pointer hover:text-blue-400 " />
      </div>
    </div>
  );
}

export function TweetHeader({ username, name, timestamp, text, photoUrl }) {
  return (
    <div className="flex space-x-3 p-3  border-gray-700">
      <img className="w-11 h-11 rounded-full object-cover" src={photoUrl} />
      <div>
        <div className="text-gray-500 flex items-center space-x-2 mb-1">
          <h1 className="text-gray-700   font-bold">{name}</h1>
          <span>@{username}</span>
          <div className="w-1 h-1 rounded-full bg-gray-500"></div>
          <Moment fromNow>{timestamp}</Moment>
        </div>
        <span>{text}</span>
      </div>
    </div>
  );
}
