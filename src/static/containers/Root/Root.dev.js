import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import LocaleProvider from 'antd/lib/locale-provider';
import routes from '../../routes';
import DevTools from './DevTools';
import App from '../../app';


export default class Root extends React.Component {
    static propTypes = {
        store: PropTypes.shape().isRequired,
        history: PropTypes.shape().isRequired
    };

    render() {
        return (
            <div>
                <Provider store={this.props.store}>
                    <div>
                        <LocaleProvider locale={zhCN}>
                            <App>
                                <ConnectedRouter history={this.props.history}>
                                    {routes}
                                </ConnectedRouter>
                            </App>
                        </LocaleProvider>
                        <DevTools />
                    </div>
                </Provider>
            </div>
        );
    }
}
