import React from "react";
import PostForm from "./components/PostForm";
import Box from "./components/Box";

import { BlogPostList } from "./Blog";

const N_PASSWORD = "adminPassword";
const N_TITLE = "newPostTitle";
const N_MARKDOWN = "newPostMarkdown";
const F_NEW_POST = "newPostForm";

export default class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            [N_PASSWORD]: "",
            [N_TITLE]: "",
            [N_MARKDOWN]: "",
            postResponseString: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log("Submitted!", this.state[N_TITLE], this.state[N_MARKDOWN]);

        const json = {
            [N_PASSWORD]: this.state[N_PASSWORD],
            [N_TITLE]: this.state[N_TITLE],
            [N_MARKDOWN]: this.state[N_MARKDOWN],
        };

        const request = new XMLHttpRequest();
        request.open("POST", "/api/newPost");
        request.setRequestHeader("Content-Type", "application/json");

        request.send(JSON.stringify(json));

        request.onreadystatechange = () => {
            if (request.readyState == 4){
                if (request.status == 200) {
                    this.setState({
                        [N_TITLE]: "",
                        [N_MARKDOWN]: "",
                        postResponseString: "Success! Posted blog post.", 
                    });
                }
                else {
                    this.setState({postResponseString: `Failure. Error ${request.status}`});
                }
            }
        }
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
                            value={this.state[N_PASSWORD]}
                        />
                        <h2>New Blog Post</h2>
                        <PostForm
                            N_PASSWORD = {N_PASSWORD}
                            N_TITLE = {N_TITLE}
                            N_MARKDOWN = {N_MARKDOWN}
                            F_NEW_POST = {F_NEW_POST}
                            postTitle={this.state[N_TITLE]}
                            markdown={this.state[N_MARKDOWN]}
                            postResponseString={this.state.postResponseString}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                        />
                    </Box>
                </div>
                <div className="boxGrid">
                    <BlogPostList isAdminConsole password={this.state[N_PASSWORD]}/>
                </div>
            </div>
        );
    }
}