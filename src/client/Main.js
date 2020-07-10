import styles from './styles/module/Brandlibel.module.css';

import React from "react";
import Home from "./content/Home";
import About from "./content/About";
import Work from "./content/Work";
import Privacy from "./content/Privacy";
import PrinceKong from "./content/PrinceKong"
import NotFound from "./content/NotFound";
import Header from "./content/components/Header"

import {
	Route,
	BrowserRouter,
	Switch
} from "react-router-dom";

const Content = () => {
	return (
		<div className="content">
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/about" component={About} />
				<Route path="/work" component={Work} />
				<Route path="/privacy" component={Privacy} />
				<Route path="/prince-kong" component={PrinceKong} />
				<Route component={NotFound} />
			</Switch>
		</div>
	);
}

export default class Main extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Header />
				<Content />
			</BrowserRouter>
		);
	}
}