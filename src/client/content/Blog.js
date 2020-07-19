import React from "react";
import Box from "./components/Box";
import { BoxButton } from "./components/Button";

import { NavLink } from "react-router-dom";

export class BlogPostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete(slug) {
        const json = {
            slug: slug,
            password: "test1234",
        };

        const request = new XMLHttpRequest();
        request.open("DELETE", "/api/deletePost");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(json));
    }
    componentDidMount() {
        fetch("/api/blog/all")
            .then(response => response.json())
            .then(data => {
                let postComponents = data.map(post => {
                    const CURRENT_SLUG = post.slug;
                    let adminButtons = (<p>
                        <BoxButton color={global.COLORS.RED} label="Delete" clickCallback={
                                (event) => {
                                    console.log("handleClick", CURRENT_SLUG);
                                    this.handleDelete(CURRENT_SLUG);
                                }
                            }
                        />
                        <BoxButton label="Edit" />
                    </p>);

                    return (
                        <Box color={global.COLORS.CLEAR} wide>
                            <h2><NavLink to={`/blog/${post.slug}`}><span className="clearBoxLink">{post.title}</span></NavLink></h2>
                            <p>{post.markdown}</p>
                            {this.props.isAdminConsole && adminButtons}
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
            this.state.posts
        );
    }
}

export default class Blog extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="boxGrid">
                <Box color={global.COLORS.CLEAR} wide>
                    <h1>Blog Libel</h1>
                </Box>
                <BlogPostList />
            </div>
        );
    }
}