import React from 'react';
import Box from "./components/Box";
import { BoxButtonA } from "./components/Button";
import { BannerTintImage } from "./components/Image";
import styles from "../styles/module/Work.module.css";

import jsonProjects from "../data/json/projects.json5";

import imgPathWebsite from "../data/img/banner_website.png";
import imgPathNinjam from "../data/img/game_ninjam.png";
import imgPathTerror from "../data/img/game_terror.png";
import imgPathSpouse from "../data/img/game_spouse.png";
import imgPathHiv from "../data/img/game_hiv.png";
import imgPathPrince from "../data/img/game_prince.png";
import imgPathInProgress from "../data/img/game_inProgress.png";

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

class SortButtonList extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<p>Sort by: <SortButton label="Featured" list={this.props.work} sortState={this.props.sortState} i={0} /> | <SortButton label="Date" list={this.props.work} sortState={this.props.sortState} i={1} /> | <SortButton label="Alphabetical" list={this.props.work} sortState={this.props.sortState} i={2} /></p>
		);
	}
}

class SortButton extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
	myState() {
		return this.props.sortState[this.props.i];
	}
	isSelected() {
		return this.myState().selected;
	}
	onClick() {
		this.props.list.setNewSortState(this.props.i);
	}
	render() {
		let innerHTML = <span>{this.props.label}</span>
		if (this.isSelected()) {
			if (this.myState().orderDesc) innerHTML = <span>{this.props.label}&#8595;</span>
			else innerHTML = <span>{this.props.label}&#8593;</span>
		}

		return <a href="#" className="clearBoxLink" onClick={this.onClick}>{innerHTML}</a>;
	}
}

function WorkItemTech(props) {
	return <li className={styles.skillListItem}>{props.text}</li>
}

function WorkItem(props) {

	let techList = props.skills.map(skillStr => {
		return (
			<WorkItemTech text={skillStr} />
		)
	});

	let linkList = props.links.map(url => {

		let innerElement = "Visit Site";
		if (url.includes("github.com")) innerElement = "GitHub";
		else if (url.includes("apple.com")) innerElement = "iOS";
		else if (url.includes("play.google.com")) innerElement = "Android";
		else if (url.includes(".apk")) innerElement = "Download APK";
		else if (url.includes("devpost.com")) innerElement = "See Contest Entry";
		else if (url.includes("ninjam.io") || url.includes("prince-kong")) innerElement = "Play (HTML5)";

		return (
			<BoxButtonA color={props.color} label={innerElement} href={url} target={url == "/" ? "_self" : "_blank"} />
		);
	});

	return (
		<Box
			color={props.color}
			wide spaced
			key={props.id}
		>
			<h2 className={styles.boxHeader}>
				<a className={styles.projectNameLink} href={props.homepage} target={props.homepage == "/" ? "_self" : "_blank"}>
					{props.name}
				</a>
			</h2><p className={styles.boxDate}>{props.date}</p>
			<p className={styles.bannerImage}>
				<BannerTintImage href={props.homepage} src={idToPath(props.id)} target={props.homepage == "/" ? "_self" : "_blank"} />
			</p>
			<p>{props.description}</p>
			<p><ul className={styles.skillList}>{techList}</ul></p>
			<p>{linkList}</p>
		</Box>
	);
}

class WorkList extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let workItems = jsonProjects.map((project, index) => {
			let boxColor = index % 2 == 0 ? global.COLORS.BLUE : global.COLORS.ORANGE
			return (
				<WorkItem
					color={boxColor}
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
}

export default class Work extends React.Component {
	constructor() {
		super();
		this.state = {
			sortState: [
				{
					selected: true,
					orderDesc: true,
				},
				{
					selected: false,
					orderDesc: true,
				},
				{
					selected: false,
					orderDesc: true,
				},
			],
		};
		this.setNewSortState = this.setNewSortState.bind(this);
	}
	setNewSortState(index) {
		this.setState(prevState => {
			let oldState = prevState.sortState;
			let newState = {
				sortState: [
					{
						selected: false,
						orderDesc: oldState[0].orderDesc,
					},
					{
						selected: false,
						orderDesc: oldState[1].orderDesc,
					},
					{
						selected: false,
						orderDesc: oldState[2].orderDesc,
					},
				],
			};
			newState.sortState[index] = {
				selected: true,
				orderDesc: !oldState[index].orderDesc,
			}
			return newState;
		});
	}
	render() {
		return (
			<div>
				<div className="boxGrid">
					<Box color={global.COLORS.CLEAR} wide>
						<h1>Projects and Work</h1>
						<SortButtonList sortState={this.state.sortState} work={this} />
					</Box>
				</div>
				<WorkList sortState={this.state.sortState} />
			</div>
		);
	}
}