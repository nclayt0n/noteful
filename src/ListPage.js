import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import './app.css'
import Context from './Context'
import NoteButton from './NoteButton'
import FolderButton from './FolderButton';
 class ListPage extends React.Component{

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
        <FolderButton/>
        
      </ul>
      <ul className='notesList'>
        {value.notes.map((item)=>{
          return  <li key={item.id} className="note"><div className="noteInfo"><Link to={`/notes/${item.id}`}><h2>{item.name}</h2></Link><p className="noteDate">{item.modified}</p></div><button className="deleteButton" onClick={()=> value.handleClickDelete(item.id,this.props)}>Delete Note</button></li>})
        }
        <NoteButton/>
      </ul>
    </>)
          }}
          </Context.Consumer>
)}
}
export default withRouter(ListPage);