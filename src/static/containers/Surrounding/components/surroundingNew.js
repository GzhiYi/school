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

const Panel = Collapse.Panel;
class SurroundingNewView extends Component {
    state = { 
        visible: false,
        title: '',
        content: '', 
    }

    componentDidMount() {
        this.props.actions.getAllQuickNew()
    }
    

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        let title = this.state.title;
        let content = this.state.content;
        if (title === '') {
            message.error("请输入标题！");
        } else if (content === '') {
            message.error("请输入内容!");
        } else {
            console.log(title, content);
            let data = {
                'title': title,
                'content': content,
            }
            this.props.actions.addQuickNew(Cookies.get('token'), data);
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
        const customPanelStyle = {
            background: '#f7f7f7',
            borderRadius: 4,
            marginBottom: 24,
            border: 0,
            overflow: 'hidden',
        };
        let quickNew = this.props.quickNew;
        let user = Cookies.get('user');
        let renderQuickNew = '';
        if (quickNew) {
            renderQuickNew = _.map(quickNew.results, (item, index) => {
                return (
                    <Panel header={<h6>{item.title}<span className="panel-time">{moment(item.date_created).format('YYYY-MM-DD HH:mm')}</span></h6>} key={`${index}`} style={customPanelStyle}>
                        <p>{item.content}</p>
                    </Panel>
                )
            })
        }
        return (
            <div>
                {
                    user ? JSON.parse(user).is_superuser
                    ?
                        <div className="button-area">
                            <Button type="primary" onClick={this.showModal}>添加快讯</Button>
                        </div>
                        :
                            ''
                    :
                        ''
                }
                <Collapse bordered={false} defaultActiveKey={['0']}>
                    {renderQuickNew}
                </Collapse>
                {
                    this.state.visible
                    ?
                        <Modal
                            title="发布一条快讯"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <Input
                                name="title"
                                placeholder="快讯标题"
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
                            <Alert message="注意，发布的快讯将公布于所有人，请确保信息的准确性。" type="info" showIcon />
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
        quickNew: state.surrounding.quickNew,
        isFetchingQuickNew: state.surrounding.isFetchingQuickNew
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurroundingNewView);
export { SurroundingNewView };