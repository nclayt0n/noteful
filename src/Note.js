import React from 'react'
import './app.css'
import {withRouter} from 'react-router-dom'
import Context from './Context'
import NoteBox from './NoteBox'

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
  handleDelete=()=>{
    console.log(this.props);
    const noteId=this.props.match.params.notesId;
    const url=`http://localhost:9090/notes/${noteId}`
    const options = {
     method: 'DELETE',
        headers:{
          'content-type':'application/json'
        },
    };
    fetch(url,options)
    .then(this.context.deleteNote(noteId))
     this.props.history.push('/')
         
  }
  render(){
 
    return(
      <Context.Consumer>{(value)=>{ 
  const note= value.notes.find((n)=>{ 
    return n.id===this.props.match.params.notesId});
  const {id,name,content, folderId}=note;
  let display=
    <div>
      <ul className='notesList'>
      <NoteBox value={value} item={note} prop={this.props}/>
      </ul>
      <section key={id} className="singleNote">
        <button className="singleFolder" onClick={this.handleGoBack}>{folderName(value,folderId)} </button>
        <div className='noteContent'>
          <h2>{name}</h2>
          <p>{content}</p>
        </div>
      </section>
    </div>;
  return (
    <article className='noteContainer'> 
     {display}
    </article>)
}}</Context.Consumer>
)}}
export default withRouter(Note);