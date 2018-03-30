import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/forum';
import Table from 'antd/lib/table';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import message from 'antd/lib/message';
import moment from 'moment';
const Search = Input.Search;

class AdminPostsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRows: [],
            selectedRowKeys: []
        }
    }

    componentDidMount() {
        this.props.actions.listPosts(null, 1, (response) => {
            console.log("nothing");
        })
    }
    

    confirm = (e) => {
        console.log(e);
        message.success('已经删除');
    }

    cancel = (e) => {
        console.log(e);
        message.error('选择取消');
    }

    goToPostDetail = (index) => {
        window.open(`/forum/detail/${index.key}`)
    }

    render() {

        const columns = [{
            title: '标题',
            dataIndex: 'title',
            render: (text, index) => <a onClick={() => this.goToPostDetail(index)}>{text}</a>,
        }, {
            title: '发帖时间',
            dataIndex: 'time',
            sorter: (a, b) => new Date(a.time) - new Date(b.time),
        }, {
            title: '发表人',
            dataIndex: 'sender'
        },{
            title: '评论数',
            dataIndex: 'comments'
        }, {
            title: '类别',
            dataIndex: 'category',
            sorter: (a, b) => a.category.localeCompare(b.category, 'zh-Hans-CN', { sensitivity: 'accent' })
        },{
            title: '置顶？',
            dataIndex: 'top',
            render: (text, index) => <a onClick={()=>{this.confirmRecovery(text, index)}} className={text === false ? "deleted" : 'normal'}>{text ? "已置顶" : "不是" }</a>
        },{
            title: '推荐？',
            dataIndex: 'recommended',
            render: (text, index) => <a onClick={()=>{this.confirmRecovery(text, index)}} className={text === false ? "deleted" : 'normal'}>{text ? "没错" : "不是" }</a>
        }];
        let data = [];
        const posts = this.props.posts;
        if (posts) {
            _.map(posts.results, (post, index) => {
                let postType = '';
                switch (post.post_type) {
                    case 1:
                        postType = "交流";
                        break;
                    case 2:
                        postType = "分享";
                        break;
                    case 3:
                        postType = "求助";
                        break;
                    default:
                        break;
                }
                data.push({
                    key: post.id,
                    title: post.title,
                    time: moment(post.date_created).format("YYYY-MM-DD HH:mm"),
                    sender: post.author.first_name,
                    comments: post.comment,
                    category: postType,
                    top: post.is_top,
                    recommended: post.is_recommended,
                });
            })
        }

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


const mapStateToProps = (state) => {
    return {
        posts: state.forum.posts,
        isFetchingPosts: state.forum.isFetchingPosts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPostsView);
export { AdminPostsView };