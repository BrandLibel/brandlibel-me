import React from 'react';
import Box from "./components/Box";

export default function PrinceKong() {
    return (
        <div className="boxGrid">
            <Box color={global.COLORS.CLEAR} wide>
                <h1>Prince Kong</h1>
            </Box>
            <Box color={global.COLORS.CLEAR} wide>
                <iframe id="iFramePrinceKong" src="/game/prince-kong/index.html"></iframe>
            </Box>
            <Box color={global.COLORS.CLEAR} wide>
                <h2>Instructions</h2>
                <p>Move left: Left arrow key OR tap left half of game</p>
                <p>Move right: Right arrow key OR tap right half of game</p>
                <h2>About</h2>
                <p>When I was 16, I participated in a 48-hour game jam with 2 other people. We created Prince Kong, a simple HTML5 game which you can play above. It won the game jam's grand prize.</p>
            </Box>
        </div>
    );
}