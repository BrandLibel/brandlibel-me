import React from "react";
import Box from "./components/Box";
import { BoxButton } from "./components/Button";
import PostForm from "./components/PostForm";
import BrandSpinner from "./components/BrandSpinner";
import { NavLink } from "react-router-dom";

class AdminButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allowDelete: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState(prevState => { return { allowDelete: !prevState.allowDelete } });
    }
    render() {
        let editLabel = "Edit";
        if (this.props.isEditing) editLabel = "Cancel";

        return (
            <p>
                <BoxButton color={global.COLORS.RED} label="Delete" clickCallback={
                    event => {
                        if (this.state.allowDelete) {
                            this.props.handleDelete();
                            // This is a patch for a bug where the next blog post
                            // will "inherit" this component state, so it'll have the checkbox checked
                            // even if it didn't right before this component deletes its parent blog post.
                            // Consider fixing what is fundamentally wrong with it in the future. 
                            this.setState({ allowDelete: false });
                        }
                        else console.log("Delete not allowed; check the box first.");
                    }
                }
                />
                <BoxButton label={editLabel} clickCallback={
                    event => { this.props.handleEdit(); }
                }
                />
                <input type="checkbox" onChange={this.handleChange} checked={this.state.allowDelete} /> <label>Allow Delete?</label>
            </p>
        );
    }
}

export class BlogPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isEditing: false }
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit() {
        this.setState(prevState => {
            return { isEditing: !prevState.isEditing };
        });
    }

    render() {
        const props = this.props;

        let postContent = (
            <div>
                <h2><NavLink to={`/blog/${props.slug}`}><span className="clearBoxLink">{props.title}</span></NavLink></h2>
                <p>{props.excerpt}</p>
            </div>
        );
        if (this.state.isEditing){
            postContent = (
                <PostForm
                    //N_TITLE={N_TITLE}
                    //N_MARKDOWN={N_MARKDOWN}
                    //F_NEW_POST={F_NEW_POST}
                    postTitle={props.title}
                    markdown={props.markdown}
                    isEditing={this.state.isEditing}
                    //postResponseString={this.state.postResponseString}
                    //handleChange={this.handleChange}
                    //handleSubmit={this.handleSubmit}
                />
            );
        }

        return (
            <Box color={global.COLORS.CLEAR} wide>
                {postContent}
                {
                    props.isAdminConsole &&
                    <AdminButtons
                        handleDelete={props.handleDelete}
                        handleEdit={this.handleEdit}
                        isEditing={this.state.isEditing}
                    />
                }
            </Box>
        );
    }
}

export class BlogPostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: true,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.refreshAllBlogPosts = this.refreshAllBlogPosts.bind(this);
    }
    handleDelete(slug) {
        const json = {
            slug: slug,
            password: this.props.password,
        };

        const request = new XMLHttpRequest();
        request.open("DELETE", "/api/deletePost");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(json));

        request.onreadystatechange = () => {
            if (request.readyState == 4 && request.status == 200) {
                this.refreshAllBlogPosts();
            }
        }
    }
    componentDidMount() {
        this.refreshAllBlogPosts();
        this.setState({ isLoading: true });
    }
    refreshAllBlogPosts() {
        fetch("/api/blog/all")
            .then(response => response.json())
            .then(data => {
                let postComponents = data.map(post => {
                    const CURRENT_SLUG = post.slug;

                    let truncatedExcerpt = post.markdown.split("\n")[0];

                    if (truncatedExcerpt.length > 220) {
                        truncatedExcerpt = truncatedExcerpt.substr(0, 220);
                        truncatedExcerpt += "...";
                    }

                    return (
                        <BlogPost
                            excerpt={truncatedExcerpt}
                            isAdminConsole={this.props.isAdminConsole}
                            slug={post.slug}
                            title={post.title}
                            markdown={post.markdown}
                            handleDelete={() => this.handleDelete(CURRENT_SLUG)}
                        />
                    )
                }).reverse(); // reverse shows latest blog posts first
                this.setState({
                    posts: postComponents,
                    isLoading: false,
                });
            });
    }
    render() {
        if (this.state.isLoading) return <div style={{ width: "100%", height: "100%", backgroundColor: '#ffffff' }}><BrandSpinner /></div>;
        return this.state.posts;
    }
}

export default class Blog extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <div className="boxGrid">
                    <Box color={global.COLORS.CLEAR} wide>
                        <h1>Blog Libel</h1>
                    </Box>
                </div>
                <div className="boxGrid">
                    <BlogPostList password="" />
                </div>
            </div>
        );
    }
}