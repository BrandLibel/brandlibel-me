import React from "react";
import Box from "./components/Box";

export default class Blog extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        fetch("/api/blog/all")
        .then(response => response.json())
        .then(data => {
            console.dir(data);
            let postComponents = data.map(post => {
                return (
                    <Box color={global.COLORS.CLEAR} wide>
                        <h2>{post.title}</h2>
                        <p>{post.markdown}</p>
                    </Box>
                )
            });
            this.setState({
                posts: postComponents
            });
        });
    }
    render() {
        return (
            <div>
                <div className="boxGrid">
                    <Box color={global.COLORS.CLEAR} wide>
                        <h1>Blog Libel</h1>
                    </Box>
                    { this.state.posts }
                </div>
            </div>
        );
    }
}