import React from 'react'
import {withRouter,Link} from 'react-router-dom'
import Context from './Context'
import PropTypes from 'prop-types'

 class NoteBox extends React.Component{   
    static contextType=Context;
    render(){
        return(
    <Context.Consumer>{(value)=>{
        let item=this.props.item;
        return( 
        <li key={item.id} className="note">
            <Link to={`/notes/${item.id}`} className="noteLink">
              <h2>{item.name}</h2>
            </Link>
            <p className="noteDate">{item.modified}</p>
          <button className="deleteButton" onClick={()=>value.handleClickDelete(item.id,this.props)}>Delete</button>
        </li>)
        }}</Context.Consumer>
    )}
}
NoteBox.propTypes={
  name:PropTypes.string,
  id:PropTypes.string,
  modified: PropTypes.string,
  folderId:PropTypes.string
}
export default withRouter(NoteBox)