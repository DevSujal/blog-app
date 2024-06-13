import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.service";
import { logout } from "../../features/authSlice";

function LogoutButton() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;
