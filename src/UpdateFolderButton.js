import React from 'react'
import {Link} from 'react-router-dom'
export default class UpdateFolderButton extends React.Component{
    render(){
        return(
        <div className="updateFolderButton">
        <Link to={`/update-folder`}>Update Folder</Link>
        </div>)
    }
}