import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Route} from 'react-router-dom'

ReactDOM.render( 
<BrowserRouter>
    <Route exact path='/' render={()=>{return<App />}}/>
</BrowserRouter> , document.getElementById('root'));