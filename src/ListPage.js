import React from 'react'
import {Route, Link} from 'react-router-dom'
import dummyStore from './dummy-store'
import './app.css'
import config from './config'
export default class ListPage extends React.Component{
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
    render(){
      console.log(this.state)
        return(
            <>
      <ul className='folderList'>
        {dummyStore.folders.map((folder,idx) =>{
          return(<li key={folder.id}>
            <Link to={`/folder/${folder.id}`}>
             Folder {idx+1}
            </Link>
          </li>
        )})}
        <div className="formButton"><Link to={"/folderForm"}>Add Folder</Link></div>
        
      </ul>
      <ul className='notesList'>
        {dummyStore.notes.map((item)=>{return  <Link to={`/notes/${item.id}`}><li key={item.id} className="note"><div className="noteInfo"><h2>{item.name}</h2><p className="noteDate">{item.modified}</p></div><button className="deleteButton">Delete Note</button></li></Link>})
        }
      </ul>
    </>)
}
}