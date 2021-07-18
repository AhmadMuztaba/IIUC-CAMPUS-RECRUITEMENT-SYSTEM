import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addAlumniEducation} from '../../../actions/alumni/index';

import { Field, reduxForm } from 'redux-form';
class PostEducation extends Component {
    state = { button: true }
    renderError = ({ error, touched }) => {
        if (error && touched) {
            return (<div className="Normal-Error">
                {error}
            </div>)
        }
        else {
            return null;
        }
    }
    renderInput = ({ input, meta, label }) => {
        return (
            <div>
                <label>{label}</label>
                <input {...input} />
                <div>
                    {this.renderError(meta)}
                </div>
            </div>

        )
    }
    onHandleSubmit = (formValue) => {
        this.setState({ button: false })
        this.props.addAlumniEducation(formValue);
    }
    render() {
        if(!this.props.profile.loading&&this.props.profile.alumniProfile.alumniProfile.education.length>0){
            return null
        }
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onHandleSubmit)}>
                    <Field component={this.renderInput} name="school" label="school" />
                    <Field component={this.renderInput} name="college" label="college" />
                    <Field component={this.renderInput} name="university" label="university" />
                    <Field component={this.renderInput} name="fieldOfStudy" label="field Of Study" />
                    <Field component={this.renderInput} name="BscPassingYear" label="BSC Passing Year" />
                    <Field component={this.renderInput} name="description" label="Description" />
                    {
                        this.state.button ? <button type="submit">Add</button> : <button disabled >Submitting</button>
                    }

                </form>

            </div>
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
})(PostEducation);


const mapStateToProps = (state) => {
    return ({ profile: state.AlumniProfile })
}
export default connect(mapStateToProps, {
    addAlumniEducation
})(form);