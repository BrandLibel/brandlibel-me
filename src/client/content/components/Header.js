import React from "react";
import styles from '../../styles/module/Header.module.css';

import { NavLink } from "react-router-dom";

const HeaderList = (props) => <nav className={styles.nav}><ul>{props.children}</ul></nav>

const HeaderItem = (props) => {
	return (
		<li>
			<span>
				<NavLink
					to={props.path}
					activeClassName={styles.selectedHeaderItem}
					exact
				>
					{props.name}
				</NavLink>
			</span>
		</li>
	);
}

const HeaderLogo = (props) => {
	return (
		<div className={styles.logoContainer}>
			<NavLink to={props.path} exact>
				<img className={styles.logoImg} src={props.src} />
			</NavLink>
		</div>
	);
};

export default function Header() {
	return (
		<header className={`${styles.header}`}>
			<div>
				<HeaderLogo path="/" src="src/client/data/img/brandlibel_logo.svg" />
				<HeaderList>
					<HeaderItem path="/" name="HOME" />
					<HeaderItem path="/work" name="WORK" />
					<HeaderItem path="/about" name="ABOUT" />
				</HeaderList>
			</div>
		</header>
	);
}