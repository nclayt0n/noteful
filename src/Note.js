import React from 'react'
import './app.css'
import {withRouter, Link} from 'react-router-dom'
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
  handleClickDelete=()=>{
    const noteId=this.props.match.params.notesId;
    const url=`http://localhost:9090/notes/${noteId}`
    const options = {
     method: 'DELETE',
        headers:{
          'content-type':'application/json'
        },
    };
    fetch(url,options)
    .then(()=>{
      this.context.deleteNote(noteId)
    })
    .then(() => {
     this.props.history.push('/')
    });     
  }
  render(){
  
    return(
      <Context.Consumer>{(value)=>{ 
        console.log(value)
  const note= value.notes.find((n)=>{ 
    return n.id===this.props.match.params.notesId});
  const {id,name,modified,content, folderId}=note;
  let display= (note===undefined)?<div>NO NOTE</div>:<div><ul className='notesList'>
        <li key={id} className="note"><div className="noteInfo"><h2>{name}</h2><p className="noteDate">{modified}</p></div><button className="deleteButton" onClick={this.handleClickDelete}>Delete Note</button></li>
        </ul>
        <section key={id} className="singleNote">
        <button className="singleFolder" onClick={this.handleGoBack}>{folderName(value,folderId)} </button>
          <h2>{name}</h2>
          <p>{content}</p>
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