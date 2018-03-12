import React, { Component } from 'react';
import Table from 'antd/lib/table';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import message from 'antd/lib/message';
const Search = Input.Search;

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
        sorter: (a, b) => new Date(a.time) - new Date(b.time),
    }];
const data = [{
    key: '1',
    name: '张三',
    email: 'gzy@grr.la',
    phone: '123331111',
    registerTime: '2018-2-1'
}, {
    key: '2',
    name: '张三1',
    email: 'gzy@grr.la',
    phone: '123331111',
    registerTime: '2018-2-1'
}, {
    key: '3',
    name: '张三2',
    email: 'gzy@grr.la',
    phone: '123331111',
    registerTime: '2018-2-1'
}, {
    key: '4',
    name: '张三3',
    email: 'gzy@grr.la',
    phone: '123331111',
    registerTime: '2018-2-1'
}];

class AdminUserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRows: [],
            selectedRowKeys: []
        }
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
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                    />
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
        );
    }
}

export default AdminUserView;