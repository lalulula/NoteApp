import React, { Component } from 'react';
import profileImg from './profileImg.jpg'
import Note from './note';
function BottomLeft({ notes, selectedNoteId, handleSelectedNote }){

        return(
            <div className="bottomL">
                    <div className= "search">
                        <span className="material-icons">search</span>
                        <input type="text" name="search" placeholder="Search all notes"
                                  style={{border: 'none', marginTop: '10px', marginBottom: '10px'}} />
                    </div>

                     <div id="note_list">  
                        {notes.map( (note) => 
                            <Note 
                                key={note.id} 
                                id={note.id} 
                                text={note.text} 
                                date ={new Date(note.date).toLocaleDateString("en",
                                                        {hour: "2-digit",
                                                        minute: "2-digit",
                                                        second: "2-digit"})
                                        } 
                                selectedNoteId ={ selectedNoteId }
                                handleSelectedNote ={ handleSelectedNote }/>)}  
                    </div>
                </div>
        );
}

export default BottomLeft;


 