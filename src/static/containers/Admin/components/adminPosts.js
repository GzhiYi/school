import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/forum';
import * as adminCteator from '../../../actions/admin';
import Table from 'antd/lib/table';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import message from 'antd/lib/message';
import Spin from 'antd/lib/spin';
import moment from 'moment';
const Search = Input.Search;

class AdminPostsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // selectedRows: [],
            // selectedRowKeys: []
        }
    }

    componentDidMount() {
        this.props.actions.listPosts(null, null, 1, (response) => {
            console.log("nothing");
        })
    }

    cancel = (e) => {
        console.log(e);
        message.warning('欢迎可次再来～');
    }

    goToPostDetail = (index) => {
        window.open(`/forum/detail/${index.key}`)
    }

    confirmHandle = (text, index, col) => {
        console.log(text, index, col);
        let method = null;
        let doType = null;
        switch (col) {
            case "top":
                console.log("top");
                if (index.top === "已置顶") {
                    method = 0;
                } else {
                    method = 1;
                }
                doType = 0;
                break;
            case "recommended":
                if (index.recommended === "已推荐") {
                    method = 0;
                } else {
                    method = 1;
                }
                doType = 1;
                break;
            case "delete":
                if (index.deleted === "正常") {
                    method = 1;
                } else {
                    method = 0;
                }
                doType = 2;
                break;
            default:
                break;
        }
        let putData = {
            "post_id": index.key,
            "method": method,
            "do": doType 
        };
        this.props.adminActions.adminHandlePost(Cookies.get("token"), putData , (response) => {
            this.props.actions.listPosts(null, null, 1, (response) => {
                console.log("nothing");
            })
        });
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
            sorter: (a, b) => a.top.localeCompare(b.top, 'zh-Hans-CN', { sensitivity: 'accent' }),
            render: (text, index) => 
                    <Popconfirm title="确定要修改该帖子是否置顶的状态吗？" onConfirm={() => { this.confirmHandle(text, index, "top") }} onCancel={this.cancel} okText="确认" cancelText="不啦">
                        <a
                            className={text !== "已置顶" ? "deleted" : 'normal'}
                        >
                            {text}
                        </a>
                    </Popconfirm>                   
        },{
            title: '推荐？',
            dataIndex: 'recommended',
            sorter: (a, b) => a.recommended.localeCompare(b.recommended, 'zh-Hans-CN', { sensitivity: 'accent' }),
            render: (text, index) => 
                <Popconfirm title="确定要修改该帖子是否推荐的状态吗？" onConfirm={() => { this.confirmHandle(text, index, "recommended") }} onCancel={this.cancel} okText="确认" cancelText="不啦">
                    <a 
                        className={text !== "已推荐" ? "deleted" : 'normal'}
                    >
                        {text}
                    </a>
                </Popconfirm>  
        },{
            title: '已删除？',
            dataIndex: 'deleted',
            sorter: (a, b) => a.deleted.localeCompare(b.deleted, 'zh-Hans-CN', { sensitivity: 'accent' }),
            render: (text, index) => 
                <Popconfirm title="确定要修改该帖子是否删除的状态吗？" onConfirm={() => { this.confirmHandle(text, index, "delete") }} onCancel={this.cancel} okText="确认" cancelText="不啦">
                    <a 
                        className={text !== "已删除" ? "deleted" : 'normal'}
                    >
                        {text}
                    </a>
                </Popconfirm> 
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
                    top: post.is_top ? "已置顶" : "不是置顶",
                    recommended: post.is_recommended ? "已推荐" : "不是推荐",
                    deleted: post.is_deleted ? "以删除" : "正常",
                });
            })
        }

        // const rowSelection = {
        //     onChange: (selectedRowKeys, selectedRows) => {
        //         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        //         this.setState({
        //             selectedRows,
        //             selectedRowKeys
        //         });
        //     },
        //     getCheckboxProps: record => ({
        //         disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //         name: record.name,
        //     }),
        // };
        // const { selectedRows } = this.state;
        return (
            <div>
                <div className="search">
                    {/* {
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
                    } */}
                    <Search
                        placeholder="搜索"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                    />
                </div>
                <Spin tip="加载帖子数据中..." spinning={this.props.isFetchingPosts}>
                    <Table columns={columns} dataSource={data} />
                </Spin>
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
        actions: bindActionCreators(actionCreators, dispatch),
        adminActions: bindActionCreators(adminCteator, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPostsView);
export { AdminPostsView };