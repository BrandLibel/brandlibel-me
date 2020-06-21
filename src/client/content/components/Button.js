import React from 'react';

import { NavLink } from "react-router-dom";

function makeClassName(color) {
	return `${color || global.COLORS.BLUE}BoxButton button`;
}
export function BoxButton(props) {
	return (
		<button className={makeClassName(props.color)} onClick={props.clickCallback}>
			{props.label}
		</button>
	);
}

export function BoxButtonA(props) {
	return (
		<a className={makeClassName(props.color)} href={props.href} target={props.target || '_self'}>
			{props.label}
		</a>
	);
}

export function BoxButtonNav(props) {
	return (
		<NavLink to={props.to}>
			<span className={makeClassName(props.color)}>
				{props.label}
			</span>
		</NavLink>
	);
}