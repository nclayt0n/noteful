import React from 'react'
import {Route,Link} from 'react-router-dom'
import './dummy-store'
import dummyStore from './dummy-store';
export default class Notes extends React.Component{
    render(){
        let notes=dummyStore.notes.map((note,idx)=>{
            return<div className="notes inactive" key={note.id}>{note.content} {idx+1}</div>
        })
        console.log(notes)
        console.log(dummyStore)
        return(
        <div className="NotesPage">
        {notes}</div>)
    }
}