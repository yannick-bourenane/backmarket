import React from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import { RouteWithLayout } from "./back-office/components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./back-office/layouts";
import Login from "./Views/Login";
import Register from "./Views/Register";
import Admin from "./back-office/Views/Admin";
import Home from "./Views/Home";
import withAuth from "./components/WithAuth";
import "./styles/App.css";
import ProductAdd from "./back-office/Views/ProductList/components/ProductAdd";
import ProductEdit from "./back-office/Views/ProductList/components/ProductEdit";
import ModifyUser from "./back-office/Views/UserList/components/ModifyUser"

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  OrderList as OrderListView,
  UserList as UserListView,
  Account as AccountView,
  Settings as SettingsView,
  NotFound as NotFoundView,
} from "./back-office/Views";

const Routes = () => {
  const adminPath = "/admin";
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
          component={ModifyUser}
          exact
          layout={MainLayout}
          path={adminPath + "/users/:id"}
        />
        <RouteWithLayout
          component={ProductListView}
          exact
          layout={MainLayout}
          path={adminPath + "/products"}
        />
        <RouteWithLayout
          component={ProductAdd}
          exact
          layout={MainLayout}
          path={adminPath + "/products/add"}
        />
        <RouteWithLayout
          component={ProductEdit}
          exact
          layout={MainLayout}
          path={adminPath + "/products/edit/:id"}
        />
        <RouteWithLayout
          component={OrderListView}
          exact
          layout={MainLayout}
          path={adminPath + "/orders"}
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
