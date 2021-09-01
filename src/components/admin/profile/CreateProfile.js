import React from 'react';
import { connect } from 'react-redux';
import {Redirect } from 'react-router-dom';
import { CreateOwnProfile, UserOwnProfile } from '../../actions/user/index'
import { reduxForm, Field } from 'redux-form';
import Dashboard from './Dashboard';
import '../../Error/css/Error.css'
class CreateProfile extends React.Component {
    state = { button: true }
    componentDidMount() {
        this.props.UserOwnProfile();
    }
    renderError = ({ error, touched }) => {
        if (error && touched) {
            return (<div className="Normal-Error">{error}</div>)
        }
    }
    renderInput = ({ input, label, meta, type }) => {
        if (this.props.userProfile) {
            return (<Dashboard />)
        }
        return (
            <div>
                <label>{label}</label>
                <input {...input} type={type} />
                {this.renderError(meta)}
            </div>
        )
    }
    HandleSubmit = (formValues) => {
        this.setState({ button: false })
        this.forceUpdate();

        let skills = "";
        if (formValues.Web) {
            skills = skills.concat("Web-Development")
        }
        if (formValues.Android) {
            skills = skills.concat("Android");
        }
        if (formValues.IOS) {
            skills = skills.concat("IOS");
        }
        if (formValues.ProblemSolver) {
            skills = skills.concat("Problem-Solver,");
        }
        if (formValues.Others) {
            skills = skills.concat("Others");
        }
        const values = { ...formValues, skills };
        this.props.CreateOwnProfile(values);

    }
    render() {
        if (this.props.profile.loading) {
            return (<div>Loading</div>)
        }
        else if (!this.props.profile.userProfile && !this.props.profile.loading) {
            return (
                <form onSubmit={this.props.handleSubmit(this.HandleSubmit)}>
                    <Field name="dateOfBirth" type="date" component={this.renderInput} label="Date Of Birth" />
                    <Field name="nationality" type="text" component={this.renderInput} label="Nationality" />
                    <Field name="company" type="text" component={this.renderInput} label="Company" />
                    <Field name="website" type="text" component={this.renderInput} label="website" />
                    <Field name="location" type="text" component={this.renderInput} label="location" />
                    <Field name="status" type="text" component={this.renderInput} label="status" />
                    <Field name="Web" type="checkbox" component={this.renderInput} label="Web-Developer" value="Web-Developer" />
                    <Field name="Android" type="checkbox" component={this.renderInput} label="Android-Developer" value="Android-Developer" />
                    <Field name="IOS" type="checkbox" component={this.renderInput} label="IOS-Developer" value="IOS-Developer" />
                    <Field name="ProblemSolver" type="checkbox" component={this.renderInput} label="Problem-Solver" value="Problem-Solver" />
                    <Field name="Others" type="checkbox" component={this.renderInput} label="Others" value="Others" />
                    <Field name="bio" type="text" component={this.renderInput} label="bio" />
                    <Field name="githubUserName" type="text" component={this.renderInput} label="GitHub Name" />
                    <Field name="codeforceUserName" type="text" component={this.renderInput} label="CodeForce Name" />
                    <Field name="facebook" type="text" component={this.renderInput} label="Facebook" />
                    <Field name="linkedin" type="text" component={this.renderInput} label="Website" />
                    <Field name="twitter" type="text" component={this.renderInput} label="Twitter" />
                    <Field name="youtube" type="text" component={this.renderInput} label="Youtube" />
                    <Field name="instagram" type="text" component={this.renderInput} label="Instagram" />
                    {
                        this.state.button ? <button type="submit">Add</button> : <button disabled >Submitting</button>
                    }
                </form>
            )
        }
        else if (this.props.profile.userProfile && !this.props.profile.loading) {
            return (<div>
                <Redirect to="/user/showprofile"/>
            </div>)
        }


    }
}

const validate = (formValue) => {
    const error = {};
    if (!formValue.Web && !formValue.IOS && !formValue.Android && !formValue.ProblemSolver && !formValue.Others) {
        error.Web = "Must be checked one of this";
    }
    if (!formValue.status) {
        error.status = "needed"
    }
    if (!formValue.bio) {
        error.bio = "bio needed"
    }
    if (!formValue.dateOfBirth) {
        error.dateOfBirth = "Birth date needed"
    }
    if (!formValue.nationality) {
        error.nationality = "nationality needed"
    }
    return error;
}

const mapStateToProps = (state) => {
    return ({ profile: state.UserProfile })
}

const form = reduxForm({
    form: 'CreateUserProfile',
    validate,
})(CreateProfile);

export default connect(mapStateToProps, { CreateOwnProfile, UserOwnProfile })(form);