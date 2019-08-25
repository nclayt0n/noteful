import React from 'react'
import './app.css'
import {withRouter} from 'react-router-dom'
import Context from './Context'

function folderName(value,idNum){
  let results;
  for(let i=0;i<value.folders.length;i++){
    if(idNum===value.folders[i].id){
      results= `Folder ${i+1}: ${value.folders[i].name}`
    }
  }
  return results;
}

class Note extends React.Component {
  static contextType=Context;
  handleGoBack=()=>{
    this.props.history.goBack();
  }
  render(){
  
    return(
      <Context.Consumer>{(value)=>{ 
      console.log(value)
      let num=this.props.match.params.notesId
      const note= value.notes.find((n)=>n.id===num);
  
  let display=<div>
    <ul className='notesList'>
        <li key={note.id} className="note"><div className="noteInfo"><h2>{note.name}</h2><p className="noteDate">{note.modified}</p></div><button className="deleteButton" onClick={value.deleteNote(note.id,this.props)}>Delete Note</button></li>
    </ul>
        <section key={note.id} className="singleNote">
        <button className="singleFolder" onClick={(e)=>value.deleteNote(e,note.id,this.props)}>{folderName(value,note.id)} </button>
          <h2>{note.name}</h2>
          <p>{note.content}</p>
      </section></div>;
  return (
    <article className='noteContainer'> 
     {display}
    </article>)
}
}</Context.Consumer>
    );
  }
}
export default withRouter(Note);