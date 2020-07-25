import React from "react";
import PostForm from "./components/PostForm";
import Box from "./components/Box";

import { BlogPostList } from "./Blog";

import { N_PASSWORD } from "./../global/Strings";

export default class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            [N_PASSWORD]: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    render() {
        return (
            <div>
                <div className="boxGrid">
                    <Box color={global.COLORS.CLEAR} wide>
                        <h1>Admin Console</h1>
                        <label>Admin password:</label>
                        <input
                            name={N_PASSWORD}
                            placeholder="Password"
                            type="password"
                            onChange={this.handleChange}
                            value={this.state.adminPassword}
                        />
                        <h2>New Blog Post</h2>
                        <PostForm
                            adminPassword={this.state.adminPassword}
                            postResponseString={this.state.postResponseString}
                        />
                    </Box>
                </div>
                <div className="boxGrid">
                    <BlogPostList
                        isAdminConsole
                        password={this.state.adminPassword}
                    />
                </div>
            </div>
        );
    }
}