import React from 'react'
import {withRouter,Link} from 'react-router-dom'
import './app.css'
import config from './config'
import PropTypes from 'prop-types'
import ValidationError from './ValidationError'
import Context from './Context';
class AddFolder extends React.Component{
    static contextType=Context;
    constructor(props){
        super(props)
        this.state={
            name:'',
            error:''
        }
    }
    callApi=(folder_name)=>{
        console.log(folder_name);
        const url=`${config.API_ENDPOINT}/folders`;
        const options={
            method:'POST',
            headers:{
          'content-type':'application/json'
        },
        body: JSON.stringify({'folder_name':folder_name})
    };
    fetch(url,options)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => this.context.addFolder(responseJson))
    .catch(error =>{
        console.log(error)
    })
   
    this.props.history.push('/')
    }
    handleSubmit(event,value){
        event.preventDefault();
        const folder_name=event.target.folderName.value;
       this.validateName(folder_name,value.folders);
    }
    validateName=(folder_name,folders)=> {
        let results;
        console.log('ive been called')
        console.log(folder_name)
    if (folder_name===undefined ||folder_name.length === 0) {
      results= "Name is required";
    }else if (folder_name.length < 3) {
      results= "Name must be at least 3 characters long.";
    }else if(folders.find(folder=>folder_name===folder.folder_name)){
        results="Folder already exists"
    }else{this.callApi(folder_name)}
    this.setState({error:results});
  }

    render(){
        return (
        <Context.Consumer>{(value)=>{
        return(<div className="folderFormContainer">
        <form className="addForm" onSubmit={e=>this.handleSubmit(e,value)}>
            <fieldset>
                <legend>Create A Folder</legend>
                <label htmlFor="folderName">Name:
                <input name="folderName" id="folderName" type="text" aria-required="true" aria-describedby="error" placeholder="Folder Name"/></label><br/>
                <button type='submit' className="addFolderButton">Add Folder</button>
               
            </fieldset> 
            
            <ValidationError message={this.state.error}/>
        </form><button className="cancelAddFolderButton">
                <Link to={'/'}>Cancel</Link>
            </button></div>
        )}}
    </Context.Consumer>
    )}
}
AddFolder.propTypes={
    name:PropTypes.string,
    idNum:PropTypes.string
}
export default withRouter(AddFolder)