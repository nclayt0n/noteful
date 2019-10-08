import React from 'react'
import {Link} from 'react-router-dom'
export default class UpdateNoteButton extends React.Component{
    render(){
        return(
        <div className="updateNoteButton">
        <Link to={`/update-note/${this.props.note.id}`}>Update Note</Link>
        </div>)
    }
}