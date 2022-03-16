import React, { Component } from 'react';
import TopRight from './topR'
import BottomRight from './bottomR'

function Right({ notes , deleteNote}){
    // console.log(notes);
    return(
        <div className="right">
            <TopRight deleteNote={ deleteNote }/>
            <BottomRight notes={ notes } />
        </div>
    );
};
 
export default Right;