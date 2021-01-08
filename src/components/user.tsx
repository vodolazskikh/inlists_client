/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openPopup } from "state/actions/popup";
import { generateUuid } from "utils/generateUuid";
import { apiUrl, vkAuth } from "config";
import { AppState } from "types/state";
import { getUserInfo } from "state/actions/user";

interface Props {
  isInUserProfile?: boolean;
}

export const User: FC<Props> = memo(({ isInUserProfile }) => {
  const [token, setToken] = useState(localStorage.getItem("vk_token"));
  const [userId, setUserId] = useState(localStorage.getItem("vk_user_id"));
  const user = useSelector((state: AppState) => state.user.userInfo.data);
  const dispatch = useDispatch();

  const authMe = () => {
    if (!user)
      window.location.href = `${vkAuth.url}authorize?client_id=${vkAuth.client_id}&redirect_uri=${vkAuth.redirect_uri}`;
  };

  const onAddNewClick = () => {
    dispatch(openPopup({ type: "addNew", id: generateUuid() }));
  };

  useEffect(() => {
    const redirectedFromAuth = window.location.href.includes("authme");

    if (token && !redirectedFromAuth) {
      return;
    }

    if (redirectedFromAuth) {
      const code = window.location.href.split("code=")[1];
      fetch(`${apiUrl}token?code=${code}`)
        .then((data) => data.json())
        .then((tokenAndUserId) => {
          if (tokenAndUserId.access_token && tokenAndUserId.user_id) {
            setToken(tokenAndUserId.access_token);
            setUserId(tokenAndUserId.user_id);
            localStorage.setItem("vk_token", tokenAndUserId.access_token);
            localStorage.setItem("vk_user_id", tokenAndUserId.user_id);
          }
        });
    }
  }, [window.location.href]);

  useEffect(() => {
    if (!userId || !token || !!user) {
      return;
    }
    dispatch(getUserInfo({ token, userId }));
  }, [userId]);

  return (
    <div>
      {isInUserProfile ? (
        <img
          className="rounded-full h-64 w-64 flex items-center justify-center transform hover:scale-105 transition-transform cursor-pointer"
          src={
            user
              ? user?.photo_100
              : "https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg"
          }
          style={{ objectFit: "cover" }}
          alt="avatar"
          onClick={authMe}
        />
      ) : (
        <Link to="/me">
          <img
            className="rounded-full h-64 w-64 flex items-center justify-center transform hover:scale-105 transition-transform cursor-pointer"
            src={
              user
                ? user?.photo_100
                : "https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg"
            }
            style={{ objectFit: "cover" }}
            alt="avatar"
            onClick={authMe}
          />
        </Link>
      )}
      <div className="absolute top-64 mt-4">
        <button
          className="absolute right-48 bottom-32 focus:outline-none text-xl flex ml-8 text-xl text-white bg-blue-400 rounded-full h-32 w-32 flex items-center justify-center transform hover:scale-105 transition-transform cursor-pointer"
          onClick={onAddNewClick}
        >
          +
        </button>
        <button className="focus:outline-none text-2xl flex ml-8 text-xl text-white bg-red-400 rounded-full h-48 w-48 flex items-center justify-center transform hover:scale-105 transition-transform cursor-pointer">
          🎄
        </button>
      </div>
    </div>
  );
});
