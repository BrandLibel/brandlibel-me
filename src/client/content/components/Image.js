import React from "react";

export function BoxTintImage(props) {
    return (
        <a href={props.href} target={props.target || "_blank"}>
			<div className="boxImageTint"></div>

			<img className="boxImage"
				src={props.src} />
		</a>
    );
}

export function BannerTintImage(props) {
    return (
        <a href={props.href} target={props.target || "_blank"}>
			<div className="bannerImageTint"></div>

			<img className="bannerImage"
				src={props.src} />
		</a>
    )
}