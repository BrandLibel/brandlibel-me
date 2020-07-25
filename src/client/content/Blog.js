import React from "react";
import Box from "./components/Box";
import { BoxButton } from "./components/Button";
import PostForm from "./components/PostForm";
import BrandSpinner from "./components/BrandSpinner";
import { NavLink } from "react-router-dom";
import PassContext from "./../global/PassContext";

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
            <>
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
            </>
        );
    }
}

export class BlogPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            title: props.title,
            markdown: props.markdown,
            excerpt: props.excerpt,
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handlePostEdit = this.handlePostEdit.bind(this);
    }

    handleEdit() {
        this.setState(prevState => {
            return { isEditing: !prevState.isEditing };
        });
    }

    handlePostEdit(title, markdown) {
        this.setState({
            title: title,
            markdown: markdown,
            excerpt: markdown,
        });
    }

    render() {
        const props = this.props;

        let postContent = (
            <>
                <h2><NavLink to={`/blog/${props.slug}`}><span className="clearBoxLink">{this.state.title}</span></NavLink></h2>
                <p>{this.state.excerpt}</p>
            </>
        );
        if (this.state.isEditing){
            postContent = (
                <PostForm
                    postTitle={this.state.title}
                    markdown={this.state.markdown}
                    isEditing={this.state.isEditing}
                    slug={props.slug}
                    extraHandleSubmit={this.handlePostEdit}
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
    static contextType = PassContext;

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
            password: this.context,
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
        if (this.state.isLoading) return <BrandSpinner />;
        return this.state.posts;
    }
}

export default class Blog extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <>
                <div className="boxGrid">
                    <Box color={global.COLORS.CLEAR} wide>
                        <h1>Blog Libel</h1>
                    </Box>
                </div>
                <div className="boxGrid">
                    <BlogPostList />
                </div>
            </>
        );
    }
}