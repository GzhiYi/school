import React, { Component } from 'react';
import Select from 'antd/lib/select';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import ReactQuill from 'react-quill';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as actionCreators from '../../../actions/introduce';
const Option = Select.Option;

class AdminIntroduceView extends Component {
    state = {
        showEditor: false,
        editorHtml: "",
        title: '',
        currentTarget: '',
    }

    handleEditorChange = (html) => {
        this.setState({
            editorHtml: html
        });
    }

    handleChange = (value) => {
        const showEditor = this.state.showEditor;
        if (!showEditor) {
            this.setState({
                showEditor: true,
                currentTarget: value
            });
        }
        this.props.actions.getIntroduceDetail(value, (response) => {
            if (response.length > 0) {
                this.setState({
                    editorHtml: response[0].body,
                    title: response[0].title
                });
            } else {
                this.setState({
                    editorHtml: '',
                    title: ''
                });
            }
        });
    }

    onTitleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            title: e.target.value
        });
    }

    updateIntroduce = () => {
        console.log("提交的内容为:", this.state.editorHtml);
        let token = Cookies.get('token');
        let data = {
            "title": this.state.title,
            "body": this.state.editorHtml
        }
        console.log("object", this.state.currentTarget);
        this.props.actions.updateIntroduceDetail(token, this.state.currentTarget, data, () => {})
    }

    render() {
        console.log("detail", this.props.introduceDetail);
        console.log("???", this.state.editorHtml);
        return (
            <div className="admin-introduce">
                <div className="select-title">
                    <Select defaultValue="选择要修改的介绍内容" style={{ width: 220 }} onChange={this.handleChange}>
                        <Option value="school">学校</Option>
                        <Option value="college">学院</Option>
                        <Option value="profession">专业</Option>
                        <Option value="teacher">老师</Option>
                        <Option value="society">社团</Option>
                    </Select>

                    {
                        this.state.showEditor
                        ?
                            <div className="title">
                                <Input 
                                    placeholder="标题" 
                                    onChange={this.onTitleChange} 
                                    name="title"
                                    value={this.state.title}
                                />
                            </div>
                        :
                            ''
                    }
                </div>
                {
                    this.state.showEditor
                    ?
                        <div className="editor">
                            <ReactQuill
                                onChange={this.handleEditorChange}
                                value={this.state.editorHtml}
                                defaultValue={this.state.editorDefault}
                                modules={AdminIntroduceView.modules}
                                formats={AdminIntroduceView.formats}
                            // bounds={'.app'}
                            />
                            <div className="submit-button">
                                <Button
                                    type="primary"
                                    onClick={this.updateIntroduce}
                                >
                                    更改
                                </Button>
                            </div>
                        </div>
                    :
                        ''
                }
            </div>
        );
    }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
AdminIntroduceView.modules = {
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
AdminIntroduceView.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

/* 
 * PropType validation
 */
AdminIntroduceView.propTypes = {
    placeholder: React.PropTypes.string,
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
        introduceDetail: state.introduce.introduceDetail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminIntroduceView);
export { AdminIntroduceView };