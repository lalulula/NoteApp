import React, { Component } from 'react';

import TopLeft from './topL'
import BottomLeft from './bottomL'

function Left({ notes , addNote, profileClicked, selectedNote, setSelectedNote }){
    // console.log(notes);
    return(
        <div className = "left">  
            <TopLeft 
                addNote = { addNote } 
                profileClicked = { profileClicked }/>
            <BottomLeft 
                notes = { notes }
                selectedNote ={ selectedNote }
                setSelectedNote ={ setSelectedNote }/>
        </div>
    );
};
 
export default Left;

/////////CLASSSS/////////////////////
// class Left extends Component {
//     state = {  } 
//     render() { 
//         // console.log("Left")
//         return (
//             <div className = "left">  
//                 <TopLeft/>
//                 <BottomLeft/>
//             </div>
//         );
//     }
// }