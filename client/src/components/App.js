import React from 'react';
import './App.scss';
import {connect} from 'react-redux';
import {Route, Switch, BrowserRouter,Router} from 'react-router-dom';
import {loadUser} from './actions/index';
import UserLogin from './user/Authentication/UserLogin'
import UserSignUp from './user/Authentication/UserSignUp';
import AlumniSignUp from './alumni/Authentication/AlumniSignUp';
import AlumniLogin from './alumni/Authentication/AlumniLogin';
import CompanySignUp from './company/Authentication/CompanySignUp';
import CompanyLogin from './company/Authentication/CompanyLogin';
import AdminSignUp from './admin/Authentication/AdminSignUp';
import AdminLogin from './admin/Authentication/AdminLogin';
import Dashbard from './user/profile/Dashboard';
import WatchCompanyProfile from './user/profile/WatchCompanyProfile';
import WatchAlumniProfile from './user/profile/WatchAlumniProfile';
import ShowProfile from './user/profile/ShowProfile';
import CreateProfile from './user/profile/CreateProfile';
import ShowUserBlogById from './user/profile/ShowUserBlogById';
import Comments from './user/profile/file options/Comments.js';
import ShowAlumniBlogById from './user/profile/ShowAlumniBlogById';
import MainPage from './FirstPage/MainPage';
import Error from '../components/Error/Error';
import PrivateRoute from './routing/PrivateRoute';
import AlumniPrivateRoute from './routing/AlumniPrivateRoute';
import CompanyPrivateRoute from './routing/CompanyPrivateRoute';
import ShowAlumniProfile from './alumni/profile/ShowAlumniProfile';
import CreateAlumniProfile from './alumni/profile/CreateProfile';
import ShowAlumniBlogByAlumni from './alumni/profile/ShowAlumniBlogById';
import ShowUserBlogByAlumni from './alumni/profile/ShowUserBlogById';
import WatchUserProfile from './alumni/profile/WatchUserProfile';
import ShowCompanyProfile from './company/profile/ShowCompanyProfile';
import CreateCompanyProfile from './company/profile/CreateProfile';
import WatchUser from './company/profile/WatchUserProfile';
import AdminPrivateRoute from './routing/AdminPrivateRoute';
import AdminDashboard from './admin/profile/AdminDashboard';
import ShowUserBlogByIdAdmin from './admin/profile/ShowUserBlogByIdAdmin';
import ShowAlumniBlogByIdAdmin from './admin/profile/ShowAlumniBlogByIdAdmin';
import WatchUserProfileAdmin from './admin/profile/WatchUserProfileAdmin';
import WatchAlumniProfileAdmin from './admin/profile/WatchAlumniProfileAdmin';
import WatchCompanyProfileAdmin from './admin/profile/WatchCompanyProfileAdmin';
import history from './History/index';
// import Navb from './Navbar/index';
class App extends React.Component{
  componentDidMount(){
    this.props.loadUser();
  }
  render(){
    return (
      <Router history={history}>
        {/* <Navb/> */}
       <Route path="/" exact component={MainPage}/>
      <Error/>
        <Route path="/user/signup" exact component={UserSignUp}/>
        <Route path="/user/login" exact component={UserLogin}/>
        <Route path="/alumni/signup" exact component={AlumniSignUp}/>
        <Route path="/alumni/login" exact component={AlumniLogin}/>
        <Route path="/company/signup" exact component={CompanySignUp}/>
        <Route path="/company/login" exact component={CompanyLogin}/>
        <Route path="/admin/signup" exact component={AdminSignUp}/>
        <Route path="/admin/login" exact component={AdminLogin}/>
        <Switch>
        <AdminPrivateRoute path="/admin/watch/companyProfile/:userid" exact component={WatchCompanyProfileAdmin}/>
        <AdminPrivateRoute path="/admin/watch/alumniProfile/:userid" exact component={WatchAlumniProfileAdmin}/>
        <AdminPrivateRoute path="/admin/watch/userProfile/:userid" exact component={WatchUserProfileAdmin}/>
        <AdminPrivateRoute path="/admin/showProfile" exact component={AdminDashboard}/>
        <AdminPrivateRoute path="/admin/userBlog/:blogId" exact component={ShowUserBlogByIdAdmin}/>
        <AdminPrivateRoute path="/admin/alumniBlog/:blogId" exact component={ShowAlumniBlogByIdAdmin}/>
        <CompanyPrivateRoute path="/company/showProfile"component={ShowCompanyProfile}/>
        <CompanyPrivateRoute path="/company/createProfile" component={CreateCompanyProfile}/>
        <CompanyPrivateRoute path="/company/watch/userProfile/:userid" component={WatchUser}/>
        <AlumniPrivateRoute path="/alumni/showProfile" component={ShowAlumniProfile}/>
        <AlumniPrivateRoute path="/alumni/createProfile" component={CreateAlumniProfile}/>
        <AlumniPrivateRoute path="/alumni/watch/userProfile/:userid" component={WatchUserProfile}/>
        <AlumniPrivateRoute path="/alumni/userBlog/show/:blogId" component={ShowUserBlogByAlumni}/>
        <AlumniPrivateRoute path="/alumni/AlumniBlog/show/:blogId" component={ShowAlumniBlogByAlumni}/>
        <PrivateRoute exact path="/user/showProfile" component={ShowProfile} />
        <PrivateRoute exact path="/user/createProfile" component={CreateProfile}/>
        <PrivateRoute exact path="/user/Dashboard" component={Dashbard}/>
        <PrivateRoute exact path="/userBlog/show/:blogId"  component={ShowUserBlogById}/>
        <PrivateRoute exact path="/userBlog/show/:blogId/comments"  component={Comments}/>
        <PrivateRoute exact path="/AlumniBlog/show/:blogId" component={ShowAlumniBlogById}/>
        <PrivateRoute exact path="/user/companyprofile/watch/:userid" component={WatchCompanyProfile}/>
        <PrivateRoute exact path="/user/Alumniprofile/watch/:userid" component={WatchAlumniProfile}/>
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps=(state)=>{
  return({state:state});
}
export default connect(mapStateToProps,{loadUser})(App);
