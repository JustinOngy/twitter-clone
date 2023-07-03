import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import Tweet from "@/components/Tweet";
import { db } from "@/firebase";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { doc, getDoc } from "firebase/firestore";
import Moment from "react-moment";
import Link from "next/link";
import { useSelector } from "react-redux";

export async function getServerSideProps(context) {
  const id = context.query.id;
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const formattedData = {
    username: data.username,
    name: data.name,
    photoUrl: data.photoUrl,
    text: data.tweet,
    comments: data.comments || null,
    timestamp: JSON.stringify(data.timestamp.toDate()),
    image: data.image || null,
  };

  return {
    props: {
      tweetData: formattedData,
    },
  };
}

export default function CommentsPage({ tweetData }) {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <div className=" min-h-screen  max-w-[1400px] mx-auto flex">
        <Sidebar />
        <div
          className="sm:ml-16 xl:ml-[350px] max-w-2xl flex-grow
      border-gray-300 border-x
      ">
          <div
            className="px-3 py-2 text-lg sm:text-xl font-bold
          border-b border-gray-300 sticky top-0 z-50 flex space-x-2 items-center
          ">
            <Link href={"/"}>
              <ArrowLeftIcon className="w-[15px] h-[15px]" />
            </Link>
            <h1>Tweet</h1>
          </div>
          <div className="border-b border-gray-300">
            <div className="flex space-x-3 p-3  border-gray-700">
              <img
                className="w-11 h-11 rounded-full object-cover"
                src={tweetData.photoUrl}
              />
              <div>
                <div className="text-gray-500 flex items-center space-x-2 mb-1">
                  <h1 className="text-gray-700   font-bold">
                    {tweetData.name}
                  </h1>
                  <span>@{tweetData.username}</span>
                  <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                  <Moment fromNow>{JSON.parse(tweetData.timestamp)}</Moment>
                </div>
                <span className="text-2xl">{tweetData.text}</span>
                {tweetData.image && <img src={tweetData.image} />}
              </div>
            </div>
          </div>
          <div
            className="flex justify-between items-center
           border-b border-gray-300 p-2">
            <div className="flex space-x-3 p-3  border-gray-700">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={user.photoUrl || "/assets/twitter-dpp.png"}
              />
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Tweet your reply"
                  className="text-2xl outline-none"
                />
              </div>
            </div>
            <button
              disabled={true}
              // onClick={sendComments}
              className="bg-[#50b7f5] text-white rounded-full px-5 py-2.5 disabled:opacity-50
              ">
              Tweet
            </button>
          </div>

          {tweetData.comments?.map((comment) => (
            <div className="border-b border-gray-300">
              <div className="flex space-x-3 p-3  border-gray-700">
                <img
                  className="w-11 h-11 rounded-full object-cover"
                  src={comment.photoUrl || "/assets/twitter-dpp.png"}
                />
                <div>
                  <div className="text-gray-500 flex items-center space-x-2 mb-1">
                    <h1 className="text-gray-700   font-bold">
                      {comment.name}
                    </h1>
                    <span>@{comment.username}</span>
                    <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                  </div>
                  <span className="text-lg">{comment.comment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Trending />
      </div>
    </div>
  );
}
