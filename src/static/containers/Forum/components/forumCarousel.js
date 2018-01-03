import React from 'react';
import Carousel from 'antd/lib/carousel';

class ForumCarousel extends React.Component {

    onChange = (a, b, c) => {
        // console.log(a, b, c);
    }

    render() {
        return (
            <div>
                <Carousel 
                    afterChange={this.onChange} 
                    /*autoplay*/
                >
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                </Carousel>
            </div>
        );
    }
}

export default ForumCarousel;