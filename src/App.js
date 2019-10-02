import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import Context from './Context'
import ListPage from './ListPage'
import ActiveFolder from './ActiveFolder'
import Note from './Note'
import FolderForm from './FolderForm'
import config from './config'
import AddNote from './AddNote';
import NoteBox from './NoteBox'
import NotFoundPage from './NotFoundPage';
import UpdateFolder from './UpdateFolder'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            folders: [],
            notes: []
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
                this.setState({ notes, folders });
            })
            .catch(error => {
                console.error({ error });
            });

    }
    updateFolder=folder=>{
        console.log(folder)
        console.log(this.state.folders)
       let folder_name=folder.folder_name;
       let folder_id=folder.folder_id;
       this.state.folders.map(folder=>{
    if(folder.id===folder.folder_id){
        this.setState({folders:{folder_name,folder_id}})
    }
    })
}
    deleteFolder=folderId=>{
this.setState({
            folders: this.state.folders.filter(folder => folder.id !== folderId)
        });
}
    handleClickDelete = (noteId, props) => {
        const url = `${config.API_ENDPOINT}/notes/${noteId}`
        const options = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
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
        console.log(note)
        this.setState({
            notes: [...this.state.notes, note]
        })
    }
    handleAddFolder = (folder) => {
        this.setState({
            folders: [...this.state.folders, folder]
        })
    }
    render() {
        const contextValue = {
            folders: this.state.folders,
            notes: this.state.notes,
            deleteNote: this.handleDeleteNote,
            handleClickDelete: this.handleClickDelete,
            addNote: this.handleAddNote,
            addFolder: this.handleAddFolder,
            deleteFolder:this.deleteFolder,
            updateFolder:this.updateFolder,
        }
        return ( 
        <div className = "App">
            <Link to = '/'>
            <h1 > Noteful </h1>  
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
                        () => history.push('/')}/>
                }
            }
            />  
            <Route path = '/folderForm'
            render = {
                ({ history }) => {
                    return <FolderForm
                    callApi = {
                        () => history.push('/')
                    }
                    />
                }
            }
            /> 
            <Route path = '/addNote'
            render = {
                ({ history }) => {
                    return <AddNote
                    handleSubmit = {
                        () => history.push('/')}/>
                }
            }
            /> 
            <Route path = '/noteBox'
            render = {
                ({ history }) => {
                    return <NoteBox
                    handleClickDelete = {
                        () => history.push('/')
                    }
                    />
                }
            }
            /> 
            <Route path='/update-folder'
            component={UpdateFolder}/>
            <NotFoundPage/>
            </Switch> 
            </Context.Provider> 
            </main>  
            </div>
        );
    }
}

export default App;