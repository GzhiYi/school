import React, { Component } from 'react';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import ReactQuill from 'react-quill';
const Option = Select.Option;

class AdminIntroduceView extends Component {
    state = {
        showEditor: false,
        editorHtml: ""
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
                showEditor: true
            });
        }
        console.log(`selected ${value}`);
    }

    updateIntroduce = () => {
        console.log("提交的内容为:", this.state.editorHtml);
    }

    render() {
        return (
            <div className="admin-introduce">
                <Select defaultValue="选择要修改的介绍内容" style={{ width: 220 }} onChange={this.handleChange}>
                    <Option value="school">学校</Option>
                    <Option value="college">学院</Option>
                    <Option value="profession">专业</Option>
                    <Option value="teachers">老师</Option>
                </Select>
                {
                    this.state.showEditor
                    ?
                        <div className="editor">
                            <ReactQuill
                                onChange={this.handleEditorChange}
                                value={this.state.editorHtml}
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
export default AdminIntroduceView;