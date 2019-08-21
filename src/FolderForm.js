import React from 'react'
import {Route} from 'react-router-dom'
import './app.css'

class FolderForm extends React.Component{
    render(){
        return(
        <form class="addForm">
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