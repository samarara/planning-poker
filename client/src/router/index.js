import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Home, Room } from "../pages";
// import Player from "../pages/player";

const Routes = ({ socket, isModerator, setIsModerator }) => {
  return (
    <Router>
      <Switch>
        <Route path="/room/:roomId">
          <Room socket={socket} />
        </Route>
        <Route path="/">
          <Home socket={socket} setIsModerator={setIsModerator} />
        </Route>
        {/* <Route>
          <Player socket={socket} isModerator={isModerator} />
        </Route> */}
      </Switch>
    </Router>
  );
};
export default Routes;
