import {combineReducers} from 'redux';
import {UserAuth} from './Auth/UserAuth';
import {ALUMNIAuth} from './Auth/AlumniAuth';
import {AlumniProfile} from './profile/AlumniProfile'
import {ADMINAuth} from './Auth/AdminAuth';
import {CompanyAuth} from './Auth/CompanyAuth';
import {UserProfile} from './profile/UserProfile';
import {Blogs} from './Blogs/Blogs';
import {upload} from './utility/Upload';
import {ERROR} from './utility/ERROR';
import {reducer} from 'redux-form';
import {CompanyProfile} from './profile/CompanyProfile';
import {Job} from './Job/Job';
import {AdminProfile} from './profile/AdminProfile'
export default combineReducers({
    UserAuth:UserAuth,
    AlumniAuth:ALUMNIAuth,
    CompanyAuth:CompanyAuth,
    AdminAuth:ADMINAuth,
    UserProfile:UserProfile,
    Blogs:Blogs,
    upload:upload,
    form:reducer,
    Error:ERROR,
    AlumniProfile:AlumniProfile,
    CompanyProfile:CompanyProfile,
    Job:Job,
    AdminProfile:AdminProfile
})