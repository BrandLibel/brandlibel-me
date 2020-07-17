import React from "react";
import Box from "./components/Box";

export default class BlogPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            markdown: ""
        };
    }
    componentDidMount(){
        let slug = this.props.slug;
        fetch(`/api/blog/${slug}`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                title: data.title,
                markdown: data.markdown
            });
            document.title = `${data.title} | Blog Libel`;
        }).catch(err => {
            console.dir(err);
        });
    }
    render(){
        return (
            <div>
                <div className="boxGrid">
                    <Box color={global.COLORS.CLEAR} wide>
                        <h1>{this.state.title}</h1>
                        <p>{this.state.markdown}</p>
                    </Box>
                </div>
            </div>
        );
    }
}