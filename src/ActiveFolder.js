import React from 'react'
import {withRouter,Link} from 'react-router-dom'
import './app.css'
import Context from './Context';
import NoteButton from './NoteButton'
import FolderButton from './FolderButton';
import PropTypes from 'prop-types'
import NoteBox from './NoteBox'

class ActiveFolder extends React.Component {
  static contextType=Context;
  selectedFolder=(folderId)=>{
  let style;(folderId===this.props.match.params.folderId) ? style={backgroundColor:'#C8923B'}:style=null
    return style;
  }
  render(){
    return(
      <Context.Consumer>{(value)=>{
  const folder = value.notes.filter(p => p.folderId === this.props.match.params.folderId);
  return (
    <div className='container'>
      <ul className='folderList'>
        {value.folders.map((folder,idx) =>
          <li key={folder.id} style={this.selectedFolder(folder.id)}>
            <Link to={`/folder/${folder.id}`} style={this.selectedFolder(folder.id)}>
             Folder {idx+1}
            </Link>
          </li>
        )}
      <FolderButton/>
      </ul>
      <ul className="notesList">
        {folder.map(item=>{
        return <NoteBox value={value} item={item} prop={this.props}/>})}
      <NoteButton/>
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