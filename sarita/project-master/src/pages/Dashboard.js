import React, { useEffect } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import dp from "../assets/images/dp.svg";
import Doctor from "./Doctors";
import Hospital from "./Hospitals";
import Notice from "./Notice";

const Dashboard = () => {
  const history = useHistory();

  useEffect(() => {
    const isLoggedIn = (_) => {
      if (Boolean(window.localStorage.getItem("token"))) return true;
      return false;
    };
    if (!isLoggedIn()) {
      history.push("/");
    }
  }, []);

  return (
    <Switch>
      <Route component={Doctor} path="/dashboard/doctors" />
      <Route component={Hospital} path="/dashboard/hospitals" />
      <Route component={Notice} path="/dashboard/notice" />
      <Route
        render={(_) => (
          <img src={dp} style={{ width: "100%", height: 550 }} alt="dp" />
        )}
      />
    </Switch>
  );
};

export default Dashboard;

export const Navbar = ({}) => {
  const history = useHistory();
  const logout = (_) => {
    window.localStorage.removeItem("token");
    history.push("/");
  };
  return (
    <nav class="navbar bg-light">
      <div class="brand-title">Consult Doctor</div>
      <a href="#" class="toggle-button">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </a>
      <div class="navbar-links">
        <ul>
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/dashboard/doctors">Doctor</Link>
          </li>
          <li>
            <Link to="/dashboard/hospitals">Hospital</Link>
          </li>
          <li>
            <Link to="/dashboard/notice">Notice</Link>
          </li>
          
          <li>
            <Link to="#" onClick={logout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
