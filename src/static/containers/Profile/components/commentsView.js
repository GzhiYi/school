import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as actionCreators from '../../../actions/forum';
import List from 'antd/lib/list';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Spin from 'antd/lib/spin';
import moment from 'moment';

const Search = Input.Search;
class CommentsView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let user = Cookies.get('user');
        this.props.actions.listComments(null, JSON.parse(user).id, 1, () => {});
    }

    goToDetail = (postId) => {
        window.open(`/forum/detail/${postId}`);
    }
    

    render() {
        let comments = this.props.comments;
        let data = [];
        if (comments) {
            _.map(comments.results, (comment, index) => {
                data.push({
                    title: comment.post.title,
                    postId: comment.post.id,
                    postTime: moment(comment.date_created).format('YYYY-MM-DD HH:mm:ss'),
                    content: comment.content,
                });
            })
        }
        return (
            <div>
                <div className="search">
                    <Search
                        placeholder="回复内容"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                    />
                </div>
                <div className="comments-view-page">
                    <Spin tip="加载评论数据中..." spinning={this.props.isFetchingComments}>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        description={[
                                            <a
                                                className="origin-post"
                                                key="1"
                                                onClick={() => {this.goToDetail(item.postId)}}
                                            >
                                                原贴: {item.title}
                                                <Icon type="link" />
                                            </a>,
                                            <span
                                                className="post-time"
                                                key="2"
                                            >
                                                {item.postTime}
                                            </span>
                                        ]}
                                        title={<div dangerouslySetInnerHTML={{ __html: item.content}}></div>}
                                    />
                                </List.Item>
                            )}
                        />
                        </Spin>
                </div>
                
                <div className="view-more">
                    <a>更多</a>
                </div>
			</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isFetchingComments: state.forum.isFetchingComments,
        comments: state.forum.comments
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsView);
export { CommentsView };