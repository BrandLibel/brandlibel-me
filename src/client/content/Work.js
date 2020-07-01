import React from 'react';
import Box from "./components/Box";

function WorkList() {
	return (
		<div></div>
		// TODO: create, from a json file, a list of sortable WorkItemBox(?) components
	);
}

export default function Work() {
	return (
		<div className="boxGrid">
			<Box color={global.COLORS.CLEAR} wide>
				<h1>Stuff Brandon Created</h1>
			</Box>
			<WorkList />
		</div>
	);
}