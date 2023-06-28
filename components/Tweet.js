import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import React from "react";

export default function Tweet() {
  return (
    <div className="border-b border-gray-300">
      <TweetHeader />
      <div className="p-3 ml-16 text-gray-500 flex space-x-14">
        <ChatIcon className="w-5 cursor-pointer hover:text-green-400" />
        <HeartIcon className="w-5 cursor-pointer hover:text-pink-400" />
        <ChartBarIcon className="w-5 cursor-pointer hover:text-blue-400" />
        <UploadIcon className="w-5 cursor-pointer hover:text-blue-400" />
      </div>
    </div>
  );
}

export function TweetHeader() {
  return (
    <div className="flex space-x-3 p-3  border-gray-700">
      <img
        className="w-11 h-11 rounded-full object-cover"
        src="/assets/kylie.png"
      />
      <div>
        <div className="text-gray-500 flex items-center space-x-2 mb-1">
          <span>@kylie</span>
          <div className="w-1 h-1 rounded-full bg-gray-500"></div>
          <span>2 hours ago</span>
        </div>
        <span>text</span>
      </div>
    </div>
  );
}
