import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { CompanyOwnProfile,CompanySignOut} from '../../actions/company/index';
import {loadUser} from '../../actions/index';
import Dashbard from './Dashboard';
import Loader from '../../utility/Loader';
import axios from 'axios';
class ShowCompanyProfile extends React.Component {
    componentDidMount() {
        this.props.loadUser();
        this.props.CompanyOwnProfile();
    }
    render() {    
        if (this.props.CompanyProfile.loading&&this.props.company.loading) {
            return (<Loader/>)
        }  
        else if (!this.props.CompanyProfile.companyProfile && !this.props.CompanyProfile.loading&&!this.props.company.loading) {
            return (<div className="noprofile">
               <h1 className="noprofile__welcome">Welcome {this.props.company.company.name}</h1>
                <div className="noprofile__button">
                    <div>
                    <Link to="/company/createProfile"><div className="noprofile__button--createprofile">Create profile</div></Link>
                    </div>
                    <div>
                    <Link to="/"><div className="noprofile__button--signout"
                onClick={()=>{  
                    this.props.CompanySignOut();
                }}>SignOut</div></Link>
                    </div>
                </div>
            </div>)
        }
        else if (this.props.CompanyProfile.companyProfile && !this.props.CompanyProfile.loading) {
            return (<div>
               <Dashbard/>
            </div>)
        }
        else{
            return (<Loader/>)
        }   
    }
}
const mapStateToProps = (state) => {
    return ({
        company: state.CompanyAuth,
        CompanyProfile: state.CompanyProfile
    });
}
export default connect(mapStateToProps,{CompanyOwnProfile, loadUser,CompanySignOut })(ShowCompanyProfile);