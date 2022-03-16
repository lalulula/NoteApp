import React, { Component } from 'react';
class TopRight extends Component {
    state = {  } 
    render() { 
        return (
            <div className="topR">  
            <button style={{display:'contents'}}><span className="material-icons" id="back" >arrow_back</span></button>
            <button><span className="material-icons">notification_add</span></button>
            <button><span className="material-icons">person_add_alt</span></button>
            <button className="deleteNote"onClick="deleteNote()"><span className="material-icons">delete_outline</span></button>
        </div>
        );
    }
}
 
export default TopRight;