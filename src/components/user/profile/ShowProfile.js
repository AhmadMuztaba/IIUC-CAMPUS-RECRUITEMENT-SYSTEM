import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { UserOwnProfile,UserSignOut } from '../../actions/user/index';
import {loadUser} from '../../actions/index';
import Dashbard from './Dashboard';
import './CSS/ShowProfile.scss';
import Loader from '../../utility/Loader';
import history from '../../History';
class ShowProfile extends React.Component {
    componentDidMount() {
        this.props.loadUser();
        this.props.UserOwnProfile();
    }
    render() {
        if (this.props.userProfile.loading) {
            return (<Loader/>)
        }
        else if (!this.props.userProfile.userProfile&& !this.props.userProfile.loading &&this.props.user.user) {
            return (<div className="noprofile"><h1 className="noprofile__welcome">Welcome {this.props.user.user.name}</h1>
            <div className="noprofile__button">
                <div>
                <Link to="/user/createProfile"><div className="noprofile__button--createprofile">Create profile</div></Link>
                </div>
                <div>
                <Link to="/"><div className="noprofile__button--signout"
                onClick={()=>{  
                    this.props.UserSignOut();
                }}>SignOut</div></Link>
                </div>
                </div>
            </div>)
        }
        else if (this.props.userProfile.userProfile && !this.props.userProfile.loading) {
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
        user: state.UserAuth,
        userProfile: state.UserProfile
    });
}
export default connect(mapStateToProps, { UserOwnProfile, loadUser,UserSignOut })(ShowProfile);