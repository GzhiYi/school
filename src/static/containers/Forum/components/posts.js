import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/auth';
import Jpg from '../../../images/github.png';
import _ from 'lodash';

import './style.scss';
class Posts extends Component {

    showPostDetail = (index) => {
        this.props.dispatch(push(`/forum/detail/${index}`));
    }

    renderPosts(data) {
        return (
            _.map(data, (item, index) => {
                return (
                    <div className="list-item" key={index}>
                        <a href="#" className="list-item-avatar">
                            <img src={Jpg} alt="头像" />
                        </a>
                        <div className="list-content">
                            <a
                             className="list-title"
                             onClick={() => this.showPostDetail(index)}
                            >
                                标题标题
                            </a>
                        </div>
                        <div className="list-footer">
                            <div className="author">
                                <a href="#">author</a>
                            </div>
                            <div className="read-count">
                                <i className="fa fa-eye" aria-hidden="true"></i>
                                <span>20</span>
                            </div>
                            <div className="comment-count">
                                <i className="fa fa-comment" aria-hidden="true"></i>
                                <span>2022</span>
                            </div>
                            <div className="last-comment">
                                <div className="last-commenter">
                                    gzhiyi
                                </div>
                                <div className="last-comment-time">
                                    2017-12-31 20:59
                                </div>
                            </div>
                            <div className="post-time">
                                2017-12-31
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
        testTop.length = 5;
        test.length = 30;
        renderTopPosts = this.renderPosts(testTop);
        renderPosts = this.renderPosts(test);
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
        statusText: state.auth.statusText
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