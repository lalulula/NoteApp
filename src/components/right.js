import React, { Component } from 'react';
import TopRight from './topR'
import BottomRight from './bottomR'

class Right extends Component {
    state = {  } 
    render() { 
        // console.log("Right")
        return (
        <div className="right">
            <TopRight/>
            <BottomRight />
        </div>
        );
    }
}
 
export default Right;