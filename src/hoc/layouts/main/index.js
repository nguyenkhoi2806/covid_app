import React from "react";
import "./index.scss";

const Layout = (props) => {
  return <div className="container pt-3" >{props.children}</div>;
};

export default Layout
