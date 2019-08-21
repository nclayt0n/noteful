import React from 'react'
import {Route, Link} from 'react-router-dom'
import dummyStore from './dummy-store'

export default function ActiveFolder(props) {
  console.log(props)
  const folder = dummyStore.notes.filter(p =>
    p.folderId === props.match.params.folderId
  )
  let display=folder.map(item=>{
      return <Link to={`/notes/${item.id}`}><section key={item.id} className="note"><div className="noteInfo"><h2>{item.name}</h2><p className="noteDate">{item.modified}</p></div><button className="deleteButton">Delete Note</button></section></Link>
  })
  console.log(folder);
  return (
    <article className='folderContents'>
    <ul className='folderList'>
        {dummyStore.folders.map((folder,idx) =>
          <li key={folder.id}>
            <Link to={`/folder/${folder.id}`}>
             Folder {idx+1}
            </Link>
          </li>
        )}
      </ul>
      {display}
    </article>
  )
}
