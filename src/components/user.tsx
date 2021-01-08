import React, { FC, memo, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openPopup } from "state/actions/popup";
import { generateUuid } from "utils/generateUuid";
import { features, vkAuth } from "config";
import { AppState } from "types/state";
import { getUserInfo } from "state/actions/user";
import { Loading } from "svg/loading";
import classNames from "classnames";

interface Props {
  isInUserProfile?: boolean;
}

export const User: FC<Props> = memo(({ isInUserProfile }) => {
  const token = localStorage.getItem("vk_token");
  const userId = localStorage.getItem("vk_user_id");
  const user = useSelector((state: AppState) => state.user.userInfo);
  const dispatch = useDispatch();

  const authMe = useCallback(() => {
    if (!user.data?.id) {
      window.location.href = `${vkAuth.url}authorize?client_id=${vkAuth.client_id}&redirect_uri=${vkAuth.redirect_uri}`;
    }
  }, [user.data?.id]);

  const onAddNewClick = () => {
    dispatch(openPopup({ type: "addNew", id: generateUuid() }));
  };

  useEffect(() => {
    if (!userId || !token || !!user.data?.id) {
      return;
    }
    dispatch(getUserInfo({ token, userId }));
  }, [userId, token, user.data?.id, dispatch]);

  const avatar = useMemo(() => {
    if (user.meta.loading) {
      return (
        <div className="w-64 h-64">
          <Loading />
        </div>
      );
    }

    return (
      <img
        className="rounded-full h-64 w-64 flex items-center justify-center transform hover:scale-105 transition-transform cursor-pointer"
        src={
          user.data
            ? user.data?.photo_100
            : "https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg"
        }
        style={{ objectFit: "cover" }}
        alt="avatar"
        onClick={authMe}
      />
    );
  }, [user, authMe]);

  return (
    <div>
      {isInUserProfile || !user.data ? avatar : <Link to="/me">{avatar}</Link>}
      <div
        className={classNames("absolute mt-4", {
          // @todo выпилить после релиза фичи с эспешиал-рубриками
          "top-4 right-68": !features.especial,
          "top-64": features.especial,
        })}
      >
        {features.especial && (
          <button className="absolute right-48 bottom-32 focus:outline-none text-xl flex ml-8 text-xl text-white bg-red-400 rounded-full h-32 w-32 flex items-center justify-center transform hover:scale-105 transition-transform cursor-pointer">
            🎄
          </button>
        )}

        <button
          className="focus:outline-none text-2xl flex ml-8 text-xl text-white bg-blue-400 rounded-full h-48 w-48 flex items-center justify-center transform hover:scale-105 transition-transform cursor-pointer"
          onClick={onAddNewClick}
        >
          +
        </button>
      </div>
    </div>
  );
});
