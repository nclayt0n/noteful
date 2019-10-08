import React from 'react'
import {Link} from 'react-router-dom'

class NoteButton extends React.Component{
    render(){
    return(
    <div className='addNoteButton'>
    <Link to={`/addNote/${parseInt(this.props.folder)}`}>Add Note</Link>
    </div>)
}
}
export default NoteButton