import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {UserSignIn} from '../../actions/user/index';
import Login from '../../Authentication/Login';

class UserLogin extends React.Component{
    componentDidMount(){
    }
    onSubmit=(formValues)=>{
        this.props.UserSignIn(formValues);
     }
    render(){
        if(this.props.userAuth.isAuthenticated&&!this.props.userAuth.loading){
            return(<Redirect to="/user/showProfile"/>)
           }
        return(<div>
            <Login onHandleSubmit={this.onSubmit}/>
        </div>)
    }
}
const mapStateToProps=(state)=>{
  return({userAuth:state.UserAuth})
}
export default connect(mapStateToProps,{
UserSignIn,
})(UserLogin)