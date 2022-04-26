import React  from 'react';

function Search({clearSearchBar, handleSearchText, notes, setSelectedNoteId}){

    const handleOnClick=()=>{
        document.getElementById('clearSearchBtn').style.color='steelblue';
    }

    const handleOnChange=(e)=>{
        console.log(notes)
        handleSearchText(e.target.value);
        console.log(e.target.value);
        if(notes.length === 0){
            return;
        }
        else{
            console.log(notes[0]);
            setSelectedNoteId(notes[0]._id);
        }
        document.getElementById('clearSearchBtn').style.color='steelblue';
    }
    const returnNoteList=()=>{
        document.getElementById('searchBar').value='';
        handleSearchText('');
        clearSearchBar();
    }

    return(
        <div className= "search">
                        <span className="material-icons">search</span>
                        <input id="searchBar" onChange={handleOnChange} onClick={handleOnClick}  type="text" name="search" placeholder="Search all notes"
                                  style={{border: 'none', marginTop: '10px', marginBottom: '10px'}} 
                                  autoComplete="off"/>
                        <button id="clearSearchBtn" style={{color:"transparent"}} onClick= {returnNoteList}>✖</button>
                    </div>
    );
};
 
export default Search;
