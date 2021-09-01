import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserOwnProfile } from '../../../actions/user/index';
import EditEachExperience from './EditEachExperience';
import moment from 'moment';
class EditExperience extends Component {
    componentDidMount() {
        this.props.UserOwnProfile();
    }
    render() {
        if (this.props.profile.userProfile.experience.length < 1) {
            return 'Add experince first'
        }
        return (
            <div>
                {
                    this.props.profile.userProfile.experience.map((exp) => {
                        return (<div><EditEachExperience id={exp._id} initialValues={{...exp,from:moment.utc(exp.from).format("yyyy-MM-DD"),to:moment.utc(exp.to).format("yyyy-MM-DD")}}/></div>)
                    })
                }
            </div>


        );
    }
}

const mapStateToProps = (state) => {
    return ({ profile: state.UserProfile })
}

export default connect(mapStateToProps, { UserOwnProfile })(EditExperience);