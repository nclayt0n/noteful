import React from 'react'
import {withRouter,Link} from 'react-router-dom'
import './app.css'
import Context from './Context';
import NoteButton from './NoteButton'
import FolderButton from './FolderButton';
import PropTypes from 'prop-types'
import NoteBox from './NoteBox'
import UpdateFolderButton from './UpdateFolderButton'

class ActiveFolder extends React.Component {
  static contextType=Context;
  selectedFolder=(folderId)=>{
  let style;(folderId.toString()===this.props.match.params.foldersId) ? style={backgroundColor:'#C8923B'}:style=null
    return style;
  }
  render(){
    return(
      <Context.Consumer>{(value)=>{
  const folder = value.notes.filter(p => {
    return p.folder_id.toString() === this.props.match.params.foldersId});
  return (
    <div className='container'>
      <ul className='folderList'>
        {value.folders.map((folder,idx) =>{
          return(<li key={folder.id} style={this.selectedFolder(folder.id)}>
            <Link to={`/folders/${folder.id}`} style={this.selectedFolder(folder.id)}>
             {folder.folder_name}
            </Link>
          </li>)
      })}
      <FolderButton/>
      </ul>
      <ul className="notesList">
        {folder.map(item=>{
        return <NoteBox key={item.id}value={value} item={item} prop={this.props}/>})}
      <NoteButton/>
      <UpdateFolderButton/>
      </ul>
      
    </div>
  )}}</Context.Consumer>
    )}
}
ActiveFolder.propTypes={
  name:PropTypes.string,
  id:PropTypes.string,
  modified: PropTypes.string,
  folderId:PropTypes.string
}
export default withRouter(ActiveFolder)