import React, { Component } from 'react';
import Collapse from 'antd/lib/collapse';

const Panel = Collapse.Panel;
class SurroundingNewView extends Component {
    render() {
        const text = `
            A dog is a type of domesticated animal.
            Known for its loyalty and faithfulness,
            it can be found as a welcome guest in many households across the world.
            `;

        const customPanelStyle = {
            background: '#f7f7f7',
            borderRadius: 4,
            marginBottom: 24,
            border: 0,
            overflow: 'hidden',
        };
        return (
            <div>
                <Collapse bordered={false} defaultActiveKey={['1']}>
                    <Panel header={<h6>当你看到这条信息的时候，就知道可以点开看了。<span className="panel-time">time</span></h6>} key="1" style={customPanelStyle}>
                        <p>{text}</p>

                    </Panel>
                    <Panel header="当然了，这是第二条。" key="2" style={customPanelStyle}>
                        <p>{text}</p>
                    </Panel>
                    <Panel header="这是第三条消息。" key="3" style={customPanelStyle}>
                        <p>{text}</p>
                    </Panel>
                </Collapse> 
            </div>
        );
    }
}

export default SurroundingNewView;