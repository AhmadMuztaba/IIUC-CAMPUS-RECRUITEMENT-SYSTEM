import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {CompanySignIn} from '../../actions/company';
import Login from '../../Authentication/Login';
class CompanyLogin extends React.Component{
    onSubmit=(formValues)=>{
        this.props.CompanySignIn(formValues);
     }
    render(){
        if(this.props.auth.isAuthenticated&&!this.props.auth.loading){
            return(<Redirect to="/company/showProfile"/>)
        }
        return(<div>
            <Login onHandleSubmit={this.onSubmit}/>
        </div>)
    }
}
const mapStateToProps=(state)=>{
    return({
        auth:state.CompanyAuth
    })
}

export default connect(mapStateToProps,{
CompanySignIn,
})(CompanyLogin)