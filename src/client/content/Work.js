import React from 'react';
import Box from "./components/Box";

import jsonProjects from "../data/json/projects.json5";

function WorkList() {
	let boxes = jsonProjects.map((project, index) => {
		return (
			<Box
				color = {
					index % 2 == 0 ? global.COLORS.BLUE : global.COLORS.ORANGE
				}
				wide
				key = {project.id}
			>
				<h2>{project.name}</h2>
			</Box>
		);
	});

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
					<h1>Projects and Work</h1>
				</Box>
			</div>
			<WorkList />
		</div>
	);
}