import React, { useState } from "react";
import { Modal } from "@mui/material";
import {
  closeLoginModal,
  openLoginModal,
  openSignupModal,
} from "@/redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import TwitterIcon from "@material-ui/icons/Twitter";
import CloseIcon from "@mui/icons-material/Close";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export default function LoginModal() {
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // Handle specific error cases and display appropriate alerts
      switch (error.code) {
        case "auth/user-not-found":
          alert("User not found. Please check your credentials.");
          break;
        case "auth/wrong-password":
          alert("Invalid password. Please check your credentials.");
          break;
        default:
          alert("An error occurred. Please check email or password.");
          break;
      }
    }
  }

  const handleSignupButtonClick = () => {
    dispatch(closeLoginModal()); // Close the login modal
    dispatch(openSignupModal()); // Open the signup modal
  };

  return (
    <>
      <button
        onClick={() => dispatch(openLoginModal())}
        className="bg-transparent border border-white text-white w-[160px] rounded-full h-[40px] hover:bg-[#cbd2d7] hover:border-[#cbd2d7]">
        Log In
      </button>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="flex justify-center items-center">
        <div className="w-[90%] flex justify-center h-[400px] bg-white md:w-[560px] md:h-[600px] rounded-lg">
          <div className="w-[90%] mt-8 flex items-center flex-col">
            <div className="mb-3 flex items-start	 ">
              <TwitterIcon className=" text-[#50b7f5]" />
            </div>
            <h1 className="text-center mt-4 font-bold text-4xl">
              Sign in to Twitter
            </h1>
            <input
              placeholder="Phone, email or username"
              className="bg-gray-200 h-10 mt-8 rounded-xl w-[50%] bg-transparent border border-gray-300 p-6 "
              type={"text"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="bg-gray-200 h-10 mt-8 rounded-xl w-[50%] bg-transparent border border-gray-300 p-6"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleSignIn}
              className="bg-black text-white w-[50%] font-bold text-lg p-2 rounded-3xl   mt-8">
              Next
            </button>
            <button className="border border-gray-300 w-[50%] font-bold text-lg p-2 rounded-3xl mt-8">
              Forgot Password ?
            </button>

            <div className="flex items-center">
              <h2 className="mt-12 text-gray-500">Dont have an account?</h2>
              <button
                onClick={handleSignupButtonClick}
                className="text-[#50b7f5] cursor-pointer items-center pt-12 pl-2">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
