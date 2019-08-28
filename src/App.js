import React from 'react';
import { Route, Link } from 'react-router-dom'
import Context from './Context'
import ListPage from './ListPage'
import ActiveFolder from './ActiveFolder'
import Note from './Note'
import FolderForm from './FolderForm'
import config from './config'
import AddNote from './AddNote';
import NoteBox from './NoteBox'

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
    handleClickDelete=(noteId,props)=>{
    console.log(this.props);
    const url=`http://localhost:9090/notes/${noteId}`
    const options = {
     method: 'DELETE',
        headers:{
          'content-type':'application/json'
        },
    };
    fetch(url,options)
    .then(()=>this.handleDeleteNote(noteId))
     props.history.push('/')
         
  }
    handleDeleteNote = noteId => {
    this.setState({
    notes: this.state.notes.filter(note => note.id !== noteId)
    });
    };
    handleAddNote=(note)=>{
      this.setState({
        notes:[...this.state.notes, note]
      })
    }
    handleAddFolder=(folder)=>{
      this.setState({
        folders:[...this.state.folders,folder]
      })
    }

    render() {
      const contextValue={
        folders:this.state.folders,
        notes:this.state.notes,
        deleteNote:this.handleDeleteNote,
        handleClickDelete:this.handleClickDelete,
        addNote:this.handleAddNote,
        addFolder:this.handleAddFolder
      }
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
            // component={Note}
            render={({history})=>{
              return <Note 
              handleClickDelete={()=>history.push('/')}
              />
            }}
            /> 
            <Route path = '/folderForm'
            render={({history})=>{
              return <FolderForm 
              callApi={()=>history.push('/')}/>
            }}
            // component = { FolderForm }
            />
            <Route path ='/addNote'
            render={({history})=>{
              return <AddNote 
              handleSubmit={()=>history.push('/')}/>
            }}
            />
            <Route path = '/noteBox'
            render={({history})=>{
              return <NoteBox
              handleClickDelete={()=>history.push('/')}
              />
            }}
            />
            </Context.Provider> 
            </main> 
        </div>
        );
    }
}

export default App;