import React from 'react';
import Carousel from 'antd/lib/carousel';
import win from '../../../images/win.jpg';
import reward from '../../../images/reward.png';
import reward2 from '../../../images/reward2.jpg';
import sence from '../../../images/sence.png';
class ForumCarousel extends React.Component {

    onChange = (a, b, c) => {
        // console.log(a, b, c);
    }

    render() {
        return (
            <div>
                <Carousel 
                    afterChange={this.onChange} 
                    effect="fade"
                    autoplay
                >
                    <img src={win} alt="" />
                    <img src={reward} alt="" />
                    <img src={reward2} alt="" />
                    <img src={sence} alt="" />
                </Carousel>
            </div>
        );
    }
}

export default ForumCarousel;