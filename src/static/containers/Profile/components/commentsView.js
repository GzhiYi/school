import React, { Component } from 'react';
import List from 'antd/lib/list';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';

const Search = Input.Search;
class CommentsView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = [
            {
                title: '这是一个毕业设计',
                postTime: '2018-2-2',
            },
            {
                title: '今天有谁上课的？',
                postTime: '2018-2-2'
            },
            {
                title: '哇，外面天气真不错',
                postTime: '2018-2-2'
            },
            {
                title: '来来来',
                postTime: '2018-2-2'
            },
            {
                title: '哇，外面天气真不错',
                postTime: '2018-2-2'
            },
            {
                title: '来来来',
                postTime: '2018-2-2'
            },
            {
                title: '哇，外面天气真不错',
                postTime: '2018-2-2'
            },
            {
                title: '来来来',
                postTime: '2018-2-2'
            },
        ];
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
                                    title="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    />
                </div>
                
                <div className="view-more">
                    <a>更多</a>
                </div>
			</div>
        );
    }
}

export default CommentsView;