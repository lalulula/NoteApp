import React from 'react';
import Tags from './tag';
function BottomRight( {notes, selectedNote , onEditNote, tags, handleDrag}){
    const txtStyle={
            height: "100%",
            width: "100%",
            border: "none",
            resize: "none",
            fontSize: "large",
            overflow: "visible",
            padding: "20px 10px 10px 10px",
            backgroundColor: "none",
            fontFamily: "Helvetica, Arial",
            textAlign: "center"
    }

    const handleChange = (value) => { 
        var newNote={
            _id: selectedNote._id,
            text: value, 
            lastUpdatedDate: Date.now(),
            tags:tags
        } 
        for(let i = 0; i<notes.length; i++){
            document.getElementsByClassName('note_container')[i].style.backgroundColor ='white';
            document.getElementsByClassName('similar')[i].innerHTML="";
        }
        document.getElementsByClassName('selected_note')[0].style.backgroundColor ='#E5F1FD';
        onEditNote(newNote);

    }

    if(!selectedNote) {
        return <textarea disabled={true} style={txtStyle} value={"NO notes selected"}>
                </textarea>
    }

    return(
        <div className="bottomR">
            <textarea id="textA" 
                    value={selectedNote.text}
                    onChange={ (event) => handleChange(event.target.value)}
                    style={{fontFamily: 'Helvetica, Arial'}}>
            </textarea>
                <Tags  
                    handleDrag={handleDrag}
                    notes = {notes}
                    tags={tags} 
                    selectedNote = { selectedNote } 
                    onEditNote ={onEditNote}
                    autoFocus = {false}
                     />
        </div>
    );
}
 
export default BottomRight;
