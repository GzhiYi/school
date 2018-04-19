import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import ReactQuill from 'react-quill';
import * as actionCreators from '../../../actions/forum';

import './style.scss';
class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postType: "1",
            postTitle: "",
            editorHtml: ""
        }
    }

    handleChange = (e) => {
        console.log('e', e.target.value);
        this.setState({
            postType: e.target.value
        });
    }   
    
    handleTitleChange = (e) => {
        this.setState({
            postTitle: e.target.value
        });
    }
    
    handleEditorChange = (html) => {
        this.setState({
            editorHtml: html
        });
    }

    back = () => {
        this.props.dispatch(push("/forum"));
    }

    addPost = () => {
        console.log(this.state);
        if (this.state.postTitle === '') {
            message.error("等等，你漏了标题啊！")
        } else {
            let user = JSON.parse(Cookies.get('user'));
            let data = {
                "title": this.state.postTitle,
                "author": user.id,
                "content": this.state.editorHtml,
                "post_type": Number(this.state.postType)
            }
            this.props.actions.addPost(Cookies.get('token'), data);
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-offset-1 col-lg-10">
                            <div className="new-post">
                                <div className="title"> 
                                    <span onClick={this.back}>返回</span> / 发表帖子
                                </div>
                                <div className="new-post-content">
                                    <div className="post-type">
                                        <select
                                            name="postType"
                                            className="post-type-select"
                                            value={this.state.postType}
                                            onChange={this.handleChange}
                                        >
                                            <option disabled>选择主题分类</option>
                                            <option value="1">交流</option>
                                            <option value="2">分享</option>
                                            <option value="3">求助</option>
                                        </select>
                                    </div>

                                    <div className="post-title">
                                        <input 
                                            type="text" 
                                            name="postTitle"
                                            className="post-title-input"
                                            value={this.state.postTitle}
                                            placeholder="帖子标题"
                                            onChange={this.handleTitleChange}
                                        />
                                    </div>
                                </div>

                                <div className="post-editor">
                                    <ReactQuill
                                        onChange={this.handleEditorChange}
                                        value={this.state.editorHtml}
                                        modules={NewPost.modules}
                                        formats={NewPost.formats}
                                        // bounds={'.app'}
                                    />
                                </div>

                                <div className="post-buttons">
                                    {/* <button type="button" className="btn save-draft" disabled>保存草稿</button> */}
                                    <Button 
                                        onClick={this.addPost} 
                                        type="primary"
                                        disabled={this.state.editorHtml === "" || this.state.editorHtml === '<p><br></p>' ? true : false}
                                    >
                                        发布帖子
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
NewPost.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
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
NewPost.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

/* 
 * PropType validation
 */
NewPost.propTypes = {
    placeholder: React.PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
export { NewPost };