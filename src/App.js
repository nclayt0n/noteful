import React from 'react';
import Home from './Home'
import {Route, Link} from 'react-router-dom'
import Folder from './Folder'
import Notes from './Notes'
import Nav from './Nav'
import NotesContainer from './NotesContainer'
class App extends React.Component {
  render(){
  return (
    <div className="App">
      <main>
      <Link to='/'>
        <h1>Noteful</h1>
      </Link>
      <Nav/>
      <NotesContainer/>
      <Notes/>
      
      </main>
    </div>
  );
}
}

export default App;
