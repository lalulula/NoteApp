import React, { Component } from 'react';

import TopLeft from './topL'
import BottomLeft from './bottomL'

class Left extends Component {
    state = {  } 
    render() { 
        // console.log("Left")
        return (
            <div className = "left">  
                <TopLeft/>
                <BottomLeft/>
            </div>
        );
    }
}
 
export default Left;