'use strict';

import styles from "./styles/main.css";

import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";

import ReactGA from "react-ga";

ReactGA.initialize("UA-63639646-1");

global.COLORS = {
	BLUE: "blue",
	GREEN: "green",
	ORANGE: "orange",
	RED: "red",
	CLEAR: "clear"
};

ReactDOM.render(<Main/>, document.getElementById("root"));