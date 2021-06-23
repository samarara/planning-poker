import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Room } from "../pages";
const Routes = ({ socket }) => (
  <Router>
    <Switch>
      <Route path="/room">
        <Room socket={socket} />
      </Route>
      <Route path="/">
        <Home socket={socket} />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
