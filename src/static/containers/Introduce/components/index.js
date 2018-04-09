import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Breadcrumb from 'antd/lib/breadcrumb';
import Icon from 'antd/lib/icon'; 
import * as actionCreators from '../../../actions/introduce';
import moment from 'moment';


class IntroduceDetailView extends Component {
    componentDidMount() {
        let type = location.pathname.split('/')[2];
        console.log(type);
        this.props.actions.getIntroduceDetail(type);
    }

    goHome = () => {
        this.props.dispatch(push('/introduce'));
    }
    
    render() {
        let detail = this.props.introduceDetail;
        let title = '';
        let dateUpdated = '';
        let body = '';
        console.log(detail);
        if (detail && detail.length > 0) {
            title = detail[0].title;
            dateUpdated = moment(detail[0].date_updated).format("YYYY-MM-DD");
            body = detail[0].body;
        }
        return (
            <div className="introduce-content">
                <Breadcrumb>
                    <Breadcrumb.Item onClick={this.goHome}>
                        <Icon type="home" />
                    </Breadcrumb.Item>
                </Breadcrumb>
                <h3 className="header">{title}</h3>
                <p className="date-updated">{dateUpdated}</p>
                <div className="body" dangerouslySetInnerHTML={{ __html: body}}>
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
        introduceDetail: state.introduce.introduceDetail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntroduceDetailView);
export { IntroduceDetailView };