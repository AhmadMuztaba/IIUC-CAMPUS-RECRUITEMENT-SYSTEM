import React, {} from 'react';
import {reduxForm,Field} from 'redux-form';
import './css/Authentication.scss';
import particlesConfig from './config/particle-config';
import Particles from 'react-particles-js';
class SignUp extends React.Component{
    FormErrors=({error,touched})=>{
     if(touched&&error){
         return (<div className="login__form--form--error">{error}</div>);
     }
    }

    onHandleChange=({input,meta,type})=>{
       return (<div>
        <input className="signup__form--form--input" {...input} type={type}/>
        <div>
            {this.FormErrors(meta)}
        </div>
       </div>
       )
    }
    onSubmit=(formValues)=>{
        this.props.onHandleSubmit(formValues);
    }
    render(){
      return(
          <div className="signup">
               <div style={{height:'100vh',width:'100vw',backgroundImage: 'linear-gradient(45deg, #035976, rgba(14,2,14))',filter:'blur(2px)'}}>
                  <Particles params={particlesConfig} style={{height:"100vh",width:'100vw'}}></Particles>
              </div>
              <div className="signup__form">
              <div className="signup__form--signup">
                  <span className="signup__form--signup-sign">Sign</span>Up
              </div>
              <div className="signup__form--form">
              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <label className="signup__form--form--label" name="name">Name</label>
            <Field name="name" type="text" component={this.onHandleChange}/>
            <label className="signup__form--form--label" name="email">Email</label>
            <Field name="email" type="email" component={this.onHandleChange}/>
            <label className="signup__form--form--label" name="password">Password</label>
            <Field name="password" type="password" component={this.onHandleChange}/>
            <div className="center">
            <button className="signup__form--form--button">signup</button>
            </div>
            </form>
              </div>
              </div>
          </div>
      )
    }
}
const validate=(formValues)=>{
    const error={};
    if(!formValues.name){
        error.name="your name?"
    }
    if(!formValues.email){
        error.email="Email is needed."
    }
    if(!formValues.password){
        error.password="password?"
    }
    return error;
}
export default reduxForm({
    form: 'SignUpForm',
    validate
  })(SignUp);