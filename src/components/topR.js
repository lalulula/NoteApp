import React, { Component } from 'react';
function TopRight({ deleteNote,  back2SideBar, note}){
    return(
            <div className="topR">  
                <button style={{display:'contents'}} onClick={ back2SideBar }><span className="material-icons" id="back" >arrow_back</span></button>
                <button><span className="material-icons">notification_add</span></button>
                <button><span className="material-icons">person_add_alt</span></button>
                <button className="deleteNote" onClick={ () => deleteNote(note.id) }><span className="material-icons">delete_outline</span></button>
            </div>
    );
}
 
export default TopRight;

