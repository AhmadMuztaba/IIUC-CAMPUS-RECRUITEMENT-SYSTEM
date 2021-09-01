import React from 'react';
import {connect} from 'react-redux';
import {Redirect,Route} from 'react-router-dom';

const AlumniPrivateRoute = ({component:Component,auth:{isAuthenticated,loading},...rest}) =>(
    <Route {...rest} render={props=>!isAuthenticated&&!loading?<Redirect to="/alumni/login"/>:<Component {...props}/>}/>
);

const mapStateToProps=(state)=>{
    return({auth:state.AlumniAuth})
}
export default connect(mapStateToProps)(AlumniPrivateRoute);