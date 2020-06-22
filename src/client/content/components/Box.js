import styles from '../../styles/module/Box.module.css';

import React from 'react';

export default function Box(props) {
	var gridSizeStyle = "boxLeft";
	if (props.right) gridSizeStyle = "boxRight";
	else if (props.wide) gridSizeStyle = "boxWide";

	return (
		<div className={`${styles.box} ${(props.color || global.COLORS.BLUE)}Box ${gridSizeStyle}`}>
			{props.children}
		</div>
	);
}