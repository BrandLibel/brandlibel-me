import React from "react";
import { BoxButton } from "./Button";

import { N_TITLE, N_MARKDOWN, F_NEW_POST, N_PASSWORD } from "./../../global/Strings";

export default class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            [N_PASSWORD]: this.props[N_PASSWORD],
            [N_TITLE]: this.state[N_TITLE],
            [N_MARKDOWN]: this.state[N_MARKDOWN],
        };

        const request = new XMLHttpRequest();
        request.open("POST", "/api/newPost");
        request.setRequestHeader("Content-Type", "application/json");

        request.send(JSON.stringify(json));

        request.onreadystatechange = () => {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    this.setState({
                        [N_TITLE]: "",
                        [N_MARKDOWN]: "",
                        postResponseString: "Success! Posted blog post.",
                    });
                }
                else {
                    this.setState({ postResponseString: `Failure. Error ${request.status}` });
                }
            }
        }
    }

    render() {
        let valueTitle = this.state.newPostTitle;
        let valueMarkdown = this.state.newPostMarkdown;

        if (this.props.isEditing) {
            valueTitle = this.props.postTitle;
            valueMarkdown = this.props.markdown;
        }

        return (
            <form name={F_NEW_POST} onSubmit={this.handleSubmit}>
                <input
                    name={N_TITLE}
                    placeholder="Title"
                    type="text"
                    required
                    onChange={this.handleChange}
                    value={valueTitle}
                />
                <br />
                <textarea
                    name={N_MARKDOWN}
                    rows="14"
                    placeholder="Markdown"
                    required
                    onChange={this.handleChange}
                    value={valueMarkdown}
                />
                <br />
                <p>{this.state.postResponseString}</p>
                <BoxButton color={global.COLORS.BLUE} label="Post" />
            </form>
        );
    }
}

