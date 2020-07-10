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

const Page = (props) => {
	document.title = props.title;
	const PageComponent = props.component;
	
	return <PageComponent />
}

const Content = () => {
	return (
		<div className="content">
			<Switch>
				<Route exact path="/" render={props => (
					<Page {...props} component={Home} title="Brandon Li | Full Stack Developer" />
				)}/>
				<Route path="/about" render={props => (
					<Page {...props} component={About} title="About Brandon" />
				)}/>
				<Route path="/work" render={props => (
					<Page {...props} component={Work} title="Projects and Work" />
				)}/>
				<Route path="/privacy" render={props => (
					<Page {...props} component={Privacy} title="Privacy Policy" />
				)}/>
				<Route path="/prince-kong" render={props => (
					<Page {...props} component={PrinceKong} title="Prince Kong" />
				)}/>
				<Route render={props => (
					<Page {...props} component={NotFound} title="Error 404" />
				)}/>
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