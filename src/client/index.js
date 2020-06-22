'use strict';

import styles from './styles/main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./Main";

global.COLORS = {
	BLUE: "blue",
	GREEN: "green",
	ORANGE: "orange",
	RED: "red",
	CLEAR: "clear"
};

ReactDOM.render(<Main/>, document.getElementById('root'));