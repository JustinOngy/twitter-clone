import { db, storage } from "@/firebase";
import { openLoginModal } from "@/redux/modalSlice";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TweetInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const filePickerRef = useRef(null);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  async function sendTweet() {
    if (!user.username) {
      dispatch(openLoginModal());
    }
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      uid: user.uid,
      timestamp: serverTimestamp(),
      likes: [],
      tweet: text,
    });

    if (image) {
      const imageRef = ref(storage, `tweetImages/${docRef.id}`);
      const uploadImage = await uploadString(imageRef, image, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadURL,
      });
    }
    setText("");
    setImage(null);
    setLoading(false);
  }

  function addImagetoTweet(e) {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.addEventListener("load", (e) => {
      setImage(e.target.result);
    });
  }

  return (
    <div className="flex space-x-3 p-3 border-b border-gray-300">
      <img
        className="w-11 h-11 rounded-full object-cover"
        src={user.photoUrl || "/assets/twitter-dpp.png"}
      />
      {!loading && (
        <div className="w-full">
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="What's on your mind?"
            className="bg-transparent resize-none outline-none w-full min-h-[50px] text-lg"
          />

          {loading && <h1 className="text-black text-2xl ">Uploading</h1>}
          {image && (
            <div className="relative mb-5">
              <div
                className="absolute text-white top-1 left-1 bg-[#272c26] rounded-full w-8 h-8 flex justify-center 
            items-center cursor-pointer hover:bg-gray-300 hover:text-gray-500 hover:border">
                <XIcon className="h-5" onClick={() => setImage(null)} />
              </div>
              <img
                src={image}
                className="rounded-2xl max-h-80 object-contain "
              />
            </div>
          )}
          <div className="flex justify-between border-t border-gray-300 pt-4">
            <div className="flex space-x-0">
              <div
                className="iconsAnimation"
                onClick={() => filePickerRef.current.click()}>
                <PhotographIcon className="h-[22px] text-[#50b7f5]" />
                <input
                  type="file"
                  className="hidden"
                  ref={filePickerRef}
                  onChange={addImagetoTweet}
                />
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
              onClick={sendTweet}
              disabled={!text && !image}
              className="bg-[#50b7f5] text-white rounded-full px-5 py-1.5 disabled:opacity-50   ">
              Tweet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TweetInput;
