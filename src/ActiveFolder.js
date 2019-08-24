import React from 'react'
import {Link} from 'react-router-dom'
import dummyStore from './dummy-store'
import './app.css'
import Context from './Context';

export default class ActiveFolder extends React.Component {
  static contextType= Context;
  render(){
    return(
      <Context.Consumer>{(value)=>{
   console.log(value)
  const folder = value.notes.filter(p =>
    p.folderId === this.props.match.params.folderId
  )
  let display=folder.map(item=>{
      return( <li key={item.id} className="note"><div className="noteInfo"><Link to={`/notes/${item.id}`}><h2>{item.name}</h2></Link><p className="noteDate">{item.modified}</p></div><button className="deleteButton" onClick={value.deleteNote(item.id)}>Delete Note</button></li>)
  })

  return (
    
    <div className='activeFolderContainer'>
    <ul className='folderList'>
        {value.folders.map((folder,idx) =>
          <li key={folder.id}>
            <Link to={`/folder/${folder.id}`}>
             Folder {idx+1}
            </Link>
          </li>
        )}
        </ul>
      <ul className="notesList">
        {display}
      </ul>
    </div>
  )}}</Context.Consumer>
    )}
}