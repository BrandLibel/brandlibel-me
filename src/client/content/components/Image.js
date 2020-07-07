import React from "react";

export default function TintImage(props) {
    return (
        <a href={props.href} target="_blank">
			<div className="boxImageTint"></div>

			<img className="boxImage"
				src={props.src} />
		</a>
    );
}