import React, { useState } from "react";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeCommentModal } from "@/redux/modalSlice";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Router, useRouter } from "next/router";

export default function CommentModal() {
  const isOpen = useSelector((state) => state.modals.commentModalOpen);
  const userImg = useSelector((state) => state.user.photoUrl);
  const tweetDetails = useSelector((state) => state.modals.commentTweetDetails);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const router = useRouter();
  async function sendComment() {
    const docRef = doc(db, "posts", tweetDetails.id);
    const commentDetails = {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      comment: comment,
    };

    await updateDoc(docRef, {
      comments: arrayUnion(commentDetails),
    });

    dispatch(closeCommentModal());
    router.push("/" + tweetDetails.id);
  }

  return (
    <>
      <Modal
        className="flex justify-center items-center "
        open={isOpen}
        onClose={() => dispatch(closeCommentModal())}>
        <div
          className="w-full h-full relative bg-white border border-gray-500 outline-none
         rounded-xl sm:w-[600px] sm:h-[386px] sm:p-10 p-4">
          <div className="absolute w-[2px] h-[50px] bg-gray-200 ml-6 mt-[80px]"></div>
          <div className="absolute top-4">
            <XIcon
              onClick={() => dispatch(closeCommentModal())}
              className="w-6 cursor-pointer"
            />
          </div>
          <div className="mt-8">
            <div className="flex space-x-3">
              <img
                src={tweetDetails.photoUrl}
                className="rounded-full w-12 h-12 object-cover"
              />
              <div>
                <div className="flex space-x-1.5">
                  <h1 className="font-bold">{tweetDetails.name}</h1>
                  <h1 className="text-gray-500">@{tweetDetails.username}</h1>
                </div>
                <p className="mt-1">{tweetDetails.tweet}</p>
                <h1 className="text-gray-500 mt-2">
                  Replying to
                  <span className="text-[#1b9bf0]">
                    {" "}
                    @{tweetDetails.username}
                  </span>
                </h1>
              </div>
            </div>
          </div>
          <div className="mt-11">
            <div className="flex space-x-3">
              <img
                src={userImg}
                className="rounded-full w-12 h-12 object-cover"
              />
              <div className="w-full relative">
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full  resize-none outline-none"
                  placeholder="Tweet your reply"
                />

                <div className="flex pt-4 justify-between border-t">
                  <div className="flex space-x-0  ">
                    <div className="iconsAnimation">
                      <PhotographIcon className="h-[22px] text-[#50b7f5]" />
                    </div>
                    <div className="iconsAnimation">
                      <ChartBarIcon className="h-[22px] text-[#50b7f5]" />
                    </div>
                    <div className="iconsAnimation">
                      <EmojiHappyIcon className="h-[22px] text-[#50b7f5]" />
                    </div>
                    <div className="iconsAnimation">
                      <CalendarIcon className="h-[22px] text-[#50b7f5]" />
                    </div>
                    <div className="iconsAnimation">
                      <LocationMarkerIcon className="h-[22px] text-[#50b7f5]" />
                    </div>
                  </div>
                  <button
                    disabled={!comment}
                    onClick={sendComment}
                    className="bg-[#50b7f5] text-white rounded-full px-5 py-1.5 disabled:opacity-50  ">
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
