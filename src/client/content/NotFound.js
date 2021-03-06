import React from 'react';
import Box from "./components/Box";
import { BoxButtonNav } from "./components/Button";

export default function NotFound() {
    return (
        <div className="boxGrid">
            <Box color={global.COLORS.RED} wide>
                <h1>Error 404</h1>
                <p>The requested URL does not exist.</p>
                <BoxButtonNav to="/" label="Go Home" color={global.COLORS.RED} />
            </Box>
        </div>
    )
}