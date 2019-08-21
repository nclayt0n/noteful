import React from 'react'
import {Route, Link} from 'react-router-dom'
import dummyStore from './dummy-store'


function folderName(idNum){
  let results;
for(let i=0;i<dummyStore.folders.length;i++){
  if(idNum===dummyStore.folders[i].id){
    results= `Folder${i+1}: ${dummyStore.folders[i].name}`
  }
  return results;
}
}
export default function NoteList(props) {
  console.log(props)
  
  const note= dummyStore.notes.filter(p =>
    p.id === props.match.params.notesId
  )
  
  let display=note.map(item=>{
    let folder=folderName(item.folderId)
      return  <section key={item.id} className="note">
      <h1>{folder}</h1>
        <h2>{item.name}</h2>
        <p>{item.content}</p>
      </section>
  })
  console.log(dummyStore);
  return (
    <article className='noteContainer'>
   
      {display}
    </article>
  )
}
