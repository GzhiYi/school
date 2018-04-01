import React, { Component } from 'react';
// import Select from 'antd/lib/select';
import { Map, Marker } from 'react-amap';

// const Option = Select.Option;
class SurroundingTrafficView extends Component {
    constructor() {
        super();
        this.toolEvents = {
            created: (tool) => {
                this.tool = tool;
            }
        }
        this.mapPlugins = ['ToolBar'];
        this.mapCenter = { longitude: 113.414378, latitude: 22.475931 };
        this.markerPosition = { longitude: 113.414378, latitude: 22.475931 };
    }
    render() {
        const mapKey = '457dc70511a9df03ba1c4932c93eeb30';
        return (
            <div className="a-map">
                <Map 
                    plugins={this.mapPlugins}
                    center={this.mapCenter}
                    zoom={16}
                >
                    <Marker position={this.markerPosition} />
                </Map>
            </div>
        );
    }
}

export default SurroundingTrafficView;