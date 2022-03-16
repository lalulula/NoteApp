import React, { Component } from 'react';
import profileImg from './profileImg.jpg'
class BottomLeft extends Component {
    state = {  } 
    render() { 
        return (
            <div className="bottomL">
                      <div className= "search">
                          <span className="material-icons">search</span>
                          <input type="text" name="search" placeholder="Search all notes"
                                  style={{border: 'none', marginTop: '10px', marginBottom: '10px'}} />
                      </div>

                      <div id="note_list">     </div>
                </div>
        );
    }
}
 
export default BottomLeft;