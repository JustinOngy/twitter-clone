import {
  BadgeCheckIcon,
  DotsHorizontalIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import React from "react";
import FollowButton from "./FollowButton";
import TrendingItem from "./TrendingItem";

const Trending = () => {
  return (
    <div className=" hidden lg:flex ml-7 mt-4 flex-col">
      <div className="flex space-x-3 bg-gray-100 w-[300px] h-[44px] p-3 rounded-3xl ">
        <SearchIcon className="w-6 text-gray-600" />
        <input
          placeholder="Search Twitter"
          className=" bg-transparent focus:outline-none bg-gray-100  placeholder:text-gray-600"
        />
      </div>
      <div className="w-[300px] h-[500px] bg-gray-700 bg-opacity-5 rounded-3xl mt-3">
        <h1 className="font-bold text-xl p-3">What's happening</h1>
        <TrendingItem
          title="Wimbledon"
          tweets="360K"
          subtitle="Trending in Australia"
        />
        <TrendingItem
          title="AR/VR Glasses Design"
          tweets="623K"
          subtitle="Apple"
        />
        <TrendingItem
          title="Spider-Man Across the Spider-Verse"
          tweets="520K"
          subtitle="Movies"
        />
        <TrendingItem title="Tesla" tweets="246K" subtitle="Trending in US" />
        <TrendingItem title="Taylor Swift" tweets="740K" subtitle="Concerts" />
      </div>
      <div className="w-[300px] h-[300px] bg-gray-700 bg-opacity-5 rounded-3xl mt-3">
        <h1 className="font-bold text-xl p-3">Who to follow</h1>
        <div className="flex justify-between p-3">
          <div className="flex space-x-3 ">
            <img
              className="w-11 h-11 object-cover rounded-full"
              src="/assets/elon.png"
            />
            <div>
              <div className="flex space-x-1 ">
                <h1 className="font-bold">Elon Musk</h1>
                <BadgeCheckIcon className="w-[18px] text-[#50b7f5]" />
              </div>
              <h1 className="text-gray-500 mt-1 text-[12px]">@elonmusk</h1>
            </div>
          </div>
          <FollowButton />
        </div>
        <div className="flex justify-between p-3">
          <div className="flex space-x-3 ">
            <img
              className="w-11 h-11 object-cover rounded-full"
              src="/assets/kylie.png"
            />
            <div>
              <div className="flex space-x-1 ">
                <h1 className="font-bold">Kylie Jenner</h1>
                <BadgeCheckIcon className="w-[18px] text-[#50b7f5]" />
              </div>
              <h1 className="text-gray-500 mt-1 text-[12px]">@kylie</h1>
            </div>
          </div>
          <FollowButton />
        </div>
        <div className="flex justify-between p-3">
          <div className="flex space-x-3 ">
            <img
              className="w-11 h-11 object-cover rounded-full"
              src="/assets/me.jpg"
            />

            <div>
              <div className="flex space-x-1 ">
                <h1 className="font-bold">Justin Ong</h1>
                <BadgeCheckIcon className="w-[18px] text-[#50b7f5]" />
              </div>
              <h1 className="text-gray-500 mt-1 text-[12px]">@justinong</h1>
            </div>
          </div>
          <FollowButton />
        </div>
      </div>
    </div>
  );
};

export default Trending;
