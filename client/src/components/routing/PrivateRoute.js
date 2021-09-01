import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route,Redirect} from 'react-router';
const PrivateRoute = ({component:Component,auth,...rest}) => (
<Route {...rest} render={props=>!auth.isAuthenticated&&!auth.loading?<Redirect to="/user/login"/>:<Component {...props}/>}/>)

PrivateRoute.propTypes={
    auth:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>{
    return({auth:state.UserAuth})
}
export default connect(mapStateToProps)(PrivateRoute);