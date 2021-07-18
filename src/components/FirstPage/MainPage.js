import React, { Component } from 'react';
import {connect} from 'react-redux';
import 'particles.js/particles';
import {Redirect} from 'react-router-dom'
import './css/MainPage.scss';
import JoinUs from './JoinUs';
import Signin from './Signin';
const particlesJS = window.particlesJS;

class MainPage extends Component {
    state={login:false,join:false};
    componentDidMount(){
        particlesJS.load('particles-js','assets/particles.json',function(){
            console.log('particles js loaded');
        });  
    }
    render() {
        if(this.props.userAuth.isAuthenticated&&!this.props.userAuth.loading){
            return(<Redirect to="/user/showProfile"/>)
           }
           if(this.props.alumniAuth.isAuthenticated&&!this.props.alumniAuth.loading){
            return(<Redirect to="/alumni/showProfile"/>)
           }
           if(this.props.adminAuth.isAuthenticated&&!this.props.adminAuth.loading){
            return(<Redirect to="/admin/showProfile"/>)
           }
           if(this.props.companyAuth.isAuthenticated&&!this.props.companyAuth.loading){
            return(<Redirect to="/company/showProfile"/>)
           }
        return (
            <>
            <div id="particles-js">
            <div className="mainpage">
                <div className="mainpage__leftside">
                <h1 className="mainpage__leftside--heading">Find The Best Job that suits you
                   Or
                Find the best Employee For your Job
                </h1>
                </div>
                <div className="mainpage__rightside">
                    <h1 className="mainpage__rightside--heading">Who are You ?</h1>
                    <p className="mainpage__rightside--paragraph">Job Seeker?Employee Seeker?Or the Ex-Student .We Got Everyone.</p>
                    <div className="mainpage__buttons">
                    <button className="mainpage__buttons--join" onClick={()=>{
                        this.setState({join:!this.state.join,login:false})
                    }}>Join Today</button>
                    <button className="mainpage__buttons--login" onClick={()=>{
                        this.setState({login:!this.state.login,join:false})
                    }} >Log in</button>
                    </div>
                     {this.state.login?<Signin/>:null}
                    {this.state.join?<JoinUs/>:null}
                </div>
            </div>
            </div>
         </>
           
        );
    }
}

const mapStateToProps=(state)=>{
    return({
        userAuth:state.UserAuth,
        alumniAuth:state.AlumniAuth,
        adminAuth:state.AdminAuth,
        companyAuth:state.CompanyAuth
    })
}

export default connect(mapStateToProps)(MainPage);