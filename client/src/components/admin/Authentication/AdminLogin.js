import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import {AdminSignIn} from '../../actions/admin';
import Login from '../../Authentication/Login';
class AdminLogin extends React.Component{

    onSubmit=(formValues)=>{
        console.log(formValues);
        this.props.AdminSignIn(formValues);
     }
    render(){
        if(!this.props.auth.loading&&this.props.auth.isAuthenticated){
            return(<Redirect path="/admin/showProfile"/>);
        }
        return(<div>
            <Login onHandleSubmit={this.onSubmit}/>
        </div>)
    }
}
const mapStateToProps=(state)=>{
    return({auth:state.AdminAuth})
}
export default connect(mapStateToProps,{
AdminSignIn,
})(AdminLogin)