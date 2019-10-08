import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import Context from './Context'
import config from './config'


function findFolder(value,folder){
    const folderName=folder;
    const folderId= value.folders.find((f)=>f.folder_name===folderName);
    return folderId.id;
} 

class UpdateFolder extends React.Component{
    static contextType=Context;
    constructor(props){
        super(props)
        this.state={id:'',folder_name:'', nameError:'',contentError:'',error:''}
    }
    callApi=(folder_name,folder_id,actionWord)=>{
        const url=`${config.API_ENDPOINT}/folders/${folder_id}`;
        const options={
            method:actionWord,
            headers:{
          'content-type':'application/json','Authorization':`Bearer ${config.API_TOKEN}`,
        },
        body: JSON.stringify({'id':folder_id,'folder_name':folder_name})
    };
        fetch(url,options)
        .then(this.context.updateFolder({id:folder_id,folder_name,}))
        .catch(error =>{
            this.setState({error})
        })
        this.setState=({
            id:folder_id,
            folder_name:folder_name,
            
        });
        this.props.history.push('/')
    }
    callDeleteApi=(folder_id,actionWord)=>{
        const url=`${config.API_ENDPOINT}/folders/${folder_id}`;
        const options={
            method:actionWord,
            headers:{
          'content-type':'application/json',
          'Authorization':`Bearer ${config.API_TOKEN}`,
        },
        body: JSON.stringify({'id':folder_id})
    };
        fetch(url,options)
        .then(this.context.deleteFolder(folder_id))
        .catch(error =>{
            this.setState({error})
        })
        this.setState=({
            folder_id:folder_id,
        });
        this.props.history.push('/')
    }
validateName=(n,folders)=> {

    let results;
    if ( n===undefined|| n.length === 0 ) {
      results= "Name is required";
    }if(folders.find(n===folders.name)){
        results="Folder already exists"
    } else if (n.length < 3) {
      results= "Name must be at least 3 characters long.";
    }
    this.setState({nameError:results});
  }

   handleDelete=(event,value)=>{
    let action=event.currentTarget.action.split("/")
        let actionWord=action[action.length-1].toUpperCase();
        event.preventDefault();
        let folder= event.target.folder.value;
        let folder_id=findFolder(value,folder);
        this.callDeleteApi(folder_id,actionWord);
   }
    handleSubmit=(event,value)=>{
        let action=event.currentTarget.action.split("/")
        let actionWord=action[action.length-1].toUpperCase();
        event.preventDefault();
        let folder= event.target.folder.value;
        let folder_id=findFolder(value,folder);
        let folder_name=event.target.name.value.toString();
        if(folder_name.length<3){this.validateName(folder_name,value.folders)} 
        else{this.callApi(folder_name,folder_id,actionWord)};
    }
    render(){
        return(
            <Context.Consumer>{(value)=>{
                  let folderId=parseInt(this.props.match.params.folderId)
                let folder=value.folders.find(f=>f.id===folderId) || '';
        return(
        <div className="updateFolderOption">
            <form action="patch" onSubmit={e=>this.handleSubmit(e,value)} key={'updateFolderForm'}>
            <label htmlFor='folder_name'>Choose a Folder to Alter: 
           <br/>
            <select name="folder">
            <option name='folder'>{folder.folder_name}
                    </option>
            {value.folders.filter(f=>f.id!==folderId).map((folder)=>{
             return(<option name="folder" key={folder.id}>{folder.folder_name}</option>)
            })}
            </select></label> 
            <label htmlFor='name'>Update Folder Name: 
           <br/>
            <input 
            type='text'
            name='name'
            placeholder={folder.folder_name}
            aria-label="Updated Folder Name"  aria-required="true" 
             /></label>
            <button type='submit'>Submit New Name</button>
            </form>
            <form action="delete" onSubmit={e=>this.handleDelete(e,value)} key={'deleteFolderForm'}> <label htmlFor='folder_name'>Choose a Folder to Delete: 
           <br/>
            <select name="folder">
            <option name='folder'>{folder.folder_name}</option>
            {value.folders.filter(f=>f.id!==folderId).map((folder)=>{
             return(<option name="folder" key={folder.id}>{folder.folder_name}</option>)
            })}
            </select></label> <button type='submit' onClick={this.deleteFolder}>Delete Folder</button><button><Link to={'/'}>Cancel</Link></button></form>
        </div>
)}}
    </Context.Consumer>
    )}
}
export default withRouter(UpdateFolder)
