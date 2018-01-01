import React, { Component } from 'react';
import './style.scss';
class RightSideBar extends Component {
    render() {
        return (
            <div>
                <div className="post-btn">
                    <button type="button" className="btn new-post">发帖</button>
                </div>
            </div>
        );
    }
}

export default RightSideBar;