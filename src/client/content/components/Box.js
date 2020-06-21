import styles from '../../styles/module/Box.module.css';

import React from 'react';

export default function Box(props) {
	return (
		<div className={`${styles.box} ${(props.color || global.COLORS.BLUE)}Box`}>
			{props.children}
		</div>
	);
}