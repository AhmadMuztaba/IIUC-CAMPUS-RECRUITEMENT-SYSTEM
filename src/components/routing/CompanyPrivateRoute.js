import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {connect} from 'react-redux';
const CompanyPrivateRoute = ({component:Component,auth,...rest}) =>
<Route {...rest} render={props=>!auth.loading&&!auth.isAuthenticated?<Redirect to="/company/login"/>:<Component {...props}/>
}/>

const mapStateToProps=(state)=>{
 return({auth:state.CompanyAuth})
}
export default connect(mapStateToProps)(CompanyPrivateRoute);