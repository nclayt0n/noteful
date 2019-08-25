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
  }
  return results;
}

class NoteList extends React.Component {
  constructor(props){
  super(props)
  }
  handleGoBack=()=>{
    this.props.history.goBack();
  }
  deleteNote=()=>{
    console.log('hi')
  }
  render(){
  console.log(this.props)

  const note= dummyStore.notes.find(p =>
    p.id === this.props.match.params.notesId
  );
    let display =  (<div>
    <ul className='notesList'>
  <li key={note.id} className="note"><div className="noteInfo"><h2>{note.name}</h2><p className="noteDate">{note.modified}</p></div><button className="deleteButton" onClick={this.deleteNote}>Delete Note</button></li></ul><section key={note.id} className="singleNote">
      <button className="singleFolder" onClick={this.handleGoBack}>{folderName(note.folderId)} </button>
        <h2>{note.name}</h2>
        <p>{note.content}</p>
    </section></div>);
  
  return (
    <article className='noteContainer'> 
           
      {display}
    </article>
  )
}
}
export default withRouter(NoteList);