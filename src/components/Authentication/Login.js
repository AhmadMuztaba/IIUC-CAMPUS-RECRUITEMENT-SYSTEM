import React from 'react';
import {reduxForm,Field} from 'redux-form';
import particlesConfig from './config/particle-config';
import Particles from 'react-particles-js';
import './css/Authentication.scss'
class Login extends React.Component{
    renderError=({error,touched})=>{
        if(touched&&error){
            return (<div className="login__form--form--error">{error}</div>)
        }
        else{
            return null;
        }
    }

    renderinput=({input,meta,type})=>{
       return(
           <div>
               <input className="login__form--form--input"{...input} type={type}/>
            {this.renderError(meta)}
           </div>
       )
    }
    onSubmit=(formValues)=>{
        this.props.onHandleSubmit(formValues);
    }

    render(){
      return(
          <div className="login">
              <div style={{height:'100vh',width:'100vw',backgroundImage: 'linear-gradient(45deg, #035976, rgba(14,2,14))',filter:'blur(2px)'}}>
                  <Particles params={particlesConfig} style={{height:"100vh",width:'100vw'}}></Particles>
              </div>
              <div className="login__form">
              <div className="login__form--login">
                  <span className="login__form--login-log">Log</span>In
              </div>
              <div className="login__form--form">
              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <label className="login__form--form--label"name="email" >Email</label>
              <Field name="email" type="email" component={this.renderinput}/>
              <label className="login__form--form--label" name="password">Password</label>
              <Field name="password" type="password" component={this.renderinput}/>
              <div className="center">
              <button className="login__form--form--button">Login</button>
              </div>
        </form>
        </div>
              </div>
             
         
        </div>
      )
    }
}
const validate=(formValues)=>{
    const error={}
    if(!formValues.email){
        error.email="enter email"
    }
    if(!formValues.password){
        error.password="password is required"
    }
    return error;
}

export default reduxForm({
    form:'LoginForm',
    validate
})(Login);