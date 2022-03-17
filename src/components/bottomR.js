import React, { Component } from 'react';
function BottomRight( {selectedNote ,onUpdateNote} ){
    // console.log(Object.values(selectedNote));
    console.log(selectedNote)
    const onEdit = (key, value) =>{
        onUpdateNote({
            id: selectedNote.id,
            [key]: value,
            date : Date.now()
        })
    }

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
    
    if(!selectedNote) {
        return <textarea id="textA" disabled={true} style={txtStyle}>
            NO notes selected
                </textarea>
    }

    return(
        <div className="bottomR">
            <textarea id="textA" value={selectedNote.text}
                    onKeyUp={console.log("GOING TO SAVE LATER")} 
                    style={{fontFamily: 'Helvetica, Arial'}}>
            </textarea>
        </div>
    );
}
 
export default BottomRight;
// disabled={true}