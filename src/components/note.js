import React, { Component } from 'react';
function Note({id, text, date}){
    return(
        <div className='note_container'>
            <div className='note_preview'>{text}</div>
            <div className='note_date'>{date}</div>
        </div>       
    );
}
 
export default Note;


/////////CLASSSS///////////////////////////////////////////////////////////////////////
// class SidebarNote extends Component {
//     state = {  } 
    
//     render() { 
//         // const current = new Date();
//         // let date = `${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`;
//         // let time = current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds();
//         return (
//             <div className='note_container'>
//                 <div className='note_preview'>{note.t}</div>
//                 <div className='note_date'>{date}</div>
//             </div>
//         );
//     }
// }