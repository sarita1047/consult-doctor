import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import "bootstrap/scss/bootstrap.scss";
import "./assets/styles/style.css";
import "./assets/styles/dashboard.css";
import withLayout from "./components/Layout";

const App = () => {
  return (
    <Switch>
      <Route component={(_) => withLayout(Dashboard)} path="/dashboard" />
      <Route component={Login} />
    </Switch>
  );
};

export default App;
