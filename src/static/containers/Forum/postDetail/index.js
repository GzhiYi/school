import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/forum';
import ReactQuill from 'react-quill';
import Anchor from 'antd/lib/anchor';
import Button from 'antd/lib/button';
import Spin from 'antd/lib/spin';
import Icon from 'antd/lib/icon';
import './style.scss';
import Img from "../../../images/github.png";
import moment from 'moment';

const { Link }= Anchor;
class PostDetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorHtml: "",
            currentPage: 1,
            currentComments: [],
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let postId = location.pathname.split('/')[3];
        this.props.actions.listPosts(postId);
        this.props.actions.listComments(postId, 1, (response) => {
            let currentComments = this.state.currentComments;
            _.map(response.results, item => {
                currentComments.push(item)
            })
            this.setState({
                currentComments
            });
        });
    }
    
    handleEditorChange = (html) => {
        this.setState({
            editorHtml: html
        });
    }
    
    back = () => {
        this.props.dispatch(push('/forum'));
    }

    goToLogin = () => {
        this.props.dispatch(push('/login'));
    }

    goToRegister = () => {
        this.props.dispatch(push('/register'));
    }

    getNext = () => {
        let currentPage = this.state.currentPage;
        currentPage++;
        this.props.actions.listComments(location.pathname.split('/')[3], currentPage, (response) => {
            let currentComments = this.state.currentComments;
            _.map(response.results, item => {
                currentComments.push(item)
            })
            this.setState({
                currentComments,
                currentPage
            });
        });
    }

    getLast = () => {
        let currentPage = this.state.currentPage;
        this.props.actions.listComments(location.pathname.split('/')[3], currentPage, (response) => {
            let currentComments = this.state.currentComments;
            _.map(response.results, (item, index) => {
                if (index + 1 === response.results.length) {
                    currentComments.push(item)
                }
            })
            this.setState({
                currentComments,
                currentPage
            });
        });
    }

    addComments = () => {
        let user = JSON.parse(Cookies.get('user'));
        let data = {
            'post': location.pathname.split('/')[3],
            'author': JSON.parse(Cookies.get('user')).id,
            'content': this.state.editorHtml
        }
        this.props.actions.addComments(Cookies.get('token'), data, location.pathname.split('/')[3], () => {
            this.getLast()
        });
        this.setState({
            editorHtml: '',
        });
    }

    render() {
        let token = Cookies.get('token');
        let user = JSON.parse(Cookies.get('user'));
        let post = this.props.posts;
        let comments = this.props.comments;
        let firstFloor = '';
        let renderComments = '';
        if (post) {
            post = post.results[0];
            firstFloor = 
                <div id="first-floor" className="post-floor first-floor">
                    <div className="avatar">
                        <img src={post.author.photo_url} alt="avatar" />
                    </div>
                    <div className="name-time">
                        <div className="user-name">
                            <span className="author-name">{post.author.first_name}</span>
                        </div>
                        <div className="post-create-time">{moment(post.date_created).format('YYYY-MM-DD')}</div>
                    </div>

                    <div className="content" dangerouslySetInnerHTML={{ __html: post.content}}>
                        
                    </div>

                    {/* <div className="footer"> 暂时隐藏
                        <i className="fa fa-smile-o" aria-hidden="true"></i> {post.thumbs_up}
                        &nbsp;
                        <i className="fa fa-frown-o" aria-hidden="true"></i> {post.step_on}
                    </div> */}
                </div>
        }
        if (comments) {
            renderComments = _.map(this.state.currentComments, (comment, index) => {
                return (
                    <div className="post-floor" key={index}>
                        <div className="avatar">
                            <img src={comment.author.photo_url} alt="avatar" />
                        </div>
                        <div className="name-time">
                            <div className="user-name">
                                <span className="author-name">{comment.author.first_name}</span>
                            </div>
                            <div className="post-create-time">
                                {
                                    moment(comment.date_created).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD') 
                                    ?
                                        moment(comment.date_created).format('HH:mm')
                                    :
                                        moment(comment.date_created).format('YYYY-MM-DD HH:mm')
                                }
                            </div>
                        </div>

                        <div className="content" dangerouslySetInnerHTML={{ __html: comment.content }}>
                            
                        </div>

                        <a className="reply">
                            <i className="fa fa-reply" aria-hidden="true"></i> 回复
                                        </a>
                        {/* <div className="footer"> 暂时隐藏
                            <i className="fa fa-heart" aria-hidden="true"></i> {comment.thumbs_up}
                        </div> */}
                    </div>
                )
            })
        }
        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-offset-1 col-lg-10 post-detail">
                            <div>
                                <div className="title">
                                    <span className="post-back" onClick={this.back}>全部帖子</span> / <span className="post-detail-title">
                                        {post && !_.has(post, 'results') ? post.title : ""}
                                    </span> 
                                </div>
                                
                                <div className="col-lg-8">
                                    {firstFloor}
                                    {renderComments}
                                </div>

                                <div className="col-lg-offset-1 col-lg-2">
                                    <Anchor>
                                        <Link href="#first-floor" title="一楼" />
                                        <Link href="#take-a-comment" title="回复本帖" />
                                    </Anchor>
                                </div>

                                <div className="col-lg-8">
                                    <div className="fresh">
                                        {
                                            this.props.isFetchingComments
                                                ?
                                                <Spin indicator={antIcon} />
                                                :
                                                <a onClick={this.getNext}>更多</a>
                                        }
                                    </div>
                                </div>

                                <div className="col-lg-12" id="take-a-comment">
                                    <div className="reply-area col-lg-9">
                                        {
                                            token 
                                            ?
                                                <Spin spinning={this.props.isAddingComments ? this.props.isAddingComments : false}>
                                                    <ReactQuill
                                                        onChange={this.handleEditorChange}
                                                        value={this.state.editorHtml}
                                                        modules={PostDetailView.modules}
                                                        formats={PostDetailView.formats}
                                                    // bounds={'.app'}
                                                    />
                                                </Spin>
                                            :
                                                <div className="notify-login">
                                                    <p>
                                                        您需要登录后才可以回帖 <a onClick={this.goToLogin}>登录 </a> | <a onClick={this.goToRegister}>注册</a>
                                                    </p>
                                                </div>
                                        }
                                        <div className="button-area">
                                            <Button type="primary" onClick={this.addComments} disabled={this.state.editorHtml === "" || this.state.editorHtml === '<p><br></p>' ? true : false}>评论</Button>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-3">
                                        <div className="replyer-avatar">
                                            <img 
                                                className="replyer-avatar-img"
                                                src={user ? user.photo_url : ''} 
                                                alt="头像啦"                                            
                                            />
                                        </div>
                                        <div>
                                            <p className="replyer">{user ? user.first_name : ''}</p>
                                        </div>
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

PostDetailView.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        // ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
PostDetailView.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

/* 
 * PropType validation
 */
PostDetailView.propTypes = {
    placeholder: React.PropTypes.string,
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
        posts: state.forum.posts,
        comments: state.forum.comments,
        isAddingComments: state.forum.isAddingComments,
        isFetchingComments: state.forum.isFetchingComments,
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