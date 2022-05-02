import React from 'react';


function Note({id, text, date, selectedNoteId, handleSelectedNote, setShowSideBar,  setSelectedNoteId }){
    const divStyle = {display:'flex', justifyContent: "space-between"}

    const handleOnClick =(id)=>{
        setSelectedNoteId(id);
        setShowSideBar(false)
    }

    return(
        <div id="noteContainer" className={`note_container ${id === selectedNoteId ? "selected_note" : "note"}`} 
                        onClick={() => handleOnClick(id)}>
            <div className='note_preview'>{text}</div>
            <div className='note_date'>
                <div style={divStyle}>
                    {date}
                    {/* <div class="similar">similar</div> */}
                </div>
            </div>
        </div>       
    );
}
 
export default Note;


