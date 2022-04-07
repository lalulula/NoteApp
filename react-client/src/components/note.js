import React from 'react';

function Note({id, text, date, selectedNoteId, handleSelectedNote }){
    return(
        <div className={`note_container ${id === selectedNoteId ? "selected_note" : "note"}`} 
                        onClick={() => handleSelectedNote(id) }>
            <div className='note_preview'>{text}</div>
            <div className='note_date'>{date}</div>
        </div>       
    );
}
 
export default Note;


