import React from 'react';
import Box from "./components/Box";
import { BoxButtonNav, BoxButtonA } from "./components/Button";
import genEmAddr from "../mail-gen";
import imgPathNinjam from "../data/img/ninjam_screenshot.png";

export default class Home extends React.Component {
	render() {
		return (
			<div className="boxGrid">
				<Box wide>
					<h1>Brandon Li, Full Stack Developer</h1>
					<p>Hello there! I'm Brandon, and I create websites, mobile apps, and games.</p>
					<BoxButtonNav to="/work" label="See all my work" />
					<BoxButtonA label="Contact me" href={`mailto:${genEmAddr()}`} />
				</Box>

				<Box color={global.COLORS.ORANGE} left>
					<h1>Ninjam.io</h1>
					<p>A real-time multiplayer ninja action game.</p>
					<p>Node.js, Websockets, Express.js, MySQL, Redis, Pug, and Pixi.js</p>
					<p>Play as a guest, or create an account to have your stats tracked!</p>
					<BoxButtonA label="Play Ninjam.io" color={global.COLORS.ORANGE} href="https://ninjam.io" target="_blank" />
				</Box>
				<div className="boxImageContainer boxRight">
					<a href="https://ninjam.io" target="_blank">
						<div className="boxImageTint"></div>

						<img className="boxImage"
							src={imgPathNinjam} />
					</a>
				</div>
			</div>
		);
	}
}