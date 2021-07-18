import React from 'react';
import { connect } from 'react-redux';
import {Redirect } from 'react-router-dom';
import {CompanyOwnProfile,CreateCompanyProfile} from '../../actions/company/index'
import { reduxForm, Field } from 'redux-form';

import '../../Error/css/Error.css'
class CreateProfile extends React.Component {
    state = { button: true }
    componentDidMount() {
        this.props.CompanyOwnProfile();
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
        this.props.CreateCompanyProfile(formValues);

    }
    render() {
        if (this.props.profile.loading) {
            return (<div>Loading</div>)
        }
        else if (!this.props.profile.alumniProfile && !this.props.profile.loading) {
            return (
                <form onSubmit={this.props.handleSubmit(this.HandleSubmit)}>
                    <Field name="established" type="text" component={this.renderInput} label="Established" />
                    <Field name='website' type="text" component={this.renderInput} label="Website"/>
                    <Field name="mission" type="text" component={this.renderInput} label="Mission" />
                    <Field name="vision" type="text" component={this.renderInput} label="Vision" />
                    <Field name="About" type="text" component={this.renderInput} label="About" />
                    <Field name="currentEmployeeNumber" type="text" component={this.renderInput} label="Current Employee Number" />
                    <Field name="facebook" type="text" component={this.renderInput} label="Facebook" />
                    <Field name="linkedin" type="text" component={this.renderInput} label="linkedin" />
                    <Field name="twitter" type="text" component={this.renderInput} label="Twitter" />
                    <Field name="youtube" type="text" component={this.renderInput} label="Youtube" />
                    <Field name="instagram" type="text" component={this.renderInput} label="Instagram" />
                    {
                        this.state.button ? <button type="submit">Add</button> : <button disabled >Submitting</button>
                    }
                </form>
            )
        }
        else if (this.props.profile.companyProfile && !this.props.profile.loading) {
            return (<div>
                <Redirect to="/company/showprofile"/>
            </div>)
        }
    }
}

const validate = (formValue) => {
    const error = {};
     if(!formValue.About){
        error.About = "About needed"
     }
    if (!formValue.mission) {
        error.mission = "what is your mission"
    }
    if (!formValue.vision) {
        error.vision = "what is your vision"
    }
    return error;
}

const mapStateToProps = (state) => {
    return ({ profile: state.CompanyProfile })
}

const form = reduxForm({
    form: 'CreateUserProfile',
    validate,
})(CreateProfile);

export default connect(mapStateToProps, {CompanyOwnProfile,CreateCompanyProfile})(form);
