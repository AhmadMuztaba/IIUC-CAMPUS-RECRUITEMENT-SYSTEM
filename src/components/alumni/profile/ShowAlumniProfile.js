import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { AlumniOwnProfile,AlumniSignOut} from '../../actions/alumni/index';
import {loadUser} from '../../actions/index';
import Dashbard from './Dashboard';
import './CSS/ShowProfile.scss';
import Loader from '../../utility/Loader';

class ShowProfile extends React.Component {
    componentDidMount() {
        this.props.loadUser();
        this.props.AlumniOwnProfile();
    }
    render() {
        if (this.props.AlumniProfile.loading) {
            return (<Loader/>)
        }
        else if (!this.props.AlumniProfile.alumniProfile && !this.props.AlumniProfile.loading&&!this.props.alumni.loading) {
            return (<div className="noprofile"><h1 className="noprofile__welcome">Welcome {this.props.alumni.alumni.name}</h1>
            <div className="noprofile__button">
                <div>
                <Link to="/alumni/createProfile"><div className="noprofile__button--createprofile">Create profile</div></Link>
                </div>
                <div>
                <Link to="/"><div className="noprofile__button--signout"
                onClick={()=>{  
                    this.props.AlumniSignOut();
                }}>SignOut</div></Link>
                </div>
                </div>
            </div>)
        }
        else if (this.props.AlumniProfile.alumniProfile && !this.props.AlumniProfile.loading) {
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
        alumni: state.AlumniAuth,
        AlumniProfile: state.AlumniProfile
    });
}
export default connect(mapStateToProps,{ AlumniOwnProfile, loadUser,AlumniSignOut })(ShowProfile);