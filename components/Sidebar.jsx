import {
  HomeIcon,
  HashtagIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  BellIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import TwitterIcon from "@material-ui/icons/Twitter";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "@/redux/userSlice";
import { closeLoginModal, closeSignupModal } from "@/redux/modalSlice";
import Link from "next/link";

export default function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  async function handleSignOut() {
    await signOut(auth);
    dispatch(signOutUser());
    dispatch(closeSignupModal());
    dispatch(closeLoginModal());
  }

  return (
    <div className="h-full hidden sm:flex flex-col fixed xl:ml-24">
      <nav className="h-full relative xl:space-y-1.5">
        <div className="flex justify-center xl:justify-start items-center py-3 xl:p-3">
          <TwitterIcon className=" text-[#50b7f5]" />
        </div>
        <Link href="/">
          <SidebarLink Icon={HomeIcon} text={"Home"} />
        </Link>
        <Link href="/explore">
          <SidebarLink Icon={HashtagIcon} text={"Explore"} />
        </Link>
        <SidebarLink Icon={BellIcon} text={"Notifications"} />
        <SidebarLink Icon={InboxIcon} text={"Messages"} />
        <SidebarLink Icon={BookmarkIcon} text={"Bookmarks"} />
        <SidebarLink Icon={UserIcon} text={"Profile"} />
        <SidebarLink Icon={DotsCircleHorizontalIcon} text={"More"} />
        <button
          className="hidden xl:inline bg-[#50b7f5]
        rounded-full h-[52px] mt-2 w-[200px] text-lg text-white
        ">
          Tweet
        </button>
        <div
          className="bottom-0 hover:bg-gray-200 hover:bg-opactiy-10 cursor-pointer
         rounded-full absolute xl:p-3 flex justify-center items-center space-x-3"
          onClick={handleSignOut}>
          <img
            className="rounded-full w-10 h-10 object-cover"
            src={user.photoUrl || "/assets/twitter-dpp.png"}
            alt=""
          />
          <div className="hidden xl:inline">
            <h1 className=" font-bold whitespace-nowrap">{user.name}</h1>
            <h1 className="text-gray-500">
              @{user.username || " User is Signed Out"}
            </h1>
          </div>
          <DotsHorizontalIcon className="h-5 text-gray-700 hidden xl:inline" />
        </div>
      </nav>
    </div>
  );
}

function SidebarLink({ text, Icon }) {
  return (
    <li className="hoverAnimation flex mb-3 xl:justify-start justify-center items-center text-xl space-x-3">
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </li>
  );
}
