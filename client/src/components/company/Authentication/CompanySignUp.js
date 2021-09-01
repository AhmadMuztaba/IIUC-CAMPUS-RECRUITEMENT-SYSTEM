import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {CompanyRegistration} from '../../actions/company';
import SignUp from '../../Authentication/SignUp';
class CompanySignUp extends React.Component{
    onSubmit=(formValues)=>{
        this.props.CompanyRegistration(formValues);
     }
    render(){
        if(this.props.auth.isAuthenticated&&!this.props.auth.loading){
            return(<Redirect to="/company/showProfile"/>)
        }
        return(<div>
            <SignUp onHandleSubmit={this.onSubmit}/>
        </div>)
    }
}
const mapStateToProps=(state)=>{
    return({
        auth:state.CompanyAuth
    })
}

export default connect(mapStateToProps,{
CompanyRegistration,
})(CompanySignUp)