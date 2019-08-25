import React from 'react'
import {withRouter,Link} from 'react-router-dom'
import './app.css'
import Context from './Context';

class ActiveFolder extends React.Component {
  
  render(){
    console.log(this.props)
    return(
      <Context.Consumer>{(value)=>{
   console.log(value)
  const folder = value.notes.filter(p =>
    p.folderId === this.props.match.params.folderId
  )
  let display=folder.map(item=>{
      return( <li key={item.id} className="note"><div className="noteInfo"><Link to={`/notes/${item.id}`}><h2>{item.name}</h2></Link><p className="noteDate">{item.modified}</p></div><button className="deleteButton" name="deletebutton" onClick={value.deleteNote(item.id,this.props)}>Delete Note</button></li>)
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
        <div className="formButton"><Link to={"/folderForm"}>Add Folder</Link></div>
        </ul>
      <ul className="notesList">
        {display}
      </ul>
    </div>
  )}}</Context.Consumer>
    )}
}
export default withRouter(ActiveFolder)