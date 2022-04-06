import React from 'react';
import Note from './note';
import Search from './search';
function BottomLeft({ notes, selectedNoteId, handleSelectedNote, handleSearchText, setSelectedNoteId}){

    const sortedNotes = notes.sort((a , b)=> b.date - a.date);

        return(
            <div className="bottomL">
                    <Search 
                        handleSearchText={handleSearchText}
                        setSelectedNoteId={setSelectedNoteId}
                        notes={notes}
                            />

                     <div id="note_list">  
                        {sortedNotes.map( (note) => 
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


 