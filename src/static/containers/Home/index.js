import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';
import Slide from 'react-reveal/Slide';
// import DirectionReveal from 'direction-reveal';
import Carousel from 'antd/lib/carousel';
import './style.scss';
import reactLogo from './images/react-logo.png';
import reduxLogo from './images/redux-logo.png';
import img1 from '../../images/1.png';
import img2 from '../../images/2.jpg';
import img3 from '../../images/3.jpg';
class HomeView extends React.Component {

    state = {
        currentPage: 0
    }

    onChange = (page) => {
        this.setState({
            currentPage: page
        });
    }

    render() {
        let bgColor = '#1db083';
        let displayZoom = '';
        switch (this.state.currentPage) {
            case 0:
                bgColor = 'rgb(53, 175, 138)';
                displayZoom = 
                        <Zoom>
                            <h4>这个是图1介绍啦</h4>
                        </Zoom>
                break;
            case 1:
                bgColor = 'rgb(245, 176, 101)';
                displayZoom =
                    <Bounce top>
                        <h4>这个是图2介绍啦</h4>
                    </Bounce>
                break;
            case 2:
                bgColor = '#98cc3e';
                displayZoom =
                    <Slide top>
                        <h4>这个是图3介绍啦</h4>
                    </Slide>
                break;
            default:
                break;
        }
        return (
            <div className="container-fluid home" style={{ padding: 0, background: bgColor, transition: '.3s all'}}>
                {/* <div className="content">                    
                </div> */}
                <Carousel autoplay afterChange={this.onChange}>
                    {/* <Zoom>
                        <h1>欢迎来到广东药科大学！</h1>
                    </Zoom> */}
                    <img src={img1} alt=""/>
                    <img src={img2} alt="" />
                    <img src={img3} alt="" />
                </Carousel>
                <div>
                    {displayZoom}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText
    };
};

export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
