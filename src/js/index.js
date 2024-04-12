//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import Users from "./component/users.jsx";

//render your react application
ReactDOM.render(<Users />, document.querySelector("#app"));
