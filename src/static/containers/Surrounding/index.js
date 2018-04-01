import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import Tabs from 'antd/lib/tabs';
import Icon from 'antd/lib/icon';
import * as actionCreators from '../../actions/data';
import SurroundingNewView from './components/surroundingNew';
import SurroundingEatView from './components/surroundingEat';
import SurroundingTrafficView from './components/surroundingTraffic';
import './style.scss';
const TabPane = Tabs.TabPane;
class SurroundingView extends React.Component {
    state = {
        path: null,
    }

    componentDidMount() {
        this.setState({
            path: location.pathname.split('/')[2],
        });
    }
    
    onTabChange = (key) => {
        let pushTo = null;
        switch (key) {
            case '1':
                pushTo="new";
                break;
            case '2':
                pushTo = "eat";
                break;
            case '3':
                pushTo = "traffic";
                break;
        
            default:
                break;
        }
        this.setState({
            path: pushTo,
        });
        this.props.dispatch(push(`/surrounding/${pushTo}`));
    }

    render() {
        const { path } = this.state;
        console.log("what in path", path);
        let activeKey = 1;
        switch (path) {
            case 'news':
                activeKey = 1;
                break;
            case 'eat':
                activeKey = 2;
                break;
            case 'traffic':
                activeKey = 3;
                break;
            default:
                break;
        }
        return (
            <div className="card-container">
                <Tabs 
                    type="card"
                    activeKey={String(activeKey)}
                    onChange={this.onTabChange}
                >
                    <TabPane tab={<span><Icon type="team" />校内快讯</span>} key="1">
                        <SurroundingNewView />
                    </TabPane>
                    <TabPane tab={<span><Icon type="shop" />吃喝玩乐</span>} key="2">
                        <SurroundingEatView />
                    </TabPane>
                    <TabPane tab={<span><Icon type="car" />去哪</span>} key="3">
                       <SurroundingTrafficView />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurroundingView);
export { SurroundingView as SurroundingViewNotConnected };