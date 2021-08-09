import React, { Component } from 'react';
import { connect } from 'react-redux';
import {AlumniOwnProfile,alumniEditExperience} from '../../../actions/alumni/index';
import moment from 'moment';
import EditEachExperience from './EditEachExperience';
class EditExperience extends Component {
    componentDidMount() {
        this.props.AlumniOwnProfile();
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
    return ({ profile: state.AlumniProfile })
}

export default connect(mapStateToProps, { AlumniOwnProfile,alumniEditExperience })(EditExperience);