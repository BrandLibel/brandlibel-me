import React from "react";
import PostForm from "./components/PostForm";
import Box from "./components/Box";

import { BlogPostList } from "./Blog";

import { N_PASSWORD } from "./../global/Strings";

import PassContext from "./../global/PassContext";

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
            <PassContext.Provider value={this.state.adminPassword}>
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
                        <PostForm />
                    </Box>
                </div>
                <div className="boxGrid">
                    <BlogPostList isAdminConsole />
                </div>
            </PassContext.Provider>
        );
    }
}