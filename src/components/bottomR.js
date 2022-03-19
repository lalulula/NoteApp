import React, { Component } from 'react';
import Tags from './tag';
function BottomRight( {selectedNote , onEditNote} ){
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
            borderLeft: "2px solid darkgray",
            textAlign: "center"
    }

    const handleChange = ( value) => {  //"text" & value
        onEditNote({
            id: selectedNote.id,
            text: value, 
            date: Date.now()
        });
    }

    if(!selectedNote) {
        return <textarea disabled={true} style={txtStyle}>
                NO notes selected
                </textarea>
    }

    return(
        <div className="bottomR">
            <textarea id="textA" 
                    value={selectedNote.text}
                    onChange={ (event) => handleChange( event.target.value)}
                    style={{fontFamily: 'Helvetica, Arial'}}>
                    <Tags/>
            </textarea>
        </div>
    );
}
 
export default BottomRight;
// disabled={true}