import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { AlumniOwnProfile} from '../../actions/alumni/index';
import {loadUser} from '../../actions/index';
import Dashbard from './Dashboard';

class ShowProfile extends React.Component {
    componentDidMount() {
        this.props.loadUser();
        this.props.AlumniOwnProfile();
    }
    render() {
        if (this.props.AlumniProfile.loading) {
            return (<div>Loading</div>)
        }
        else if (!this.props.AlumniProfile.alumniProfile && !this.props.AlumniProfile.loading&&!this.props.alumni.loading) {
            return (<div><h1>Welcome</h1>
                {this.props.alumni.alumni.name}
                <Link to="/alumni/createProfile"><button>Create profile</button></Link>
            </div>)
        }
        else if (this.props.AlumniProfile.alumniProfile && !this.props.AlumniProfile.loading) {
            return (<div>
               <Dashbard/>
            </div>)
        }
    }
}
const mapStateToProps = (state) => {
    return ({
        alumni: state.AlumniAuth,
        AlumniProfile: state.AlumniProfile
    });
}
export default connect(mapStateToProps,{ AlumniOwnProfile, loadUser })(ShowProfile);