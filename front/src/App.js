import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Views/Login";
import Register from "./Views/Register";
import NotFound from "./Views/NotFound";
import Admin from "./Views/Admin";
import Home from "./Views/Home";
import withAuth from "../src/Components/WithAuth";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={withAuth(Admin)} />
          <Route exact path="/register" component={Register} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
