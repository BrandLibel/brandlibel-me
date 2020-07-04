import React from 'react';
import Box from "./components/Box";
import imgPathFace from "../data/img/brandon_face_600.png";
import imgPathGate from "../data/img/gate.png";

export default class About extends React.Component {
	render() {
		return (
			<div>
				<div className="boxGrid">
					<Box color={global.COLORS.CLEAR} left>
						<h1>About Brandon</h1>
						<p>I am Brandon Li, a full stack developer based in Brooklyn.</p>
						<p>I started to teach myself to program in 2011 when I was in high school.</p>
						<p>I joined coding competitions and <a href="https://devpost.com/software/hiv-and-her">won an honorable mention</a> in a game development competition commissioned by the CDC.</p>
					</Box>
					
					<img className="boxImage boxRight"
						src={imgPathFace}
					/>

					<img className="boxImage boxLeft"
						src={imgPathGate} />

					<Box color={global.COLORS.CLEAR} right>
						<p>After graduating from high school, I became a self-employed / freelance software developer. I continued to build and release my own games while working on a variety of projects for clients around the world.</p>
						<p>Professionally, I've worked with Javascript, Node.js, Java, Kotlin, MySQL, PHP, Actionscript, and more.</p>
					</Box>

					<Box color={global.COLORS.CLEAR} left>
						<p>I enjoy building and shipping great products and writing quality code. I am comfortable with all stages of development, from design to release.</p>
						<p>My most recent employment is at Bundil as an Android Developer. I worked on developing the core functionality of the Android app.</p>
					</Box>
				</div>
			</div>
		);
	}
}