import React from 'react';
import Box from "./components/Box";

export default class Blog extends React.Component {
    render() {
        return (
            <div>
                <div className="boxGrid">
                    <Box color={global.COLORS.CLEAR} wide>
                        <h1>Blog Libel</h1>
                    </Box>
                </div>
            </div>
        );
    }
}