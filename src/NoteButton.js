import React from 'react'
import {Link} from 'react-router-dom'

function NoteButton(){
    return(<div className='addNoteLink'><Link to="/addNote" >Add Note</Link></div>)
}
export default NoteButton