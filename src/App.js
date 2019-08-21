import React from 'react';
import {Route, Link} from 'react-router-dom'
import Folder from './Folder'
import Notes from './Notes'
import NotesContainer from './NotesContainer';
class App extends React.Component {
  render(){
  return (
    <div className="App">
    <Link to='/'>
      <h1>Noteful</h1>
    </Link>
    <main>
      <Folder/>
      <NotesContainer/>
      <Notes/>
    </main>
    </div>
  );
}
}

export default App;
