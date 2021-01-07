import React, { FC, memo } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Main } from "screens/main";
import { Profile } from "screens/profile";
import { getPopup } from "state/selectors/popup";
import { Popup } from "components/popup";
import { useSelector } from "react-redux";

export const App: FC = memo(() => {
  const popupInState = useSelector(getPopup);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/me">
          <Profile />
        </Route>
      </Switch>
      {popupInState?.id && (
        <Popup type={popupInState.type} item={popupInState.item} />
      )}
    </BrowserRouter>
  );
});
