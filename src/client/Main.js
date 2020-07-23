import styles from './styles/module/Brandlibel.module.css';

import React from "react";
import Home from "./content/Home";
import About from "./content/About";
import Blog from "./content/Blog";
import BlogPost from "./content/BlogPost";
import Work from "./content/Work";
import Admin from "./content/Admin";
import Privacy from "./content/Privacy";
import PrinceKong from "./content/PrinceKong"
import NotFound from "./content/NotFound";
import Header from "./content/components/Header"

import {
	Route,
	BrowserRouter,
	Switch,
	useParams
} from "react-router-dom";

const Page = (props) => {
	document.title = props.title;
	const PageComponent = props.component;
	const {slug} = useParams();
	return <PageComponent slug = {slug} />
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
				<Route exact path="/admin" render={props => (
					<Page {...props} component={Admin} title="Admin Console" />
				)}/>
				<Route exact path="/blog" render={props => (
					<Page {...props} component={Blog} title="Blog Libel" />
				)}/>
				<Route exact path="/blog/:slug" render={props => (
					<Page {...props} component={BlogPost} title="Blog Libel Post" />
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