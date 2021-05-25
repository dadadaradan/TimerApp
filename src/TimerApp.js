import React from "react";
import useToggleBoolean from "./hooks/useToggleBoolean";
import Navbar from "./Navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import Timer from "./Timer";
import About from "./About";
import Settings from "./Settings";
import Page from "./Page";

function TimerApp(props) {
  const [isDarkMode, toggleIsDarkMode] = useToggleBoolean(false);

  return (
    <div>
      <Page isDarkMode={isDarkMode}>
        <Navbar isDarkMode={isDarkMode} />
        <Switch>
          <Route exact path="/">
            <Timer isDarkMode={isDarkMode} />
          </Route>
          <Route exact path="/settings">
            <Settings
              isDarkMode={isDarkMode}
              toggleIsDarkMode={toggleIsDarkMode}
            />
          </Route>
          <Route exact path="/about">
            <About isDarkMode={isDarkMode} />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Page>
    </div>
  );
}

export default TimerApp;
