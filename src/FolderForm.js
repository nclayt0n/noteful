import React from 'react'
import {withRouter} from 'react-router-dom'
import './app.css'
import config from './config'
import PropTypes from 'prop-types'
import ValidationError from './ValidationError'
class FolderForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
        }
    }
    callApi=(name)=>{
        console.log(this.props)
        const idNum=Math.floor((Math.random() * 10)).toString();
        const url=`${config.API_ENDPOINT}/folders`;
        const options={
            method:'POST',
            headers:{
          'content-type':'application/json'
        },
        body: JSON.stringify({'id':idNum,'name':name})
    };
        fetch(url,options)
        .then(response => {
            console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })
        this.props.history.push('/')
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        const name=event.target.name.value;
        name.toString();
        this.setState({
            name:name
        });
       this.callApi(this.state.name);

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
        const nameError=this.validateName();
        return(
        <form className="addForm" onSubmit={e=>this.handleSubmit(e)}>
            <fieldset>
                <legend>Create A Folder</legend>
                <label htmlFor="folderName"  >Name</label>
                <input name="folderName" type="text" name='name'/>
                <button type='submit'>Add Folder</button>
            </fieldset>
            <ValidationError message={nameError}/>
        </form>)
    }
}
FolderForm.propTypes={
    name:PropTypes.string.isRequired
}
export default withRouter(FolderForm)