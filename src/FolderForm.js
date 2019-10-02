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
        .then(this.context.addFolder({folder_name}))
        .catch(error =>{
            console.log(error)
        }) 
        this.setState({
            folder_name:folder_name
        });
        this.props.history.push('/')
    }
    handleSubmit(event){
        event.preventDefault();
        const folder_name=event.target.folderName.value;
       this.validateName(folder_name);
    }
    validateName=(folder_name)=> {
        let results;
        console.log('ive been called')
        console.log(folder_name)
    if (folder_name===undefined ||folder_name.length === 0) {
      results= "Name is required";
    }else if (folder_name.length < 3) {
      results= "Name must be at least 3 characters long.";
    }else{this.callApi(folder_name)}
    this.setState({error:results});
  }

    render(){
        return (
        <Context.Consumer>{(value)=>{
        return(
        <form className="addForm" onSubmit={e=>this.handleSubmit(e)}>
            <fieldset>
                <legend>Create A Folder</legend>
                <label htmlFor="folderName">Name:
                <input name="folderName" id="folderName" type="text" aria-required="true" aria-describedby="error" placeholder="Folder Name"/></label><br/>
                <button type='submit' className="addFolderButton">Add Folder</button>
            </fieldset>
            <ValidationError message={this.state.error}/>
        </form>
        )}}
    </Context.Consumer>
    )}
}
FolderForm.propTypes={
    name:PropTypes.string,
    idNum:PropTypes.string
}
export default withRouter(FolderForm)