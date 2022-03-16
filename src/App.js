// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

import Left from './components/left'
import Right from './components/right'
import EditProfile from './components/editProfile'

class App extends Component {

  render(){
    const image = "profileImg.jpg";
    return (
     <React.Fragment>
        <div className="head">
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"  rel="stylesheet"/>
        </div>

        <div id="container">  
            <Left />
            <Right />
            <EditProfile/>
        </div>

    </React.Fragment>
      );
  }

}

export default App;
