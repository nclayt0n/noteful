import React from 'react'
import {Route, Link} from 'react-router-dom'
import './app.css'
import Context from './Context'
export default class ListPage extends React.Component{
  static contextType=Context;

    render(){
        return(
          <Context.Consumer>{(value)=>{
        console.log(value)
            return(
            <>
      <ul className='folderList'>
        {value.folders.map((folder,idx) =>{
          return(<li key={folder.id}>
            <Link to={`/folder/${folder.id}`}>
             Folder {idx+1}
            </Link>
          </li>
        )})}
        <div className="formButton"><Link to={"/folderForm"}>Add Folder</Link></div>
        
      </ul>
      <ul className='notesList'>
        {value.notes.map((item)=>{
          console.log(item) 
          return  <li key={item.id} className="note"><div className="noteInfo"><Link to={`/notes/${item.id}`}><h2>{item.name}</h2></Link><p className="noteDate">{item.modified}</p></div><button className="deleteButton" onClick={()=> value.deleteNote(item.id)}>Delete Note</button></li>})
        }
      </ul>
    </>)
          }}
          </Context.Consumer>
)}
}