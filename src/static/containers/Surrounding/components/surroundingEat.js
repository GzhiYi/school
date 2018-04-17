import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as actionCreators from '../../../actions/surrounding';
import Collapse from 'antd/lib/collapse';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Input from 'antd/lib/input';
import Alert from 'antd/lib/alert';
import message from 'antd/lib/message';
import moment from 'moment';
const { TextArea } = Input;
import List from 'antd/lib/list';
import Avatar from 'antd/lib/avatar';
import Icon from 'antd/lib/icon';
import Upload from 'antd/lib/upload';
class SurroundingEatView extends Component {
    state = {
        visible: false,
        title: '',
        content: '',
        description: '',
        imageUrl: '',
    }

    componentDidMount() {
        this.props.actions.getEat()
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        let title = this.state.title;
        let content = this.state.content;
        let description = this.state.description;
        if (title === '') {
            message.error("请输入标题！");
        } else if (description === '') {
            message.error("不来点描述吗!？？");
        } else if (content === '') {
            message.error("请输入内容!");
        } else {
            console.log(title, content);
            let data = {
                'title': title,
                'content': content,
                'description': description,
                'cover': this.state.imageUrl,
            }
            this.props.actions.addEat(Cookies.get('token'), data);
            this.setState({
                visible: false,
            });
        }
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    onInputChange = (e) => {
        console.log(e.target.value);
        switch (e.target.name) {
            case 'title':
                this.setState({
                    title: e.target.value,
                });
                break;
            case 'description':
                this.setState({
                    description: e.target.value,
                });
                break
            case 'content':
                this.setState({
                    content: e.target.value,
                });
                break;
            default:
                break;
        }
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
    render() {
        let listData = [];

        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );

        let eatData = this.props.eat;
        if (eatData) {
            _.map(eatData.results, (eat, index) => {
                listData.push({
                    // href: 'http://ant.design',
                    title: eat.title,
                    avatar: eat.cover,
                    description: eat.description,
                    content: eat.content,
                    date_created: eat.date_created
                });
            })
        }
        const uploadData = {
            'token': 'CGcNHo5yT0y9m-kFKMD9j5PSOKdpY3c5OUr6DVVM:mwzjCW_vU4qTtgrqTES2Sn_p1CM=:eyJzY29wZSI6ImltYWdlcyIsImRlYWRsaW5lIjoxNTM2OTEwMzM2fQ=='
        }
        return (
            <div>
                <div className="button-area">
                    <Button type="primary" onClick={this.showModal}>发布</Button>
                </div>
                <hr/>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={listData}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[<span className="panel-time">{moment(item.date_created).format('YYYY-MM-DD HH:mm')}</span>]}
                            extra={<div className="img-out"><img alt="cover" src={item.avatar} /></div>}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />

                {
                    this.state.visible
                        ?
                        <Modal
                            title="有什么好吃的好喝的分享呢～～"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <Input
                                name="title"
                                placeholder="分享什么"
                                onChange={this.onInputChange}
                                style={{ marginBottom: 20 }}
                            />

                            <Input
                                name="description"
                                placeholder="一句话描述下"
                                onChange={this.onInputChange}
                                style={{ marginBottom: 20 }}
                            />

                            <TextArea
                                placeholder="输入内容"
                                name="content"
                                autosize={{ minRows: 5, maxRows: 10 }}
                                style={{ marginBottom: 20 }}
                                onChange={this.onInputChange}
                            />

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
                        </Modal>
                        :
                        ''
                } 
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        eat: state.surrounding.eat,
        isFetchingEat: state.surrounding.isFetchingEat
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurroundingEatView);
export { SurroundingEatView };