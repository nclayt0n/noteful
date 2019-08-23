import React from 'react'
import dummyStore from './dummy-store'
import './app.css'
import {withRouter} from 'react-router-dom'
import {Route,Link} from 'react-router-dom' 
import ActiveFolder from './ActiveFolder';

function folderName(idNum){
  let results;
  for(let i=0;i<dummyStore.folders.length;i++){
    if(idNum===dummyStore.folders[i].id){
      results= `Folder ${i+1}: ${dummyStore.folders[i].name}`
    }
  }
  return results;
}

class NoteList extends React.Component {
  constructor(props){
  super(props)
  }
  handleGoBack=()=>{
    this.props.history.goBack();
  }
  
  render(){
  

  const note= dummyStore.notes.find(p =>
    p.id === this.props.match.params.notesId
  );
    let display =  (<section key={note.id} className="singleNote">
      {/* <Link to={`/folder/${note.folderId}`}>GO BACK</Link> */}
      <button onClick={this.handleGoBack}>GO BACK</button>
      <div className="singleFolder">{folderName(note.folderId)}</div>
        <h2>{note.name}</h2>
        <p>{note.content}</p>
    </section>);
  
  return (
    <article className='noteContainer'> 
           
      {display}
    </article>
  )
}
}
export default withRouter(NoteList);