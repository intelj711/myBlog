import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }

    onDeleteClick() {
        this.props.deletePost(this.props.params.id)
            .then(() => { this.context.router.push('/'); });
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/">Back To Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}>
                    Delete Post
                </button>
                <div className="blog-content">
                    <h3>Title: {post.title}</h3>
                    <h6>Categories: {post.categories}</h6>
                    <p>Content: {post.content}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return { post: state.post.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);