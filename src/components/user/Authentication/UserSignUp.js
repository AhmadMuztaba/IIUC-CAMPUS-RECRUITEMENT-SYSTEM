import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {UserRegistration} from '../../actions/user/index';
import SignUp from '../../Authentication/SignUp';
class UserSignUp extends React.Component{
    onSubmit=(formValues)=>{
        this.props.UserRegistration(formValues);
     }
    render(){
        if(this.props.userAuth.isAuthenticated&&!this.props.userAuth.loading){
         return(<Redirect to="/user/showProfile"/>)
        }else{
            return(<div>
                <SignUp onHandleSubmit={this.onSubmit}/>
            </div>)
        }
        
    }
}
const mapStateToProps=(state)=>{
  return({userAuth:state.UserAuth})
}
export default connect(mapStateToProps,{
UserRegistration,
})(UserSignUp)