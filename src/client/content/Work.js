import React from 'react';
import Box from "./components/Box";
import styles from "../styles/module/Work.module.css";

import jsonProjects from "../data/json/projects.json5";

function WorkItem(props) {
	return (
		<Box
			color = {props.color}
			wide
			key = {props.key}
			style = {props}
		>
			<h2><a className={styles.projectNameLink} href={props.homepage} target="_blank">{props.name}</a></h2>
			<p>({props.date})</p>
			<p>{props.description}</p>
		</Box>
	)
}

function WorkList() {
	let workItems = jsonProjects.map((project, index) => {
		return (
			<WorkItem
				color = {
					index % 2 == 0 ? global.COLORS.BLUE : global.COLORS.ORANGE
				}
				key = {project.id}
				name = {project.name}
				description = {project.description}
				date = {project.date}
				homepage = {project.homepage}
			>
			</WorkItem>
		);
	});

	return (
		<div className="boxGrid">
			{workItems}
		</div>
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