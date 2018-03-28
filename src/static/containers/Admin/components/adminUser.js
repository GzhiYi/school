import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as actionCreators from '../../../actions/admin';
import Table from 'antd/lib/table';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import message from 'antd/lib/message';
import moment from 'moment';
const Search = Input.Search;
class AdminUserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRows: [],
            selectedRowKeys: []
        }
    }

    componentDidMount() {
        this.props.actions.getUsers(Cookies.get('token'));
    }
    
    confirm = (e) => {
        console.log(e);
        message.success('已经删除');
    }

    cancel = (e) => {
        console.log(e);
        message.error('选择取消');
    }
    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    selectedRows,
                    selectedRowKeys
                });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        const columns = [{
            title: '用户名',
            dataIndex: 'name',
            render: text => <a href="#">{text}</a>,
        }, {
            title: '邮箱',
            dataIndex: 'email',
            sorter: (a, b) => a.category.localeCompare(b.category, 'zh-Hans-CN', { sensitivity: 'accent' })
        }, {
            title: '手机号',
            dataIndex: 'phone',
            sorter: (a, b) => a.category.localeCompare(b.category, 'zh-Hans-CN', { sensitivity: 'accent' })
        }, {
            title: '注册时间',
            dataIndex: 'registerTime',
            sorter: (a, b) => new Date(a.registerTime) - new Date(b.registerTime),
        }];
        let data = [];
        let userData = this.props.userData;
        if (userData) {
            _.map(userData.results, (item, index) => {
                data.push({
                    key: index,
                    name: item.first_name,
                    email: item.email,
                    phone: item.phone_number === null ? "未填写手机号" : item.phont_number,
                    registerTime: moment(item.date_joined).format("YYYY-MM-DD")
                });
            })
        }
        const { selectedRows } = this.state;
        return (
            <div>
                <div className="search">
                    {
                        selectedRows.length > 0
                            ?
                            <Popconfirm
                                title="确认删除该用户？"
                                onConfirm={this.confirm}
                                onCancel={this.cancel}
                                okText="确认"
                                cancelText="算了"
                                placement="left"
                            >
                                <Button className="del-post-btn" type="danger">删除</Button>
                            </Popconfirm>
                            :
                            ''
                    }
                    <Search
                        placeholder="用户名"
                        onSearch={value => this.props.actions.getUsers(Cookies.get('token'), value)}
                        style={{ width: 200 }}
                    />
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
        userData: state.admin.userData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserView);
export { AdminUserView };