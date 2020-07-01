import React from 'react';
import Box from "./components/Box";

import jsonPathProjects from "../data/json/projects.json5";

function WorkList() {
	let boxes = [];

	boxes.push(
		<Box color={global.COLORS.BLUE} wide key="1"/>
	);
	boxes.push(
		<Box color={global.COLORS.ORANGE} wide key="2"/>
	);
	boxes.push(
		<Box color={global.COLORS.BLUE} wide key="3"/>
	);
	boxes.push(
		<Box color={global.COLORS.ORANGE} wide key="4"/>
	);

	return (
		<div className="boxGrid">
			{boxes}
		</div>
		// TODO: create, from a json file, a list of sortable WorkItemBox(?) components
	);
}

export default function Work() {
	return (
		<div>
			<div className="boxGrid">
				<Box color={global.COLORS.CLEAR} wide>
					<h1>Some of Brandon's Work</h1>
				</Box>
			</div>
			<WorkList />
		</div>
	);
}