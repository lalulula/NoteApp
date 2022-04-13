import React from 'react';
import Note from './note';
import Search from './search';
function BottomLeft({ notes,selectedNote, selectedNoteId, handleSelectedNote, handleSearchText, setSelectedNoteId, clearSearchBar}){
    const sortedNotes = notes.sort((a , b)=> Date.parse(b.lastUpdatedDate) - Date.parse(a.lastUpdatedDate));
        return(
            <div className="bottomL">
                    <Search 
                        handleSearchText={handleSearchText}
                        setSelectedNoteId={setSelectedNoteId}
                        notes={notes}
                        selectedNote={selectedNote}
                        clearSearchBar={clearSearchBar}
                            />

                     <div id="note_list">  
                        {sortedNotes.map( (note) => 
                            <Note 
                                key={note._id} 
                                id={note._id} 
                                text={note.text} 
                                date ={new Date(note.lastUpdatedDate).toLocaleDateString("en",
                                                        {hour: "2-digit",
                                                        minute: "2-digit",
                                                        second: "2-digit"})
                                        } 
                                selectedNoteId ={ selectedNoteId }
                                handleSelectedNote ={ handleSelectedNote }/>
                                )}  
                    </div>
                </div>
        );
}

export default BottomLeft;