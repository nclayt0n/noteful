import React from 'react'
import dummyStore from './dummy-store'
import './app.css'
import {withRouter} from 'react-router-dom'
import {Route,Link} from 'react-router-dom' 
import ActiveFolder from './ActiveFolder';

function folderName(idNum){
  let results;
  for(let i=0;i<dummyStore.folders.length;i++){
    if(idNum===dummyStore.folders[i].id){
      results= `Folder ${i+1}: ${dummyStore.folders[i].name}`
    }
  return results;
  }
}
function NoteList(props) {
  const note= dummyStore.notes.filter(p =>
    p.id === props.match.params.notesId
  )
  let display=note.map(item=>{
    let folder=folderName(item.folderId)
    console.log(item.folderId);
      return  <section key={item.id} className="singleNote">
      <Link to={`/folder/${item.folderId}`}>GO BACK</Link>
      <div className="singleFolder">{folder}</div>
        <h2>{item.name}</h2>
        <p>{item.content}</p>
      </section>
  });
  console.log(props)
  return (
    <article className='noteContainer'> 
           
      {display}
    </article>
  )
}
export default withRouter(NoteList);