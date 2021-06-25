import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { Home, Room } from "../pages";

const Routes = ({ socket }) => {
  // const { roomId } = useParams();
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home socket={socket} />
        </Route>
        <Route path="/room/:roomId">
          <Room socket={socket} />
        </Route>
      </Switch>
    </Router>
  );
};
export default Routes;
