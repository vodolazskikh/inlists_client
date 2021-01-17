import React, { FC, memo, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Main } from "screens/main";
import { Profile } from "screens/profile";
import { getTooltip } from "state/selectors/tooltip";
import { getPopup } from "state/selectors/popup";
import { Popup } from "components/popup";
import { Tooltip } from "components/tooltip";
import { useSelector } from "react-redux";
import { apiUrl } from "config";

export const App: FC = memo(() => {
  const popupInState = useSelector(getPopup);
  const toolipInState = useSelector(getTooltip);

  useEffect(() => {
    const redirectedFromAuth = window.location.href.includes("authme");
    if (redirectedFromAuth) {
      const code = window.location.href.split("code=")[1];
      fetch(`${apiUrl}token?code=${code}`)
        .then((data) => data.json())
        .then((tokenAndUserId) => {
          if (tokenAndUserId.access_token && tokenAndUserId.user_id) {
            localStorage.setItem("vk_token", tokenAndUserId.access_token);
            localStorage.setItem("vk_user_id", tokenAndUserId.user_id);
            window.location.href = "/";
          }
        });
    }
  }, []);

  return (
    <BrowserRouter>
      {toolipInState?.id && <Tooltip type={toolipInState.type} />}
      <Switch>
        <Route path="/me">
          <Profile />
        </Route>
        <Route exact path="*">
          <Main />
        </Route>
      </Switch>
      {popupInState?.id && (
        <Popup type={popupInState.type} item={popupInState.item} />
      )}
    </BrowserRouter>
  );
});
