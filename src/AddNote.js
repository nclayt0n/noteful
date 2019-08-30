import React from 'react'
import {withRouter} from 'react-router-dom'
import Context from './Context'
import moment from 'moment'
import config from './config'
import PropTypes from 'prop-types'
import ValidationError from './ValidationError'


function findFolder(value,folder){
    const folderName=folder;
    const folderId= value.folders.find((f)=>f.name===folderName);
    return folderId.id;
}

class AddNote extends React.Component{
    static contextType=Context;
    constructor(props){
        super(props)
        this.state={name:'',id:'',content:'',folderId:'',
            modified:'',nameError:'',contentError:''}
    }
    callApi=(content,folderId,id,modified,name)=>{
        const url=`${config.API_ENDPOINT}/notes`;
        const options={
            method:'POST',
            headers:{
          'content-type':'application/json'
        },
        body: JSON.stringify({'content':content,'folderId':folderId, 'id':id,'modified':modified,'name':name})
    };
        fetch(url,options)
        .then(this.context.addNote({content,folderId,id,modified,name}))
        .catch(error =>{
            console.log(error)
        })
        this.setState=({
            name:name,
            folderId:folderId,
            id:id,
            modified:modified,
            content:content
        });
        this.props.history.push('/')
    }
validateName=(n)=> {
    let results;
    if ( n===undefined|| n.length === 0 ) {
      results= "Name is required";
    } else if (n.length < 3) {
      results= "Name must be at least 3 characters long.";
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
        event.preventDefault();
        let content=event.target.content.value;
        let folder= event.target.folder.value;
        let folderId=findFolder(value,folder);
        let id=Math.floor(Math.random()*100).toString();
        let modified=moment().format();
        let name=event.target.name.value.toString();
        
        if(name.length<3){this.validateName(name)} 
        if(content.length<5){this.validateContent(content)}else{this.callApi(content,folderId,id,modified,name)};
    }
    render(){
        return(
    <Context.Consumer>{(value)=>{
        console.log(value)
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
             return(<option name='folder'>{folder.name}</option>)
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
    name:PropTypes.string.isRequired,
    content:PropTypes.string.isRequired,
    folderId:PropTypes.string.isRequired,
    id:PropTypes.string.isRequired,
    modified:PropTypes.string.isRequired

}
export default withRouter(AddNote)