import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import {
  closeSignupModal,
  openSignupModal,
  openLoginModal,
} from "@/redux/modalSlice";
import TwitterIcon from "@material-ui/icons/Twitter";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";



export default function SignupModal() {
  const isOpen = useSelector((state) => state.modals.signupModalOpen);
  const dispatch = useDispatch();

  const handleLoginButtonClick = () => {
    dispatch(closeSignupModal()); // Close the login modal
    dispatch(openLoginModal()); // Open the signup modal
  };

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
        <div className="w-[90%] flex justify-center h-[400px] bg-white md:w-[560px] md:h-[600px] rounded-lg">
          <div className="w-[90%] mt-8 flex items-center flex-col">
            <div className="mb-3 flex items-start	 ">
              <TwitterIcon className=" text-[#50b7f5]" />
            </div>

            <h1 className="text-center mt-4 font-bold text-4xl">
              Create your account
            </h1>
            <input
              placeholder="Full Name"
              className="bg-gray-200 h-10 mt-8  w-[50%] rounded-md bg-transparent border border-gray-300 p-6 "
              type={"text"}
            />
            <input
              placeholder="Email"
              className="bg-gray-200 h-10 mt-8 w-[50%] rounded-md bg-transparent border border-gray-300 p-6"
              type={"email"}
            />
            <input
              placeholder="Password"
              className="bg-gray-200 h-10 mt-8  w-[50%] rounded-md bg-transparent border border-gray-300 p-6"
              type={"password"}
            />
            <button className="bg-black text-white w-[50%] font-bold text-lg p-2 rounded-3xl mt-8">
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
