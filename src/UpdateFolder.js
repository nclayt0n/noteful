import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import Context from './Context'

function findFolder(value,folder){
    console.log(value)
    console.log(folder)
    const folderName=folder;
    const folderId= value.folders.find((f)=>f.folder_name===folderName);
    return folderId.id;
} 

class UpdateFolder extends React.Component{
    static contextType=Context;
    constructor(props){
        super(props)
        this.state={id:'',folder_name:'', nameError:'',contentError:''}
    }
    deleteFolder=()=>{

    }
    render(){
        return(
            <Context.Consumer>{(value)=>{
        return(
        <div className="updateFolderOption">
            <form action="patch">
            <label htmlFor='folder_name'>Choose a Folder to Alter: 
           <br/>
            <select name="folder">
            {value.folders.map((folder)=>{
             return(<option name='folder' key={folder.id}>{folder.folder_name}</option>)
            })}
            </select></label> 
            <label htmlFor='name'>Update Folder Name: 
           <br/>
            <input 
            type='text'
            name='folder_name'
            aria-label="Updated Folder Name"  aria-required="true" 
             /></label>
            <button type='submit'>Submit New Name</button><button type='button' onClick={this.deleteFolder}>Delete Folder</button><button><Link to={'/'}>Cancel</Link></button>
            </form>
        </div>
)}}
    </Context.Consumer>
    )}
}
export default withRouter(UpdateFolder)
