import React, { Component } from 'react';
import Table from 'antd/lib/table';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
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
	title: '类别',
	dataIndex: 'category',
	sorter: (a, b) => a.category.localeCompare(b.category,  'zh-Hans-CN', {sensitivity: 'accent'})
}];
const data = [{
	key: '1',
	title: '今天天气不错',
	time: '2018-2-2',
	category: '问答',
}, {
	key: '2',
	title: '今天天气不错',
	time: '2018-2-1',
	category: '求助',
}, {
	key: '3',
	title: '今天天气不错',
	time: '2018-2-23',
	category: '帮忙',
}, {
	key: '4',
	title: '今天天气不错',
	time: '2018-2-3',
	category: '问答',
}];

class PostsView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRows: [],

		}
	}
	onClick = () => {
		
	}
	render() {
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
				this.setState({
					selectedRows
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
							<Button className="del-post-btn" type="danger">删除</Button>
						:
							''
					}
					<Search
						placeholder="标题"
						onSearch={value => console.log(value)}
						style={{ width: 200 }}
					/>
				</div>
				<Table rowSelection={rowSelection} columns={columns} dataSource={data} />
			</div>
		);
	}
}

export default PostsView;