import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import Context from './Context'
import config from './config'


function findFolder(value,folder){
    const folderName=folder;
    const folderId= value.folders.find((f)=>f.folder_name===folderName);
    return folderId.id;
} 

class UpdateNote extends React.Component{
    static contextType=Context;
    constructor(props){
        super(props)
        this.state={id:'',content:'',folder_name:'', nameError:'',contentError:''}
    }
    callApi=(noteId,content,folder_id,updatedName,folder_name)=>{
        console.log(noteId,content,folder_id,updatedName)
        const url=`${config.API_ENDPOINT}/notes/${noteId}`;
        const options={
            method:'PATCH',
            headers:{
          'content-type':'application/json'
        },
        body: JSON.stringify({'id':noteId,'folder_id':folder_id,'content':content,'folder_name':updatedName})
    };
        fetch(url,options)
        .then(this.context.UpdateNote({noteId,folder_name,folder_id,content}))
        .catch(error =>{
            console.log(error)
        })
        this.setState=({
            id:noteId,
            folder_name:updatedName,
            folder_id:folder_id,
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
    handleSubmit=(event,value,noteId)=>{
        console.log(this.props)
        event.preventDefault();
        let updatedName=event.target.newName.value;
        let content=event.target.content.value;
        let folder_name= event.target.folder.value;
        let folder_id=findFolder(value,folder_name);
        console.log(folder_id)
        console.log(folder_name)
        console.log(content)
        console.log(updatedName)
        if(folder_name.length<3){this.validateName(folder_name)} 
        else{this.callApi(noteId,content,folder_id,updatedName,folder_name)};
    }
    render(){
        return(
            <Context.Consumer>{(value)=>{
                let noteId=parseInt(this.props.match.params.noteId)
                let x=(value.notes[0].id)
                console.log(x.toString())
                console.log(noteId)
                let note=value.notes.find(n=>n.id===noteId)
                console.log(note)
                let folderName=value.folders.find(n=>n.id===note.folder_id) || '';
        return(
        <div className="updateNoteOption">
            <form action="patch" onSubmit={e=>this.handleSubmit(e,value,noteId)} key={'updateNoteForm'}>
            <label htmlFor='folder_name'>Move to Folder: 
           <br/>
            <select name="folder"><option name='folder'>{folderName.folder_name}</option>
            {value.folders.filter(f=>f.id!==note.folder_id).map((folder)=>{
             return(<option name="folder" key={folder.id}>{folder.folder_name}</option>)
            })}
            </select></label> 
            
            <label htmlFor='name'>Update Note Name: 
           <br/>
            <input 
            type='text'
            name='newName'
            placeholder={note.note_name}
            aria-label="Updated Note Name"  aria-required="true" 
             /></label>
             <label htmlFor='content'>Update Note Content: 
             <br/>
             <input 
            type='text'
            name='content'
            placeholder={note.content}
            aria-label="Updated Note Name"  aria-required="true" 
             />
             </label>
            <button type='submit'>Update Note</button><button><Link to={'/'}>Cancel</Link></button>
            </form>
        </div>
)}}
    </Context.Consumer>
    )}
}
export default withRouter(UpdateNote)