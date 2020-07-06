import React from 'react';
import Box from "./components/Box";
import styles from "../styles/module/Work.module.css";

import jsonProjects from "../data/json/projects.json5";

import imgPathWebsite from "../data/img/banner_website.png";
import imgPathNinjam from "../data/img/game_ninjam.png";
import imgPathTerror from "../data/img/game_terror.png";
import imgPathSpouse from "../data/img/game_spouse.png";
import imgPathHiv from "../data/img/game_hiv.png";
import imgPathPrince from "../data/img/game_prince.png";
import imgPathInProgress from "../data/img/game_inProgress.png";

import iconGithub from "../data/img/github.png";
import iconAndroid from "../data/img/google-play-badge.png";
import iconIOS from "../data/img/apple-badge.svg";

function idToPath(projectId) {
	switch (projectId) {
		case "brandlibel-me": return imgPathWebsite;
		case "ninjam-io": return imgPathNinjam;
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

	let linkList = props.links.map(url => {

		let imgIcon = iconGithub; // default
		if (url.includes("github.com")) imgIcon = iconGithub; 
		else if (url.includes("apple.com")) imgIcon = iconIOS;
		else if (url.includes("play.google.com")) imgIcon = iconAndroid;

		return (
			<a href={url} target="_blank"><img className={styles.linkImage} src={imgIcon}></img></a>
		)
	});

	return (
		<Box
			color={props.color}
			wide spaced
			key={props.id}
		>
			<h2 className={styles.boxHeader}><a className={styles.projectNameLink} href={props.homepage} target="_blank">{props.name}</a></h2><p className={styles.boxDate}>{props.date}</p>
			<p className={styles.bannerImage}><a href={props.homepage} target="_blank"><img src={idToPath(props.id)}></img></a></p>
			<p>{props.description}</p>
			<p><ul className={styles.skillList}>{techList}</ul></p>
			<p>{linkList}</p>
		</Box>
	);
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
				links={project.links}
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