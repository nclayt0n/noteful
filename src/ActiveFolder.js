import React from 'react'
import {Link} from 'react-router-dom'
import dummyStore from './dummy-store'
import './app.css'

export default function ActiveFolder(props) {
  const folder = dummyStore.notes.filter(p =>
    p.folderId === props.match.params.folderId
  )
  let display=folder.map(item=>{
      return <Link to={`/notes/${item.id}`}><li key={item.id} className="note"><div className="noteInfo"><h2>{item.name}</h2><p className="noteDate">{item.modified}</p></div><button className="deleteButton">Delete Note</button></li></Link>
  })
  return (
    <div className='activeFolderContainer'>
    <ul className='folderList'>
        {dummyStore.folders.map((folder,idx) =>
          <li key={folder.id}>
            <Link to={`/folder/${folder.id}`}>
             Folder {idx+1}
            </Link>
          </li>
        )}
        </ul>
      <ul class="notesList">
        {display}
      </ul>
    </div>
  )
}
