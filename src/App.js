import React from 'react';
import { Route, Link } from 'react-router-dom'
import Context from './Context'
import ListPage from './ListPage'
import ActiveFolder from './ActiveFolder'
import Note from './Note'
import FolderForm from './FolderForm'
import config from './config'

class App extends React.Component {
    constructor(){
    super()
    this.state={
      folders:[],
      notes:[]
  }
}

    componentDidMount() {
      Promise.all([
        fetch(`${config.API_ENDPOINT}/notes`),
        fetch(`${config.API_ENDPOINT}/folders`)
        ])
      .then(([notesRes, foldersRes]) => {
          if (!notesRes.ok)
            return notesRes.json().then(e => Promise.reject(e));
          if (!foldersRes.ok)
            return foldersRes.json().then(e => Promise.reject(e));

            return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }
    handleDeleteNote=(noteId)=>{
    const url=`http://localhost:9090/notes/${noteId}`
    
    const options = {
     method: 'DELETE',
        headers:{
          'content-type':'application/json'
        },
    };
    console.log(url);
    fetch(url,options)
    .then(response=> {
      if (response.ok){
      return response
    }
    throw new Error('Something went wrong');
    })
    .then(response=>response.json())
    .then(responseJson=>console.log(responseJson))
    .catch(err=> console.log(err.message))

    this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
  }
    render() {
      const contextValue={
        folders:this.state.folders,
        notes:this.state.notes,
        deleteNote:this.handleDeleteNote
      }
      console.log(contextValue)
        return ( 
        <div className = "App" >
            <Link to = '/' >
            <h1> Noteful </h1> 
            </Link> 
            <main>
            <Context.Provider value={contextValue}>
            <Route exact path = '/'
            component = {ListPage }
            /> <Route path = '/folder/:folderId'
            component = { ActiveFolder }
            /> <Route path = '/notes/:notesId'
            render={({history})=>{
              console.log(history)
              return <Note 
              onClick={()=>history.push('/')}
              />
            }}
            /> 
            <Route path = '/folderForm'
            component = { FolderForm }
            /></Context.Provider> 
            </main> 
        </div>
        );
    }
}

export default App;