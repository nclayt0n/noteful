import React from 'react'
import {Link} from 'react-router-dom'

function FolderButton(){
    return(<div className="formButton"><Link to={"/add-folder"}>Add Folder</Link></div>)
}
export default FolderButton