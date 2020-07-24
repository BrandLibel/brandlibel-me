import React from "react";
import { BoxButton } from "./Button";

export default class PostForm extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {F_NEW_POST, N_TITLE, N_MARKDOWN, postResponseString, handleChange, handleSubmit} = this.props;
        return (
                <form name={F_NEW_POST} onSubmit={handleSubmit}>
                    <input
                        name={N_TITLE}
                        placeholder="Title"
                        type="text"
                        required
                        onChange={handleChange}
                        value={this.props.postTitle}
                    />
                    <br />
                    <textarea
                        name={N_MARKDOWN}
                        rows="14"
                        placeholder="Markdown"
                        required
                        onChange={handleChange}
                        value={this.props.markdown}
                    />
                    <br />
                    <p>{postResponseString}</p>
                    <BoxButton color={global.COLORS.BLUE} label="Post" />
                </form>
        );
    }
}

