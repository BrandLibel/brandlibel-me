import styles from '../../styles/module/Box.module.css';

import React from 'react';

export default function Box(props) {
	let gridSizeStyle = "boxLeft";
	if (props.right) gridSizeStyle = "boxRight";
	else if (props.wide) gridSizeStyle = "boxWide";

	let spacingStyle = "";
	if (props.spaced) spacingStyle = styles.spacedBox;

	return (
		<div className={
			`${styles.box}
			${(props.color || global.COLORS.BLUE)}Box
			${gridSizeStyle}
			${spacingStyle}`
		}>
			{props.children}
		</div>
	);
}