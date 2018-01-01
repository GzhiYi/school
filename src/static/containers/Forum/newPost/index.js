import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';


import './style.scss';
class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postType: "2",
            postTitle: "",
            text: ""
        }
    }

    handleChange = (e) => {
        console.log('e', e.target.value);
    }    
    
    handleEditorChange = (value) => {
        this.setState({
            text: value
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-offset-1 col-lg-10">
                            <div className="new-post">
                                <div className="title"> 
                                    发表帖子
                                </div>
                                <div className="new-post-content">
                                    <div className="post-type">
                                        <select
                                            name="postType"
                                            className="post-type-select"
                                            value={this.state.postType}
                                            onChange={this.handleChange}
                                        >
                                            <option>选择主题分类</option>
                                            <option value="1">选项1</option>
                                            <option value="2">选项2</option>
                                            <option value="3">选项3</option>
                                        </select>
                                    </div>

                                    <div className="post-title">
                                        <input 
                                            type="text" 
                                            name="postTitle"
                                            className="post-title-input"
                                            value={this.state.postTitle}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="post-editor">
                                    <ReactQuill value={this.state.text}
                                        onChange={this.handleEditorChange} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewPost;