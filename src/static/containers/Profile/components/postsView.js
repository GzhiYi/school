import React, { Component } from 'react';
import Table from 'antd/lib/table';

const columns = [{
	title: '标题',
	dataIndex: 'title',
	render: text => <a href="#">{text}</a>,
}, {
	title: '发帖时间',
	dataIndex: 'time',
}, {
	title: 'Address',
	dataIndex: 'address',
}];
const data = [{
	key: '1',
	name: 'John Brown',
	age: 32,
	address: 'New York No. 1 Lake Park',
}, {
	key: '2',
	name: 'Jim Green',
	age: 42,
	address: 'London No. 1 Lake Park',
}, {
	key: '3',
	name: 'Joe Black',
	age: 32,
	address: 'Sidney No. 1 Lake Park',
}, {
	key: '4',
	name: 'Disabled User',
	age: 99,
	address: 'Sidney No. 1 Lake Park',
}];

const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	},
	getCheckboxProps: record => ({
		disabled: record.name === 'Disabled User', // Column configuration not to be checked
		name: record.name,
	}),
};

class PostsView extends Component {
	constructor(props) {
		super(props);
	}
	onClick = () => {
		
	}
	render() {
		return (
			<div>
				<Table rowSelection={rowSelection} columns={columns} dataSource={data} />
			</div>
		);
	}
}

export default PostsView;