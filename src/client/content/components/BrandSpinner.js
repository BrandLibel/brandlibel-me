import React from "react";
import ReactSpinner from "react-spinjs-new";

const OPTIONS = {
    lines: 9, // The number of lines to draw
    length: 0, // The length of each line
    width: 17, // The line thickness
    radius: 45, // The radius of the inner circle
    scale: 1, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    speed: 1, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#222222', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    top: '100%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '', // Box-shadow for the lines
    zIndex: 2000000000, // The z-index (defaults to 2e9)
    className: 'spinner', // The CSS class to assign to the spinner
    position: 'absolute', // Element positioning
};

export default function BrandSpinner() {
    return <ReactSpinner config={OPTIONS} />
}