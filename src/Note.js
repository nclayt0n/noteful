import React from 'react'
import './app.css'
import {withRouter} from 'react-router-dom'
import Context from './Context'
import NoteBox from './NoteBox'
import PropTypes from 'prop-types'
import ValidationError from './ValidationError';
import moment from 'moment'

function folderName(value,idNum){
  let results;
  for(let i=0;i<value.folders.length;i++){
    if(idNum===value.folders[i].id){
      results= `Folder: ${value.folders[i].name}`
    }
  }
  return results;
}

class Note extends React.Component {
  static contextType=Context;
  static defaultProps={
  "folders": [{"id": "testId","name": " "}],
  "notes": [{"id": "id","name": "Error","modified": moment().format(),"folderId": "testId","content": "Notes can not be displayed, please return to Noteful homepage."}]}
  handleGoBack=()=>{
    this.props.history.goBack();
  }
  handleDelete=()=>{
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
  validateValue=(value)=>{
    let results;
    if(value===undefined || value.notes.length===0){
      results='No note to display, return to Noteful page'
    }
    return results;
  }
  render(){
    return(
      <Context.Consumer>{(value)=>{
        this.validateValue(value); 
  const note= value.notes.find((n)=>{ 
    return n.id===this.props.match.params.notesId});
  const {name,content, folderId}=note;
  let display=
  <>
      <ul className='notesList'>
      <NoteBox value={value} item={note} prop={this.props}/>
      </ul>
        <button className="singleFolder" onClick={this.handleGoBack}>{folderName(value,folderId)} </button>
        <div className='noteContent'>
          <h2>{name}</h2>
          <p>{content}</p>
        </div>
        </>;
  return (
    <article className='noteContainer'> 
      {display}
      {(value===undefined)?(<ValidationError message={this.validateValue}/>):null}
    </article>)
}}</Context.Consumer>
)}}
Note.propTypes={
  folderId:PropTypes.string,
  id:PropTypes.string,
  name:PropTypes.string,
  content:PropTypes.string
}
export default withRouter(Note);