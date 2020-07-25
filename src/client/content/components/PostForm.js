import React from "react";
import { BoxButton } from "./Button";

import { N_TITLE, N_MARKDOWN, F_NEW_POST, N_PASSWORD } from "./../../global/Strings";

import PassContext from "./../../global/PassContext";

export default class PostForm extends React.Component {
    static contextType = PassContext;

    constructor(props) {
        super(props);
        this.state = {
            [N_TITLE]: props.postTitle || "",
            [N_MARKDOWN]: props.markdown || "",
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

        console.log("Submitted!", this.state[N_TITLE], this.state[N_MARKDOWN], this.context);

        this.setState({ postResponseString: "", });

        let apiEndpoint = "newPost";

        const json = {
            [N_PASSWORD]: this.context,
            [N_TITLE]: this.state[N_TITLE],
            [N_MARKDOWN]: this.state[N_MARKDOWN],
        };

        const IS_EDITING = this.props.isEditing;

        if (IS_EDITING) {
            json.slug = this.props.slug;
            apiEndpoint = "editPost";
        }

        const request = new XMLHttpRequest();
        request.open("POST", `/api/${apiEndpoint}`);
        request.setRequestHeader("Content-Type", "application/json");

        request.send(JSON.stringify(json));

        request.onreadystatechange = () => {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    if (this.props.extraHandleSubmit) this.props.extraHandleSubmit(this.state[N_TITLE], this.state[N_MARKDOWN]);
                    if (IS_EDITING) {
                        this.setState({
                            postResponseString: "Success! Edited blog post.",
                        });
                    }
                    else {
                        this.setState({
                            [N_TITLE]: "",
                            [N_MARKDOWN]: "",
                            postResponseString: "Success! Posted blog post.",
                        });
                    }
                }
                else {
                    this.setState({ postResponseString: `Failure. Error ${request.status}` });
                }
            }
        }
    }

    render() {
        return (
            <form name={F_NEW_POST} onSubmit={this.handleSubmit}>
                <input
                    name={N_TITLE}
                    placeholder="Title"
                    type="text"
                    required
                    onChange={this.handleChange}
                    value={this.state.newPostTitle}
                />
                <br />
                <textarea
                    name={N_MARKDOWN}
                    rows="14"
                    placeholder="Markdown"
                    required
                    onChange={this.handleChange}
                    value={this.state.newPostMarkdown}
                />
                <br />
                <p>{this.state.postResponseString}</p>
                <BoxButton color={global.COLORS.BLUE} label="Post" />
            </form>
        );
    }
}