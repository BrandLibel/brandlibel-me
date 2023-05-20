import React from 'react';
import Box from "./components/Box";
import { BoxButtonNav, BoxButtonA } from "./components/Button";
import Util from "../global/Util";
import imgPathNinjam from "../data/img/ninjam_screenshot.png";
import { BoxTintImage } from "./components/Image";

export default class Home extends React.Component {
	render() {
		return (
			<div>
				<div className="boxGrid">
					<Box wide>
						<h1>Brandon Li, Full Stack Developer</h1>
						<p>Hello there! I'm Brandon, and I create websites, mobile apps, and games.</p>
						<BoxButtonNav to="/work" label="See all my work" />
						<BoxButtonA label="Contact me" href={`mailto:${Util.getEmailAddress()}`} />
					</Box>
				</div>
				<div className="boxGrid">
					<Box color={global.COLORS.ORANGE} left>
						<h2>Ninjam.io</h2>
						<p>A real-time multiplayer ninja action game.</p>
						<p>Node.js, Websockets, Express.js, MySQL, Redis, Pug, and Pixi.js</p>
						<p>Play as a guest, or create an account to have your stats tracked!</p>
						<BoxButtonA label="Play Ninjam.io" color={global.COLORS.ORANGE} href="https://ninjam.io" target="_blank" />
					</Box>
					<BoxTintImage href="https://ninjam.io" src={imgPathNinjam} />
				</div>
			</div>
		);
	}
}