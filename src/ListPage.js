import React from 'react'
import {Route, Link} from 'react-router-dom'
import dummyStore from './dummy-store'
import './app.css'
import FolderForm from './FolderForm';
export default function ListPage(){
        return(
            <>
      <ul className='folderList'>
        {dummyStore.folders.map((folder,idx) =>
          <li key={folder.id}>
            <Link to={`/folder/${folder.id}`}>
             Folder {idx+1}
            </Link>
          </li>
        )}
        <div class="formButton"><Link to={"/folderForm"}>Add Folder</Link></div>
        
      </ul>
      <ul className='notesList'>
        {dummyStore.notes.map((item)=>{return  <Link to={`/notes/${item.id}`}><li key={item.id} className="note"><div className="noteInfo"><h2>{item.name}</h2><p className="noteDate">{item.modified}</p></div><button className="deleteButton">Delete Note</button></li></Link>})
        }
      </ul>
    </>)
}