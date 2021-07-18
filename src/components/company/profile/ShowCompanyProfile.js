import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { CompanyOwnProfile} from '../../actions/company/index';
import {loadUser} from '../../actions/index';
import Dashbard from './Dashboard';

class ShowCompanyProfile extends React.Component {
    componentDidMount() {
        this.props.loadUser();
        this.props.CompanyOwnProfile();
    }
    render() {
        console.log(this.props);
        
        if (this.props.CompanyProfile.loading&&this.props.company.loading) {
            return (<div>Loading</div>)
        }  
        else if (!this.props.CompanyProfile.companyProfile && !this.props.CompanyProfile.loading&&!this.props.company.loading) {
            return (<div><h1>Welcome</h1>
                {this.props.company.company.name}
                <Link to="/company/createProfile"><button>Create profile</button></Link>
            </div>)
        }
        else if (this.props.CompanyProfile.companyProfile && !this.props.CompanyProfile.loading) {
            return (<div>
               <Dashbard/>
            </div>)
        }
        else{
            return(<div>Loading</div>)
        }
        
    }
}
const mapStateToProps = (state) => {
    return ({
        company: state.CompanyAuth,
        CompanyProfile: state.CompanyProfile
    });
}
export default connect(mapStateToProps,{CompanyOwnProfile, loadUser })(ShowCompanyProfile);