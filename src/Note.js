import React from 'react'
import dummyStore from './dummy-store'
import './app.css'


function folderName(idNum){
  let results;
  for(let i=0;i<dummyStore.folders.length;i++){
    if(idNum===dummyStore.folders[i].id){
      results= `Folder ${i+1}: ${dummyStore.folders[i].name}`
    }
  return results;
  }
}
export default function NoteList(props) {
  const note= dummyStore.notes.filter(p =>
    p.id === props.match.params.notesId
  )
  let display=note.map(item=>{
    let folder=folderName(item.folderId)
      return  <section key={item.id} className="singleNote">
      <div className="singleFolder">{folder}</div>
        <h2>{item.name}</h2>
        <p>{item.content}</p>
      </section>
  })
  return (
    <article className='noteContainer'>
      {display}
    </article>
  )
}
