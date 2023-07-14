import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  closeSignupModal,
  openSignupModal,
  openLoginModal,
} from "@/redux/modalSlice";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase";
import { current } from "@reduxjs/toolkit";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/router";

export default function SignupModal() {
  const isOpen = useSelector((state) => state.modals.signupModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("initialState");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleSignUp() {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: `./assets/profilePictures/pfp${Math.ceil(
          Math.random() * 6
        )}.png`,
      });
      router.reload();
    } catch (error) {
      // Handle specific error cases and display appropriate alerts
      switch (error.code) {
        case "auth/invalid-email":
          alert("Invalid email address.");
          break;
        case "auth/weak-password":
          alert("The password is too weak. Please choose a stronger password.");
          break;
        case "auth/email-already-in-use":
          alert("The email address is already in use by another account.");
          break;
        default:
          alert("An error occurred. Please try again later.");
          break;
      }
    }
  }

  const handleLoginButtonClick = () => {
    dispatch(closeSignupModal()); // Close the login modal
    dispatch(openLoginModal()); // Open the signup modal
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      console.log(currentUser);

      dispatch(
        setUser({
          username: currentUser.email.split("@")[0],
          name: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
          photoUrl: currentUser.photoURL,
        })
      );
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <button
        className="bg-white border border-white text-black w-[160px] rounded-full h-[40px] hover:bg-[#cbd2d7] hover:border-[#cbd2d7]"
        onClick={() => dispatch(openSignupModal())}>
        Sign Up
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignupModal())}
        className="flex justify-center items-center">
        <div className="w-[90%] flex justify-center h-[550px] bg-white md:w-[560px] md:h-[600px] rounded-lg">
          <div className="w-[90%] mt-8 flex items-center flex-col">
            <div className="mb-3 flex items-start w-[30px]	 ">
              <img src="/assets/twitterbird.png" />
            </div>

            <h1 className="text-center mt-4 font-bold text-4xl">
              Create your account
            </h1>
            <input
              placeholder="Full Name"
              className="bg-gray-200 h-10 mt-8  w-[50%] rounded-md bg-transparent border border-gray-300 p-6 "
              type={"text"}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Email"
              className="bg-gray-200 h-10 mt-8 w-[50%] rounded-md bg-transparent border border-gray-300 p-6"
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="bg-gray-200 h-10 mt-8  w-[50%] rounded-md bg-transparent border border-gray-300 p-6"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-black text-white w-[50%] font-bold text-lg p-2 rounded-3xl mt-8
            "
              onClick={handleSignUp}>
              Create account
            </button>
            <div className="flex items-center">
              <h2 className="mt-12 text-gray-500">Have an account already?</h2>
              <button
                onClick={handleLoginButtonClick}
                className="text-[#50b7f5] cursor-pointer items-center pt-12 pl-2">
                Log in
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
