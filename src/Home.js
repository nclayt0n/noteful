import React from 'react';
import {Route, Link} from 'react-router-dom'
import Folder from './Folder'
import Notes from './Notes'

export default class Home extends React.Component{
    render(){
        return(
        <div>
            <section className='folders'>
                <Route 
                path='/folder/:folderId'
                component={Folder}/>
                <Route 
                path='/notes/:notesId'
                component={Notes}/>
            </section>
        </div>)
    }
}