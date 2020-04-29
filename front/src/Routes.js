import React from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import { RouteWithLayout } from "./components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";
import Login from "./Views/Login";
import Register from "./Views/Register";
import Admin from "./Views/Admin";
import Home from "./Views/Home";
import withAuth from "./components/WithAuth";
import "./styles/App.css";

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Account as AccountView,
  Settings as SettingsView,
  NotFound as NotFoundView,
} from "./Views";

const Routes = () => {
  const adminPath = "/admin"
  return (
    <BrowserRouter>
      <Switch>
        {/* <Redirect exact from="/" to="/admin" /> */}
        <RouteWithLayout
          component={DashboardView}
          exact
          layout={MainLayout}
          path={adminPath}
        />
        <RouteWithLayout
          component={UserListView}
          exact
          layout={MainLayout}
          path={adminPath + "/users"}
        />
        <RouteWithLayout
          component={ProductListView}
          exact
          layout={MainLayout}
          path={adminPath + "/products"}
        />
   
        <RouteWithLayout
          component={AccountView}
          exact
          layout={MainLayout}
          path={adminPath + "/account"}
        />
        <RouteWithLayout
          component={SettingsView}
          exact
          layout={MainLayout}
          path={adminPath + "/settings"}
        />
       
        <RouteWithLayout
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          path="/not-found"
        />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/admin" component={withAuth(Admin)} />
        <Route exact path="/register" component={Register} />

        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
