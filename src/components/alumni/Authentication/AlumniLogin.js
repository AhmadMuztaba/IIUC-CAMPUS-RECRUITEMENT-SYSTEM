import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import {AlumniSignIn} from '../../actions/alumni';
import Login from '../../Authentication/Login';
class AlumniLogin extends React.Component{
    onSubmit=(formValues)=>{
        this.props.AlumniSignIn(formValues);
     }
    render(){
        if(!this.props.auth.loading&&this.props.auth.isAuthenticated){
            return(<Redirect to="/alumni/showProfile"/>);
        }
        return(<div>
            <Login onHandleSubmit={this.onSubmit}/>
        </div>)
    }
}
const mapStateToProps=(state)=>{
    return({auth:state.AlumniAuth})
}
export default connect(mapStateToProps,{
AlumniSignIn,
})(AlumniLogin)