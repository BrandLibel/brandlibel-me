import React from "react";

export function BoxTintImage(props) {
    return (
		<div className="boxImageContainer boxRight">
			<a href={props.href} target={props.target || "_blank"}>
				<div className="boxImageTint"></div>

				<img className="boxImage"
					src={props.src} />
			</a>
		</div>
    );
}

export function BannerTintImage(props) {
    return (
        <a href={props.href} target={props.target || "_blank"}>
			<img className="bannerImage"
				src={props.src} />
		</a>
    )
}