import React from 'react';

function Note({id, text, date, selectedNoteId, handleSelectedNote }){
    const divStyle = {display:'flex', justifyContent: "space-between"}

    return(
        <div className={`note_container ${id === selectedNoteId ? "selected_note" : "note"}`} 
                        onClick={() => handleSelectedNote(id) }>
            <div className='note_preview'>{text}</div>
            <div className='note_date'>
                <div style={divStyle}>
                    {date}
                    {/* <div>similar</div> */}
                </div>
            </div>
        </div>       
    );
}
 
export default Note;


