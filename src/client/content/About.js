import React from 'react';
import Box from "./components/Box";

export default class About extends React.Component {
	render(){
		return (
			<div>
				<div className="aboutBoxGrid">
					<Box color="clear">
						<h1>About Brandon</h1>
						<p>I am Brandon Li, a full stack developer based in Brooklyn.</p>
						<p>I started to teach myself to program in 2011 when I was in high school.</p>
						<p>I joined coding competitions and <a href="https://devpost.com/software/hiv-and-her">won an honorable mention</a> in a game development competition commissioned by the CDC.</p>
					</Box>
					<img className="boxImage"
						src="src/client/data/img/bradon_face_600.png"
						srcSet="src/client/data/img/bradon_face_600.png 600w,
								src/client/data/img/bradon_face.png 1075w"
						sizes="(max-width: 2000px) 600px,
								1075px"
						/>
				</div>
				<div className="aboutBoxGridReversed">
					<img className="boxImage"
						src="src/client/data/img/gate.png"/>
					<Box color="clear">
						<p>After graduating from high school, I became a self-employed / freelance software developer. I continued to build and release my own games while working on a variety of projects for clients around the world.</p>
						<p>Professionally, I've worked with Javascript, Node.js, Java, Kotlin, MySQL, PHP, Actionscript, and more.</p>
					</Box>
				</div>
				<div className="aboutBoxGrid">
					<Box color="clear">
						<p>I enjoy building and shipping great products and writing quality code. I am comfortable with all stages of development, from design to release.</p>
						<p>I am currently employed at Bundil, building the core functionality of the Android app.</p>
					</Box>
				</div>
			</div>
		);
	}
}