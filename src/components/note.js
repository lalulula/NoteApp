import React, { Component } from 'react';
import Tags from './tag';
function Note({id, text, date, tags, selectedNote, handleSelectedNote }){
    return(
        <div className={`note_container ${id === selectedNote ? "selected_note" : "note"}`} onClick={() => handleSelectedNote(id) }>
            <div className='note_preview'>{text}</div>
            <div className='note_date'>{date}</div>
            <Tags tags = {tags}/>
        </div>       
    );
}
 
export default Note;


