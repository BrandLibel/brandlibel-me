import React from "react";
import Box from "./components/Box";

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
    }
    render() {
        return (
            <div className="boxGrid">
                <Box color={global.COLORS.CLEAR} wide>
                    <h1>Admin Console</h1>
                    <label>Admin password:</label>
                    <input
                        name={N_PASSWORD}
                        type="password"
                        onChange={this.handleChange}
                        value={this.state[N_PASSWORD]}
                    />
                    <form name={F_NEW_POST} onSubmit={this.handleSubmit}>
                        <h2>New Blog Post</h2>
                        <input
                            name={N_TITLE}
                            placeholder="Title"
                            type="text"
                            required
                            onChange={this.handleChange}
                            value={this.state[N_TITLE]}
                        />
                        <br />
                        <textarea
                            name={N_MARKDOWN}
                            placeholder="Markdown"
                            required
                            onChange={this.handleChange}
                            value={this.state[N_MARKDOWN]}
                        />
                        <br />
                        <button>Post</button>
                    </form>
                </Box>
            </div>
        );
    }
}