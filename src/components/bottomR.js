import React, { Component } from 'react';
class BotttomRight extends Component {
    state = {  } 
    render() { 
        return (
            <div className="bottomR">
                <textarea id="textA" disabled={true} onKeyUp="saveNote()" style={{font: 'Helvetica, Arial'}}></textarea>
            </div>
        );
    }
}
 
export default BotttomRight;