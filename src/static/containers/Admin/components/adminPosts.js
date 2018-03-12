import React, { Component } from 'react';
import Table from 'antd/lib/table';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import message from 'antd/lib/message';
const Search = Input.Search;

const columns = [{
    title: '标题',
    dataIndex: 'title',
    render: text => <a href="#">{text}</a>,
}, {
    title: '发帖时间',
    dataIndex: 'time',
    sorter: (a, b) => new Date(a.time) - new Date(b.time),
}, {
    title: '发表人',
    dataIndex: 'sender'
}, {
    title: '类别',
    dataIndex: 'category',
    sorter: (a, b) => a.category.localeCompare(b.category, 'zh-Hans-CN', { sensitivity: 'accent' })
}];
const data = [{
    key: '1',
    title: '今天天气不错',
    time: '2018-2-2',
    sender: 'gzhiyi',
    category: '问答',
}, {
    key: '2',
    title: '今天天气不错',
    time: '2018-2-1',
    sender: 'gzhiyi',
    category: '求助',
}, {
    key: '3',
    title: '今天天气不错',
    time: '2018-2-23',
    sender: 'gzhiyi',
    category: '帮忙',
}, {
    key: '4',
    title: '今天天气不错',
    time: '2018-2-3',
    sender: 'gzhiyi',
    category: '问答',
}];

class AdminPostsView extends Component {
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
                                title="确认删除帖子？"
                                onConfirm={this.confirm}
                                onCancel={this.cancel}
                                okText="是的"
                                cancelText="算了"
                                placement="left"
                            >
                                <Button className="del-post-btn" type="danger">删除</Button>
                            </Popconfirm>
                            :
                            ''
                    }
                    <Search
                        placeholder="搜索"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                    />
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
        );
    }
}

export default AdminPostsView;