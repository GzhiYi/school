import React, { Component } from 'react';
import Select from 'antd/lib/select';
import Input from 'antd/lib/input';
import ReactQuill from 'react-quill';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as actionCreators from '../../../actions/introduce';
import Button from 'antd/lib/button';
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
const Option = Select.Option;

class AdminIntroduceView extends Component {
    state = {
        showEditor: false,
        editorHtml: "",
        title: '',
        currentTarget: '',
        imageUrl: '',
        is_upload: false,
    }

    handleEditorChange = (html) => {
        this.setState({
            editorHtml: html
        });
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload = (file) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('大小不能超过2M。');
        }
        return isLt2M;
    }

    handleUploadChange = (info) => {
        this.setState({
            is_upload: true,
        });
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            message.success("图片上传成功。");
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl: `http://p7b9iw239.bkt.clouddn.com/${info.file.response.hash}`,
                loading: false,
            }));
        }
    }

    onPreview = (file) => {
        window.open(`http://p7b9iw239.bkt.clouddn.com/${file.response.hash}`)
    }

    handleChange = (value) => {
        const showEditor = this.state.showEditor;
        if (!showEditor) {
            this.setState({
                showEditor: true,
            });
        }
        this.setState({
            currentTarget: value,
            imageUrl: '',
            is_upload: false,
        });
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
        this.setState({
            title: e.target.value
        });
    }

    updateIntroduce = () => {
        let token = Cookies.get('token');
        let data = {
            "title": this.state.title,
            "body": this.state.editorHtml
        }
        if (this.state.is_upload) {
            let updateData = {
                "introduce_type": this.state.currentTarget,
                "cover": this.state.imageUrl,
                "title": this.state.title
            }
            this.props.actions.updateBaseIntroduce(Cookies.get('token'), updateData);
        }
        console.log("what in current target", this.state.currentTarget);
        this.props.actions.updateIntroduceDetail(token, this.state.currentTarget, data, () => {})
    }

    render() {
        const uploadData = {
            'token': 'CGcNHo5yT0y9m-kFKMD9j5PSOKdpY3c5OUr6DVVM:mwzjCW_vU4qTtgrqTES2Sn_p1CM=:eyJzY29wZSI6ImltYWdlcyIsImRlYWRsaW5lIjoxNTM2OTEwMzM2fQ=='
        }
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
                            [<div key="title" className="title">
                                <Input 
                                    placeholder="标题" 
                                    onChange={this.onTitleChange} 
                                    name="title"
                                    value={this.state.title}
                                />
                            </div>,
                            <div className="upload-div" key="upload">
                                <Upload
                                    name="file"
                                    listType="picture"
                                    // showUploadList={false}
                                    action="https://upload-z2.qiniup.com"
                                    beforeUpload={this.beforeUpload}
                                    data={uploadData}
                                    onPreview={this.onPreview}
                                    onChange={this.handleUploadChange}
                                >
                                    <Button>
                                        <Icon type="upload" /> 上传封面
                                    </Button>
                                </Upload>
                            </div>]
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