import { useState } from "react";

export default function FollowButton() {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleClick = () => {
    setIsFollowing((prevIsFollowing) =>!prevIsFollowing);
  };

  return (
    <button
      className={`bg-white text-black rounded-3xl w-20 text-sm font-bold h-8 hover:bg-gray-200 ${
        isFollowing ? "following" : ""
      }`}
      onClick={handleClick}>
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}
