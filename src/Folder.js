import React from 'react'
import {Route, Link} from 'react-router-dom';
export default class Folder extends React.Component{
    render(){
        return(
        <div>
         <div>Folder 1</div>
         <div>Folder 1</div>
         <div>Folder 1</div>  
         
         <Link to='/FolderForm'>Add Folder</Link> 
        </div>)
    }
}