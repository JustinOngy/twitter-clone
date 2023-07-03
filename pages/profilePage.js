import BottomBanner from "@/components/BottomBanner";
import CommentModal from "@/components/modals/CommentModal";
import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import UserProfile from "@/components/UserProfile";
import React from "react";
import { useSelector } from "react-redux";

const profilepage = () => {

  return (
    <div>
      <div className=" min-h-screen  max-w-[1400px] mx-auto flex">
        <Sidebar />
        <UserProfile />
        <Trending />
      </div>
      <CommentModal />
    </div>
  );
};

export default profilepage;
