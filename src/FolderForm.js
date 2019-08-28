import React from 'react'
import {withRouter} from 'react-router-dom'
import './app.css'
import config from './config'
import PropTypes from 'prop-types'
import ValidationError from './ValidationError'
import Context from './Context';
class FolderForm extends React.Component{
    static contextType=Context;
    constructor(props){
        super(props)
        this.state={
            name:'',
            id:''
        }
    }
    callApi=(name,id)=>{
        const url=`${config.API_ENDPOINT}/folders`;
        const options={
            method:'POST',
            headers:{
          'content-type':'application/json'
        },
        body: JSON.stringify({'id':id,'name':name})
    };
        fetch(url,options)
        .then(this.context.addFolder({id,name}))
        .catch(error =>{
            console.log(error)
        }) 
        this.setState({
            name:name,
            id:id
        });
        this.props.history.push('/')
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        const name=event.target.folderName.value;
        const id=Math.floor((Math.random() * 10)).toString();
       
       this.callApi(name,id);

    }
    validateName=()=> {
        const name=this.state.name.trim();
    if (name.length === 0) {
      return "Name is required";
    } else if (name.length < 3) {
      return "Name must be at least 3 characters long.";
    }
  }

    render(){
        return (
        <Context.Consumer>{(value)=>{
        const nameError=this.validateName();
        return(
        <form className="addForm" onSubmit={e=>this.handleSubmit(e)}>
            <fieldset>
                <legend>Create A Folder</legend>
                <label htmlFor="folderName">Name:
                <input name="folderName" type="text"/></label><br/>
                <button type='submit' className="addFolderButton">Add Folder</button>
            </fieldset>
            <ValidationError message={nameError}/>
        </form>
        )}}
    </Context.Consumer>
    )}
}
FolderForm.propTypes={
    name:PropTypes.string.isRequired,
    idNum:PropTypes.string
}
export default withRouter(FolderForm)