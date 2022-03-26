import React, { Component } from 'react';
import Tags from './tag';
function BottomRight( {notes, selectedNote , onEditNote, tags, handleDrag}){
    const txtStyle={
            height: "690px",
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
        onEditNote({
            id: selectedNote.id,
            text: value, 
            date: Date.now(),
            tags: tags
        });
    }

    if(!selectedNote) {
        return <textarea disabled={true} style={txtStyle} value={"NO notes selected"}>
                </textarea>
    }

    return(
        <div className="bottomR">
            <textarea id="textA" 
                    value={selectedNote.text}
                    onChange={ (event) => handleChange( event.target.value)}
                    style={{fontFamily: 'Helvetica, Arial'}}>
            </textarea>
                <Tags  
                    handleDrag={handleDrag}
                    notes = {notes}
                    tags={tags} 
                    selectedNote = { selectedNote } 
                    onEditNote ={onEditNote}
                     />
        </div>
    );
}
 
export default BottomRight;
// disabled={true}