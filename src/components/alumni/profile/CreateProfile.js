import React from 'react';
import { connect } from 'react-redux';
import {Redirect } from 'react-router-dom';
import {AlumniOwnProfile,CreateAlumniProfile} from '../../actions/alumni/index'
import { reduxForm, Field } from 'redux-form';
import Dashboard from './Dashboard';
import '../../Error/css/Error.css'
class CreateProfile extends React.Component {
    state = { button: true }
    componentDidMount() {
        this.props.AlumniOwnProfile();
    }
    renderError = ({ error, touched }) => {
        if (error && touched) {
            return (<div className="Normal-Error">{error}</div>)
        }
    }
    renderInput = ({ input, label, meta, type }) => {
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
        this.props.CreateAlumniProfile(formValues);

    }
    render() {
        if (this.props.profile.loading) {
            return (<div>Loading</div>)
        }
        else if (!this.props.profile.alumniProfile && !this.props.profile.loading) {
            return (
                <form onSubmit={this.props.handleSubmit(this.HandleSubmit)}>
                    <Field name="passingYear" type="text" component={this.renderInput} label="Passing Year" />
                   <label><Field name="status" component="input" type="radio" value="Web-Developer"/>{' '}Web-Developer</label>
                   <label><Field name="status" component="input" type="radio" value="Android-Developer"/>{' '}Android-Developer</label>
                   <label><Field name="status" component="input" type="radio" value="Problem-Solver"/>{' '}Problem-Solver</label>
                   <label><Field name="status" component="input" type="radio" value="Frontend-developer"/>{' '}Frontend-developer</label>
                   <label><Field name="status" component="input" type="radio" value="Backend-Developer"/>{' '}Backend-Developer</label>
                   <label><Field name="status" component="input" type="radio" value="Other"/>{' '}Other</label>
                    <Field name='website' type="text" component={this.renderInput} label="Website"/>
                    <Field name="currentJob" type="text" component={this.renderInput} label="Current Job" />
                    <Field name="about" type="text" component={this.renderInput} label="About" />
                    <Field name="githubUserName" type="text" component={this.renderInput} label="GitHub Name" />
                    <Field name="codeforceUserName" type="text" component={this.renderInput} label="CodeForce Name" />
                    <Field name="facebook" type="text" component={this.renderInput} label="Facebook" />
                    <Field name="linkedin" type="text" component={this.renderInput} label="Linkedin" />
                    <Field name="twitter" type="text" component={this.renderInput} label="Twitter" />
                    <Field name="youtube" type="text" component={this.renderInput} label="Youtube" />
                    <Field name="instagram" type="text" component={this.renderInput} label="Instagram" />
                    {
                        this.state.button ? <button type="submit">Add</button> : <button disabled >Submitting</button>
                    }
                </form>
            )
        }
        else if (this.props.profile.alumniProfile && !this.props.profile.loading) {
            return (<div>
                <Redirect to="/alumni/showprofile"/>
            </div>)
        }
    }
}

const validate = (formValue) => {
    const error = {};
     if(!formValue.status){
        error.status = "select Status"
     }
    if (!formValue.currentJob) {
        error.status = "needed"
    }
    if (!formValue.about) {
        error.about = "About you needed"
    }
    return error;
}

const mapStateToProps = (state) => {
    return ({ profile: state.AlumniProfile })
}

const form = reduxForm({
    form: 'CreateUserProfile',
    validate,
})(CreateProfile);

export default connect(mapStateToProps, { AlumniOwnProfile,CreateAlumniProfile })(form);