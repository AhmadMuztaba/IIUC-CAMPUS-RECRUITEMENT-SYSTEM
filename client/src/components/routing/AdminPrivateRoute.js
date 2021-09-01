import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
const AdminPrivateRoute = ({component:Component,auth,...rest}) =>(
   <Route {...rest} render={props=>!auth.isAuthenticated&&!auth.loading?<Redirect to="/admin/login"/>:<Component {...props}/>} />
)

const mapStateToProps=(state)=>{
    return({auth:state.AdminAuth})
}
export default connect(mapStateToProps)(AdminPrivateRoute);