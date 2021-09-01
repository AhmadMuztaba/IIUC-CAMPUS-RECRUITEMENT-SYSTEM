import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AlumniOwnProfile,updateAlumniInfo} from '../../actions/alumni/index';
import EditInfo from './file options/EditInfo';
import EditEducation from './file options/EditEducation';
import EditExperience from './file options/EditExperience';
class EditProfile extends Component {
    state={editinfo:false,editEdu:false,editExp:false}
    render(){
        return(
            <div className="editProfile" >
                <div className="editProfile__option" onClick={()=>{
                this.setState({editinfo:!this.state.editinfo})
            }}>
                    Edit Info
                </div>
                {
                    this.state.editinfo?<EditInfo/>:null
                }
                <div className="editProfile__option" onClick={()=>{
                this.setState({editEdu:!this.state.editEdu})
            }}>
                Edit Education
                </div>
                {
                this.state.editEdu?<EditEducation/>:null
            }
            <div className="editProfile__option" onClick={()=>{
                this.setState({editExp:!this.state.editExp})
            }}>
                Edit Experience
            </div>
            {
                this.state.editExp?<EditExperience/>:null
            }
            </div>
        )
    }
}
 
const mapStateToProps = (state) => {
    return ({
        profile: state.AlumniProfile
    })
}
export default connect(mapStateToProps, { AlumniOwnProfile,updateAlumniInfo })(EditProfile);