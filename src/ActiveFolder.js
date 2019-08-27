import React from 'react'
import {withRouter,Link} from 'react-router-dom'
import './app.css'
import Context from './Context';
import NoteButton from './NoteButton'
import FolderButton from './FolderButton';

class ActiveFolder extends React.Component {
  selectedFolder=(folderId)=>{
  let style;(folderId===this.props.match.params.folderId) ? style={backgroundColor:'green'}:style=null
    return style;
  }
  render(){  
    console.log(this.props)
    return(
      <Context.Consumer>{(value)=>{
   console.log(value)
  const folder = value.notes.filter(p =>
    p.folderId === this.props.match.params.folderId
  )
  let display=folder.map(item=>{
      return( <li key={item.id} className="note"><div className="noteInfo"><Link to={`/notes/${item.id}`}><h2>{item.name}</h2></Link><p className="noteDate">{item.modified}</p></div><button className="deleteButton" onClick={()=>value.handleClickDelete(item.id,this.props)}>Delete Note</button></li>)
  })


  return (
    <div className='activeFolderContainer'>
    <ul className='folderList'>
        {value.folders.map((folder,idx) =>
          <li key={folder.id} style={this.selectedFolder(folder.id)}>
            <Link to={`/folder/${folder.id}`}>
             Folder {idx+1}
            </Link>
          </li>
        )}
        <FolderButton/>
        </ul>
      <ul className="notesList">
        {display}
        <NoteButton/>
      </ul>
      
      
    </div>
  )}}</Context.Consumer>
    )}
}
export default withRouter(ActiveFolder)