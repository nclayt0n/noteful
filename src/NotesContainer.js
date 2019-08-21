import React from 'react'
import dummyStore from './dummy-store'
import './app.css'
export default class NotesContainer extends React.Component{
    render(){
        let noteNames=dummyStore.notes.map((name)=>{
            return <section key={name.id} className="note"><div className="noteInfo"><h2>{name.name}</h2><p className="noteDate">{name.modified}</p></div><button className="deleteButton">Delete Note</button></section>
        })
        console.log(dummyStore)
        return(
        <div className="notesList">
            {noteNames}
        </div>)
    }
}