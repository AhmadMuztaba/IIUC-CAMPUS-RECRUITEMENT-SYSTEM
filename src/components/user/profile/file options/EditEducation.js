import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserOwnProfile,editEducation} from '../../../actions/user/index';
import '../CSS/editInfo.scss';
import { Field, reduxForm } from 'redux-form';
class EditEducation extends Component {
    state = { button: true,id:''}
    renderError = ({ error, touched }) => {
        if (error && touched) {
            return (<div className="createProfile__error">
                {error}
            </div>)
        }
        else {
            return null;
        }
    }
    renderInput = ({ input, meta, label,value }) => {
        return (
            <div>
                <label>{label}</label>
                <input {...input} className="education_input"/>
                <div>
                    {this.renderError(meta)}
                </div>
            </div>

        )
    }
    onHandleSubmit = (props) => {
        setTimeout(()=>{
            this.setState({button:false})
        },10000)
    
    this.props.editEducation(props,this.state.id);
    }
    componentDidMount(){
        this.props.UserOwnProfile();
    }
    render() {
        if(this.props.profile.userProfile.education.length<1){
            return('No education added yet');
        }
        return (
            this.props.profile.userProfile.education.map((edu,index)=>{
               return(<div className="utility__flex animation" key={index}>
               <form onSubmit={this.props.handleSubmit(
                   this.onHandleSubmit
               )}>
                   <Field component={this.renderInput} name="school" label="school" />
                   <Field component={this.renderInput} name="college" label="college" />
                   <Field component={this.renderInput} name="university" label="university" />
                   <Field component={this.renderInput} name="fieldOfStudy" label="field Of Study" />
                   <Field component={this.renderInput} name="BscPassingYear" label="BSC Passing Year" />
                   <Field component={this.renderInput} name="description" label="Description" />
                   <div className="AboutSection__btn">
                   {
                       this.state.button?<button type="submit" className="AboutSection__btn--add" onClick={()=>{
                           this.setState({id:edu._id});
                       }}>Edit</button> : <button disabled className="createProfile__btn--add">Submitting</button>
                   }
                   </div>
               </form>
           </div>)
            })
            
        );
    }
}
const validate = (formValues) => {
    const error = {};
    if (!formValues.school) {
        error.school = "School needed";
    }
    if (!formValues.college) {
        error.college = "College needed"
    }
    if (!formValues.university) {
        error.university = "University needed"
    }
    return error;
}


const form = reduxForm({
    form: 'Education',
      validate
})(EditEducation);
const mapStateToProps=(state)=>{
    return{profile:state.UserProfile,
        initialValues:{
            school:state.UserProfile.userProfile.education[0].school,
            college:state.UserProfile.userProfile.education[0].college,
            university:state.UserProfile.userProfile.education[0].university,
            fieldOfStudy:state.UserProfile.userProfile.education[0].fieldOfStudy,
            BscPassingYear:state.UserProfile.userProfile.education[0].BscPassingYear,
            description:state.UserProfile.userProfile.education[0].description
        }
    }
}
export default connect(mapStateToProps,{UserOwnProfile,editEducation})(form);