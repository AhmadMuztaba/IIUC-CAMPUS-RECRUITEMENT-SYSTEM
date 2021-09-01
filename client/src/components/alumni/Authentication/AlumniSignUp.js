import React from 'react';
import {connect} from 'react-redux';
import {AlumniRegistration,loadUser} from '../../actions/alumni';
import SignUp from '../../Authentication/SignUp';
class AlumniSignUp extends React.Component{
  
    onSubmit=(formValues)=>{
        this.props.AlumniRegistration(formValues);
     }
    render(){
        return(<div>
            <SignUp onHandleSubmit={this.onSubmit}/>
        </div>)
    }
}
export default connect(null,{
AlumniRegistration,
})(AlumniSignUp)