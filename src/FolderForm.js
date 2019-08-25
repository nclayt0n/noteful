import React from 'react'
import './app.css'

class FolderForm extends React.Component{
    render(){
        return(
        <form className="addForm">
            <fieldset>
                <legend>Create A Folder</legend>
                <label htmlFor="folderName">Name</label>
                <input name="folderName" type="text"/>
                <button>Add Folder</button>
            </fieldset>
        </form>)
    }
}
export default FolderForm