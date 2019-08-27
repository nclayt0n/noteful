import React from 'react'
import {withRouter} from 'react-router-dom'
import Context from './Context'

class AddNote extends React.Component{
    
    render(){
        return(
    <Context.Consumer>{(value)=>{
        console.log(value)
        return(
            <div className="addNoteForm">
        <form >
        <label htmlFor='name'>Name: </label>
         <input name='name' type='text'/>
         <label htmlFor='content'>Content: </label>
         <input name='content' type='text'/> 
         <select>
         {value.folders.map(folder=>{
             return(<option>{folder.name}</option>)
         })}
         </select>

        <button type='submit'>Add Note</button>
        </form></div>
    )}}
    </Context.Consumer>
    )}
}
export default withRouter(AddNote)