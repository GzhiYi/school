import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Input from 'antd/lib/input';
import Carousel from 'antd/lib/carousel';
const Search = Input.Search;

import './style.scss';
class RightSideBar extends Component {
    constructor(props) {
        super(props);
    }

    onChange = (a, b, c) => {
        console.log(a, b, c);
    }

    createPost = () => {
        console.log('???');
        this.props.dispatch(push('/forum/new-post'));
    }

    render() {
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
                                <li>
                                    <span className="recommend1">1</span>
                                    <a>标题1</a>
                                </li>
                                <li>
                                    <span className="recommend2">2</span>
                                    <a>标题2</a>
                                </li>
                                <li>
                                    <span className="recommend3">3</span>
                                    <a>标题3</a>
                                </li>
                                <li>
                                    <span className="recommend4">4</span>
                                    <a>标题4</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        location: state.routing.location
    };
};

export default connect(mapStateToProps)(RightSideBar);