import React from 'react';
import Box from "./components/Box";
import styles from "../styles/module/Work.module.css";

import jsonProjects from "../data/json/projects.json5";

import imgPathTerror from "../data/img/game_terror.png";
import imgPathSpouse from "../data/img/game_spouse.png";
import imgPathHiv from "../data/img/game_hiv.png";
import imgPathPrince from "../data/img/game_prince.png";
import imgPathInProgress from "../data/img/game_inProgress.png";

function idToPath(projectId) {
	switch (projectId) {
		case "project-terror": return imgPathTerror;
		case "project-spouse": return imgPathSpouse;
		case "project-hiv": return imgPathHiv;
		case "prince-kong": return imgPathPrince;
		default: return imgPathInProgress;
	}
}

function WorkItemTech(props) {
	return <li className={styles.skillListItem}>{props.text}</li>
}

function WorkItem(props) {

	let techList = props.skills.map(skillStr => {
		return (
			<WorkItemTech text = {skillStr} />
		)
	});

	return (
		<Box
			color={props.color}
			wide spaced
			key={props.id}
		>
			<h2><a className={styles.projectNameLink} href={props.homepage} target="_blank">{props.name}</a></h2>
			<p>{props.date}</p>
			<p><a href={props.homepage}><img src={idToPath(props.id)}></img></a></p>
			<p>{props.description}</p>
			<p><ul className={styles.skillList}>{techList}</ul></p>
		</Box >
	)
}

function WorkList() {
	let workItems = jsonProjects.map((project, index) => {
		return (
			<WorkItem
				color={
					index % 2 == 0 ? global.COLORS.BLUE : global.COLORS.ORANGE
				}
				key={project.id}
				id={project.id}
				name={project.name}
				description={project.description}
				date={project.date}
				homepage={project.homepage}
				skills={project.tech}
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