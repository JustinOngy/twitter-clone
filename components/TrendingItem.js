import { DotsHorizontalIcon } from "@heroicons/react/solid";
import Link from "next/link";

const TrendingItem = ({ title, tweets, subtitle }) => {
  return (
    <Link href="/explore">
      <div className="p-3 relative hover:bg-gray-200 cursor-pointer">
        <DotsHorizontalIcon className="w-5 text-gray-500 absolute right-4" />
        <p className="text-xs text-gray-500">{subtitle}</p>
        <h1 className="text-[15px] font-bold">{title}</h1>
        <p className="text-xs text-gray-500">{tweets} Tweets</p>
      </div>
    </Link>
  );
};

export default TrendingItem;
