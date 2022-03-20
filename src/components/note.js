import React, { Component } from 'react';
function Note({id, text, date, selectedNote, handleSelectedNote }){
    return(
        // <div className={`note_container ${id === selectedNote ? "selected_note" : "note"}`} onClick={() => setSelectedNote(id) }>
        <div className={`note_container ${id === selectedNote ? "selected_note" : "note"}`} onClick={() => handleSelectedNote(id) }>
            <div className='note_preview'>{text}</div>
            <div className='note_date'>{date}</div>
        </div>       
    );
}
 
export default Note;


