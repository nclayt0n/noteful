import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import './app.css'
import Context from './Context'
import NoteButton from './NoteButton'
import FolderButton from './FolderButton';
import PropTypes from 'prop-types'
import NoteBox from './NoteBox';

 class ListPage extends React.Component{
  static contextType=Context;
   static defaultProps={
     folder:[],
     notes:[]
   }
   dynamicSort=(property)=>{
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}
    render(){
        return(
          <Context.Consumer>{(value)=>{
            return(
            <div className='container'>
      <ul className='folderList'>
        {value.folders.sort(this.dynamicSort("folder_name")).map((folder)=>{
          return(<li key={folder.id}>
            <Link to={`/folders/${folder.id}`}>
            {folder.folder_name}
            </Link>
          </li>
        )})}
        <FolderButton/>
        
      </ul>
      <ul className='notesList'>
      {value.notes.sort(this.dynamicSort("note_name")).map(item=>{
        return (<NoteBox key={item.id} value={value} item={item} prop={this.props}/>)})}
        <NoteButton/>
      </ul>
    </div>)
          }}
          </Context.Consumer>
)}
}
ListPage.propTypes={
  name:PropTypes.string,
  id:PropTypes.string,
  modified: PropTypes.string
}
export default withRouter(ListPage);