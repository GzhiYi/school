import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/auth';
import Anchor from 'antd/lib/anchor';
import './style.scss';
import Img from "../../../images/github.png";

const { Link }= Anchor;
class PostDetailView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }
    
    
    back = () => {
        this.props.dispatch(push('/forum'));
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-offset-1 col-lg-10">
                            <div className="post-detail">
                                <div className="title">
                                    <span className="post-back" onClick={this.back}>返回</span> / <span className="post-detail-title">
                                    这是一个毕业设计
                                    </span> 
                                </div>
                                
                                <div className="col-lg-8">
                                    <div className="post-floor first-floor">
                                        <div className="avatar">
                                            <img src={Img} alt="avatar"/>
                                        </div>
                                        <div className="name-time">
                                            <div className="user-name">
                                                <span className="author-name">userName</span>
                                            </div>
                                            <div className="post-create-time">2018.1.5</div>
                                        </div>

                                        <div className="content">
                                            工作半年多，base上海，会写sql，有点编程基础。现在想学python，但是自律性较差，求队友一起监督
                                        </div>

                                        <div className="footer">
                                            <i className="fa fa-smile-o" aria-hidden="true"></i> 330
                                            &nbsp;
                                            <i className="fa fa-frown-o" aria-hidden="true"></i> 220
                                        </div>
                                    </div>
                                    <div className="post-floor">
                                        <div className="avatar">
                                            <img src={Img} alt="avatar" />
                                        </div>
                                        <div className="name-time">
                                            <div className="user-name">
                                                <span className="author-name">userName</span>
                                            </div>
                                            <div className="post-create-time">2018.1.5</div>
                                        </div>

                                        <div className="content">
                                           我是2楼楼
                                        </div>

                                        <div className="reply">
                                            <i className="fa fa-reply" aria-hidden="true"></i> 回复
                                        </div>
                                        <div className="footer">
                                            <i className="fa fa-heart" aria-hidden="true"></i> 98
                                        </div>
                                    </div>
                                    <div className="post-floor">
                                        <div className="avatar">
                                            <img src={Img} alt="avatar" />
                                        </div>
                                        <div className="name-time">
                                            <div className="user-name">
                                                <span className="author-name">userName</span>
                                            </div>
                                            <div className="post-create-time">2018.1.5</div>
                                        </div>

                                        <div className="content">
                                            地板  
                                        </div>
                                        <div className="reply">
                                            <i className="fa fa-reply" aria-hidden="true"></i> 回复
                                        </div>
                                        <div className="footer">
                                            <i className="fa fa-heart" aria-hidden="true"></i> 44
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-offset-1 col-lg-2">
                                    <Anchor>
                                        <Link href="#components-anchor-demo-basic" title="一楼" />
                                        <Link href="#components-anchor-demo-fixed" title="回复本帖" />
                                    </Anchor>
                                </div>

                                <div className="col-lg-12">
                                    <div className="load-more">
                                        更多
                                    </div>
                                </div>
                            </div>
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
        statusText: state.auth.statusText
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);
export { PostDetailView };