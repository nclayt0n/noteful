import React from 'react'
import {withRouter} from 'react-router-dom'
import Context from './Context'
import moment from 'moment'
import config from './config'
import PropTypes from 'prop-types'
import ValidationError from './ValidationError'


function findFolder(value,folder){
    console.log(value)
    console.log(folder)
    const folderName=folder;
    const folderId= value.folders.find((f)=>f.folder_name===folderName);
    return folderId.id;
}

class AddNote extends React.Component{
    static contextType=Context;
    constructor(props){
        super(props)
        this.state={id:'',name:'',modified:'',folderId:'',content:'',nameError:'',contentError:''}
    }
    callApi=(note_name,date_published,folder_id,content)=>{
        const url=`${config.API_ENDPOINT}/notes`;
        const options={
            method:'POST',
            headers:{
          'content-type':'application/json'
        },
        body: JSON.stringify({'note_name':note_name,'date_published':date_published,'folder_id':folder_id,'content':content })
    };
        fetch(url,options)
        .then(this.context.addNote({note_name,content,folder_id,date_published,}))
        .catch(error =>{
            console.log(error)
        })
        this.setState=({
            note_name:note_name,
            date_published:date_published,
            folder_id:folder_id,
            content:content
        });
        this.props.history.push('/')
    }
validateName=(n,notes)=> {
    let results;
    if ( n===undefined|| n.length === 0 ) {
      results= "Name is required";
    } else if (n.length < 3) {
      results= "Name must be at least 3 characters long.";
    }else if(notes.find(note=>n===note.note_name)){
        results="Note name already taken"
    }
    this.setState({nameError:results});
  }
  validateContent=(c)=>{
      let results;
      if(c===undefined|| c.length ===0){
          results= 'Content is required'
      }else if(c.length<5){
          results='Content must be at least 5 characters long.'
      }
      this.setState({contentError:results});
  }
   
    handleSubmit=(event,value)=>{
        console.log(event.target.content.value)
        console.log(value)
        console.log(event.target.name.value)
        event.preventDefault();
        let content=event.target.content.value;
        let folder= event.target.folder.value;
        let folder_id=findFolder(value,folder);
        let date_published=moment().format();
        let name=event.target.name.value.toString();
        
        if(name.length<3){this.validateName(name,value.notes)} 
        if(content.length<5){this.validateContent(content)}else{this.callApi(name,date_published,folder_id,content)};
    }
    render(){
        return(
    <Context.Consumer>{(value)=>{
        return(
            <div className="addNoteForm">
        <form onSubmit={e=>this.handleSubmit(e,value)} key={'addNoteForm'}>
        <fieldset>
            <legend>Add New Note</legend>
            <label htmlFor='name'>Name: 
            <input 
            type='text' 
            name='name' 
            aria-label="New Note Name"  aria-required="true"/></label> 
            <ValidationError Namemessage={this.state.nameError} />
            <label htmlFor='content'>Content:
            <input 
            type='text'
            name='content'
            aria-label="New Note Content"  aria-required="true" 
             /></label>
            <ValidationError Contentmessage={this.state.contentError}/>
            <select name="folder">
            {value.folders.map((folder)=>{
             return(<option name='folder' key={folder.id}>{folder.folder_name}</option>)
            })}
            </select>
            <button type='submit'>Add Note</button>
        </fieldset>
        </form>
        </div>
    )}}
    </Context.Consumer>
    )}
}
AddNote.propTypes={
    name:PropTypes.string,
    content:PropTypes.string,
    folderId:PropTypes.string,
    id:PropTypes.string,
    modified:PropTypes.string

}
export default withRouter(AddNote)