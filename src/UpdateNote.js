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
        this.state={id:'',content:'',folder_name:'', nameError:'',contentError:'',error:''}
    }
    callApi=(noteId,content,folder_id,updatedName,date_published)=>{
        const url=`${config.API_ENDPOINT}/notes/${noteId}`;
        const options={
            method:'PATCH',
            headers:{
          'content-type':'application/json',
          'Authorization': `Bearer ${config.API_TOKEN}`,
        },
        body: JSON.stringify({'id':noteId,'folder_id':folder_id,'content':content,'date_published':date_published})
    };
        fetch(url,options)
        .then(this.context.UpdateNote({id:noteId,content,folder_id,note_name:updatedName,date_published}))
        .catch(error =>{
            this.setState({error})
        })
        this.setState=({
            content:content,
            folder_id:folder_id,
            note_name:updatedName,
            date_published,
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
    handleSubmit=(event,value,noteId,note)=>{
        event.preventDefault();
        let folder_name= event.target.folder.value;
        let updatedName;
        updatedName=event.target.newName.value?event.target.newName.value:note.note_name;
        let content;
        event.target.content.value?content=event.target.content.value:content=note.content;
        
        let folder_id=findFolder(value,folder_name);
        if(folder_name.length<3){this.validateName(folder_name)} 
        else{this.callApi(noteId,content,folder_id,updatedName,note.date_published)};
    }
    render(){
        return(
            <Context.Consumer>{(value)=>{
                let noteId=parseInt(this.props.match.params.noteId);
                let note=value.notes.find(n=>n.id===noteId);
                let folderName=value.folders.find(n=>n.id===note.folder_id) || '';
        return(
        <div className="updateNoteOption">
            <form 
            action="patch" 
            onSubmit={e=>this.handleSubmit(e,value,noteId,note)} 
            key={'updateNoteForm'}>
                <label htmlFor='folder_name'>
                Move to Folder: 
                <br/>
                <select name="folder">
                    <option name='folder'>{folderName.folder_name}
                    </option>
                    {value.folders.filter(f=>f.id!==note.folder_id).map((folder)=>{
                    return(<option name="folder" key={folder.id}>{folder.folder_name}</option>)
                    })}
                </select>
                </label> 
                <label htmlFor='name'>Update Note Name: 
                <br/>
                <input 
                type='text'
                name='newName'
                placeholder={note.note_name}
                aria-label="Updated Note Name"  aria-required="true" 
                />
                </label>
                <label htmlFor='content'>Update Note Content: 
                <br/>
                <textarea 
                type='text'
                name='content'
                aria-label="Updated Note Name"  aria-required="true" 
                placeholder={note.content}
                />
                </label>
                <button className="updateButton"type='submit'>Update Note</button>
            </form>
            <button className="cancelButton">
                <Link to={'/'}>Cancel</Link>
            </button>
        </div>
)}}
    </Context.Consumer>
    )}
}
export default withRouter(UpdateNote)