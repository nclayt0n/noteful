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
    render(){
        return(
          <Context.Consumer>{(value)=>{
            return(
            <div className='container'>
      <ul className='folderList'>
        {value.folders.map((folder)=>{
          return(<li key={folder.id}>
            <Link to={`/folders/${folder.id}`}>
            {folder.folder_name}
            </Link>
          </li>
        )})}
        <FolderButton/>
        
      </ul>
      <ul className='notesList'>
      {value.notes.map(item=>{
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