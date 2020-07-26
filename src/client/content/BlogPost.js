import React from "react";
import Box from "./components/Box";
import ReactMarkdown from "react-markdown";
import BrandSpinner from "./components/BrandSpinner";

export default class BlogPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            markdown: "",
            createdOn: "",
            isLoading: true,
        };
    }
    componentDidMount() {
        let slug = this.props.slug;
        fetch(`/api/blog/${slug}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    markdown: data.markdown,
                    createdOn: new Date(data.createdOn).toLocaleDateString(),
                    isLoading: false,
                });
                document.title = `${data.title} | Blog Libel`;
            }).catch(err => {
                console.dir(err);
            });
    }
    render() {
        if (this.state.isLoading) return <BrandSpinner />;

        return (
            <div className="boxGrid">
                <Box color={global.COLORS.CLEAR} wide>
                    <h1>{this.state.title}</h1>
                    <p>Published {this.state.createdOn}</p>
                    <ReactMarkdown source={this.state.markdown} />
                </Box>
            </div>
        );
    }
}