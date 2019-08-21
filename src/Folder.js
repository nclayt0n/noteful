import React from 'react'
import dummyStore from './dummy-store';
import './app.css'
export default class Nav extends React.Component{
    render(){
        let folders=dummyStore.folders.map((folder,idx)=>{
            return<div className="folder" key={folder.id}>folder {idx+1}</div>
        })
        console.log(folders)
        console.log(dummyStore)
        return(<div className="folders">
        {folders}
        </div>)
    }
}