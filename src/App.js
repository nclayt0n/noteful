import React from 'react';
import {Route, Link} from 'react-router-dom'

import ListPage from './ListPage'
import ActiveFolder from './ActiveFolder'
import Note from './Note'
class App extends React.Component {
  render(){
  return (
    <div className="App">
    <Link to='/'>
      <h1>Noteful</h1>
    </Link>
    <main>
      <Route exact path='/'
      component={ListPage}/>
      <Route path='/folder/:folderId' component={ActiveFolder}/>
      <Route path='/notes/:notesId' component={Note}/>
      
      
    </main>
    </div>
  );
}
}

export default App;
