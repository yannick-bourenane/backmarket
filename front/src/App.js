import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import HomeIsLoggedIn from "./HomeIsLoggedIn";
import withAuth from "../src/Components/WithAuth";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/admin" component={withAuth(HomeIsLoggedIn)} />
          <Route exact path="/register" component={Register} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
