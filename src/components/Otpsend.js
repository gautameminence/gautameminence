import React from "react";
// import { Switch, Route } from "react-router-dom";
import CardContainer from "./CardContainer";
// import Login from "./Login";
// import Register from "./Register";
import Verification from "./Verification";

function LoginLayout(props) {
  const matchPath = props.match.path;
  //console.log("loginLayout rendered");
  return (
    <>
      <CardContainer />
      <Verification />
    </>
  );
}

export default React.memo(LoginLayout);
