import React from 'react';
import {connect} from 'react-redux';
import {AdminRegistration} from '../../actions/admin';
import SignUp from '../../Authentication/SignUp';
class AdminSignUp extends React.Component{
  
    onSubmit=(formValues)=>{
        this.props.AdminRegistration(formValues);
     }
    render(){
        return(<div>
            <SignUp onHandleSubmit={this.onSubmit}/>
        </div>)
    }
}
export default connect(null,{
AdminRegistration,
})(AdminSignUp)