import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/forum';
import Jpg from '../../../images/github.png';
import Tag from 'antd/lib/tag';
import _ from 'lodash';
import moment from 'moment';

import './style.scss';
class Posts extends Component {

    componentDidMount() {
        this.props.actions.listPosts();
        this.props.actions.listTopPosts();
    }
    

    showPostDetail = (index) => {
        this.props.dispatch(push(`/forum/detail/${index}`));
    }

    renderPosts(data, isTop=false) {
        return (
            _.map(data, (item, index) => {
                let postType = '';
                let color = '';
                switch (item.post_type) {
                    case 1:
                        postType = "交流";
                        color = 'green';
                        break;
                    case 2:
                        postType = "分享";
                        color = 'blue';
                        break;
                    case 3:
                        postType = "求助";
                        color = 'orange';
                        break;
                    default:
                        break;
                }
                return (
                    <div className="list-item" key={index}>
                        <a href="#" className="list-item-avatar">
                            <img src={item.author.photo_url} alt="头像" />
                        </a>
                        <div className="list-content">
                            {
                                isTop
                                ?
                                    <Tag color="volcano">置顶</Tag>
                                :
                                    ''
                            }
                            <Tag color={color}>{postType}</Tag>
                            <a
                             className="list-title"
                             onClick={() => this.showPostDetail(item.id)}
                            >
                                {item.title}
                            </a>
                        </div>
                        <div className="list-footer">
                            <div className="author">
                                <a href="#">{item.author.first_name}</a>
                            </div>
                            <div className="read-count">
                                <i className="fa fa-eye" aria-hidden="true"></i>
                                <span>{item.visited}</span>
                            </div>
                            <div className="comment-count">
                                <i className="fa fa-comment" aria-hidden="true"></i>
                                <span>{item.comment}</span>
                            </div>
                            <div className="last-comment">
                                <div className="last-commenter">
                                    gzhiyi
                                </div>
                                <div className="last-comment-time">
                                    {moment(item.last_comment).format("YYYY-MM-DD")}
                                </div>
                            </div>
                            <div className="post-time">
                                {moment(item.date_created).format("YYYY-MM-DD")}
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

    render() {
        let renderPosts = null;
        let renderTopPosts = null;
        let test = [];
        let testTop = [];
        // testTop.length = 5;
        // test.length = 30;
        if (this.props.posts) {
            let postsData = this.props.posts;
            _.map(postsData.results, (post, index) => {
                test.push(post);
            });
            renderPosts = this.renderPosts(test);
        }

        if (this.props.topPosts) {
            let postsData = this.props.topPosts;
            _.map(postsData.results, (post, index) => {
                testTop.push(post);
            });
            renderTopPosts = this.renderPosts(testTop, true);
        }
        
        console.log('render');
        return (
            <div className="posts">
                <div className="top-posts">
                    <div className="render-top-posts">
                        {renderTopPosts}
                    </div>
                </div>
                <div className="common-posts">
                    <div className="posts-main-title">
                        主题
                    </div>
                    <div className="render-posts">
                        {renderPosts}
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
        posts: state.forum.posts,
        topPosts: state.forum.topPosts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
export { Posts };