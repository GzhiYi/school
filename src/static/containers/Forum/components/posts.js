import React, { Component } from 'react';

class Posts extends Component {
    render() {
        let renderPosts = null;
        renderPosts = 
            <div className="list-item">
                <a href="#" className="list-item-avatar">
                    <img src="#" alt="头像"/>
                </a>
                <div className="list-content">
                    <a href="#">标题标题</a>
                </div>
                <div className="list-footer">
                    <div className="author">
                        <a href="#">author</a>
                    </div>
                    <div className="read-count">
                        <i>icon</i>
                        <p>20</p>
                    </div>
                    <div className="comment-count">
                        <i>icon2</i>
                        <p>2022</p>
                    </div>
                    <div className="last-comment">
                        <div className="last-commenter">
                            gzhiyi
                        </div>
                        <div className="last-comment-time">
                            2017-12-31 20:59
                        </div>
                    </div> 
                    <div className="post-time">
                        2017-12-31
                    </div> 
                </div>
            </div>
        return (
            <div>
                {renderPosts}
            </div>
        );
    }
}

export default Posts;