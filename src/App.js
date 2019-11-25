import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import Context from './Context'
import ListPage from './ListPage'
import ActiveFolder from './ActiveFolder'
import Note from './Note'
import AddFolder from './AddFolder'
import config from './config'
import AddNote from './AddNote';
import NoteBox from './NoteBox'
import NotFoundPage from './NotFoundPage';
import UpdateFolder from './UpdateFolder'
import UpdateNote from './UpdateNote'


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            folders: [],
            notes: []
        }
    }
    componentDidMount() {
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_TOKEN}`,
            },
        };
        Promise.all([
                fetch(`${config.API_ENDPOINT}/notes`,
          options),
                fetch(`${config.API_ENDPOINT}/folders`,
          options)
            ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({ notes, folders });
            })
            .catch(error => {
                console.error({ error });
            });

    }
    handleUpdateNote=note=>{
        this.setState({
            notes: [...this.state.notes.filter(n => n.id !== note.id),note]
        })
    }
    handleUpdateFolder=folder=>{
       this.setState({
        folders: [...this.state.folders.filter(f => f.id !== folder.id),folder]
    });
};
    
    handleClickDelete = (noteId, props) => {
        const url = `${config.API_ENDPOINT}/notes/${noteId}`
        const options = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
          'Authorization':`Bearer ${config.API_TOKEN}`,
            },
        };
        fetch(url, options)
            .then(() => this.handleDeleteNote(noteId))
        props.history.push('/')

    }
    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };
    handleAddNote = (note) => {
        this.setState({
            notes: [...this.state.notes, note]
        })
    }
    handleAddFolder = (folder) => {
        this.setState({
            folders: [...this.state.folders, folder]
        })
    }
    handleDeleteFolder=folderId=>{
        this.setState({
            folders: this.state.folders.filter(folder => folder.id !== folderId)
        });
}
    render() {
        const contextValue = {
            folders: this.state.folders,
            notes: this.state.notes,
            deleteNote: this.handleDeleteNote,
            handleClickDelete: this.handleClickDelete,
            addNote: this.handleAddNote,
            addFolder: this.handleAddFolder,
            deleteFolder:this.handleDeleteFolder,
            updateFolder:this.handleUpdateFolder,
            UpdateNote:this.handleUpdateNote,
        }
        return ( 
        <div className = "App">
            <Link to = '/'>
            <h1> Noteful </h1>  
            </Link> 
            <main>
            <Context.Provider value = { contextValue } >
            <Switch>
            <Route exact path = '/'
            component = { ListPage }/> 
            <Route path = '/folders/:foldersId'
            component = { ActiveFolder }/>  
            <Route path = '/notes/:notesId'
            render = {
                ({ history }) => {
                    return <Note
                    handleClickDelete = {
                        () => history.push('/')}/>}}/>  
            <Route path = '/add-folder'
            render = {
                ({ history }) => {
                    return <AddFolder
                    callApi = {
                        () => history.push('/')
                    }/>}}/> 
            <Route path = '/addNote/:folderId'
            render = {
                ({ history }) => {
                    return <AddNote
                    handleSubmit = {
                        () => history.push('/')}/>}}/> 
            <Route path = '/noteBox'
            render = {
                ({ history }) => {
                    return <NoteBox
                    handleClickDelete = {
                        () => history.push('/')
            }/>}}/> 
            <Route path='/update-folder/:folderId'
            component={UpdateFolder}/>
            <Route path='/update-note/:noteId' component={UpdateNote}/>
            <NotFoundPage/>
            </Switch> 
            </Context.Provider> 
            </main>  
            </div>
        );
    }
}

export default App;