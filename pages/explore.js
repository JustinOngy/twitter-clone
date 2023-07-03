import BottomBanner from "@/components/BottomBanner";
import ExploreSection from "@/components/ExploreSection";
import CommentModal from "@/components/modals/CommentModal";
import PostFeed from "@/components/Postfeed";
import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import React from "react";
import { useSelector } from "react-redux";

const explore = () => {
  const username = useSelector((state) => state.user.username);
  console.log(username);
  return (
    <div>
      <div className=" min-h-screen  max-w-[1400px] mx-auto flex">
        <Sidebar />
        <ExploreSection />
        <Trending />
      </div>
      <CommentModal />
      {!username && <BottomBanner />}
    </div>
  );
};

export default explore;
