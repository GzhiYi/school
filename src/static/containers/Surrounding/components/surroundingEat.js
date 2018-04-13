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
class SurroundingEatView extends Component {
    state = {
        visible: false,
        title: '',
        content: '',
        description: ''
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
                'description': description
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
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    description: eat.description,
                    content: eat.content,
                    date_created: eat.date_created
                });
            })
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
                            extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
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