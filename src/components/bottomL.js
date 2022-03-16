import React, { Component } from 'react';
import profileImg from './profileImg.jpg'
import Note from './note';
function BottomLeft({ notes }){
        console.log("HI!!!!",notes);
        return(
            <div className="bottomL">
                    <div className= "search">
                        <span className="material-icons">search</span>
                        <input type="text" name="search" placeholder="Search all notes"
                                  style={{border: 'none', marginTop: '10px', marginBottom: '10px'}} />
                    </div>

                     <div id="note_list">  
                        {notes.map( (note) => 
                            <Note id={note.id} text={note.text} date ={note.date} />)}  
                    </div>
                </div>
        );
}

export default BottomLeft;


/////////CLASSSS/////////////////////////
// class BottomLeft extends Component {
//     state = {  } 
//     render() { 
//         return (
//             <div className="bottomL">
//                       <div className= "search">
//                           <span className="material-icons">search</span>
//                           <input type="text" name="search" placeholder="Search all notes"
//                                   style={{border: 'none', marginTop: '10px', marginBottom: '10px'}} />
//                       </div>

//                       <div id="note_list">    
//                             <SidebarNote />
//                             <SidebarNote />
//                             <SidebarNote />
//                             <SidebarNote />
//                       </div>
//                 </div>
//         );
//     }
// }
 