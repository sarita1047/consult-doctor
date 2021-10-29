import React from "react";
import { Navbar } from "../pages/Dashboard";

const withLayout = (Component) => (
  <>
    <Navbar />
    <Component />
  </>
);
export default withLayout;
