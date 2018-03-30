import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as actionCreators from '../../../actions/forum';
import { connect } from 'react-redux';
import Input from 'antd/lib/input';
import Carousel from 'antd/lib/carousel';
const Search = Input.Search;

import './style.scss';
class RightSideBar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.listRecommendedPosts();
    }
    

    onChange = (a, b, c) => {
        // console.log(a, b, c);
    }

    showPostDetail = (index) => {
        this.props.dispatch(push(`/forum/detail/${index}`));
    }

    createPost = () => {
        console.log('???');
        this.props.dispatch(push('/forum/new-post'));
    }

    render() {
        let recommended = '';
        let recommendedData = this.props.recommendedPosts;
        if (recommendedData) {
            recommended = _.map(recommendedData.results, (post, index) => {
                return (
                    <li key={index}>
                        <span className="recommend1">{index + 1}</span>
                        <a onClick={() => this.showPostDetail(post.id)}>{post.title}</a>
                    </li>
                )
            })
        }
        return (
            <div>
                <div className="search">
                    <Search
                        // placeholder="input search text"
                        onSearch={value => console.log(value)}
                        size="large"
                        enterButton
                    />
                </div>

                <div className="post-btn">
                    <button 
                        type="button" 
                        className="btn new-post-btn"
                        onClick={this.createPost}
                    >
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        发帖
                    </button>
                </div>
                <div className="recommend-posts">
                    <Carousel
                        afterChange={this.onChange}
                        autoplay
                    >
                        <div><h3>1</h3></div>
                        <div><h3>2</h3></div>
                        <div><h3>3</h3></div>
                        <div><h3>4</h3></div>
                    </Carousel>
                    <div className="carousel-below">
                        <div className="title">推荐帖子</div>
                        <div className="recommend-posts-list">
                            <ul>
                                {recommended}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
        recommendedPosts: state.forum.recommendedPosts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightSideBar);
export { RightSideBar };