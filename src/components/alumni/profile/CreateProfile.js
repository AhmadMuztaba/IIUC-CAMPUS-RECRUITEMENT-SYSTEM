import React from 'react';
import { connect } from 'react-redux';
import {Redirect } from 'react-router-dom';
import {AlumniOwnProfile,CreateAlumniProfile} from '../../actions/alumni/index'
import { reduxForm, Field } from 'redux-form';
import Dashboard from './Dashboard';
import './CSS/createprofile.scss';
import Loader from '../../utility/Loader';
class CreateProfile extends React.Component {
    state = { button: true,skillshow:false}
    componentDidMount() {
        this.props.AlumniOwnProfile();
    }
    optons=[
        {
            key:'Web Developer',
            value:"Web Developer"
        },
        {
            key:'Android Developer',
            value:'Android Developer'
        },{
            key:'IOS Developer',
            value:'IOS Deveoper'
        },{
            key:'Full-Stack Web Deveoper',
            value:'Full-Stack Web Deveoper'
        },{
            key:'Full-Stack App Developer',
            value:'Full-Stack App Developer'
        },{
            key:'Frontend Developer',
            value:'Frontend Developer'
        },{
            key:'Problem Solver',
            value:'Problem Solver'
        },{
            key:'Data Scientist',
            value:'Data Scientist'
        },{
            key:'Content Writter',
            value:'Content Writter'
        },{
            key:'Network Engineer',
            value:'Network Engineer'
        },{
            key:'Robotics Engineer',
            value:'Robotics Engineer'
        },{
            key:'SQA Engineer',
            value:'SQA Engineer'
        }
    ]
    renderError = ({ error, touched }) => {
        if (error && touched) {
            return (<div className="createProfile__error">{error}</div>)
        }
    }
    renderInput = ({ input, label, meta, type }) => {
        if (this.props.userProfile) {
            return (<Dashboard />)
        }
        return (
            <div>
                <div>
                <label>{label}</label>
                </div>
               <div>
               <input className="createProfile__inputtextstyle" {...input} type={type} autoComplete="off" />
               </div>
                {this.renderError(meta)}
            </div>
        )
    }
    HandleSubmit = (formValues) => {
        this.setState({ button: false })
        this.forceUpdate();
        this.props.CreateAlumniProfile(formValues);

    }
    
    renderSelect=({input,meta})=>{
        return (<div>
        <select {...input} className="createProfile__inputtextstyle">
            <option value=""></option>
        {
            this.optons.map((op)=>{
                return( <option value={op.value} key={op.key}>
                    {op.value}
                </option>)
            })
        }
       
        </select>
        
        {this.renderError(meta)}</div>)
    }
    render() {
        if (this.props.profile.loading) {
            return (<><Loader/></>)
        }
        else if (!this.props.profile.alumniProfile && !this.props.profile.loading) {
            return (
                <div className="createProfile">
                    <div className="createProfile__formBackground">
                    <form onSubmit={this.props.handleSubmit(this.HandleSubmit)}>
                    <Field name="passingYear" type="text" component={this.renderInput} label="Passing Year" />
                    <div>Status</div>
                    <Field name="status"component={this.renderSelect} label="status" /> 
                    <Field name="currentJob" type="text" component={this.renderInput} label="Current Job"/>
                    <Field name="about" type="text" component={this.renderInput} label="bio" />
                    <Field name="githubusername" type="text" component={this.renderInput} label="GitHub Name" />
                    <Field name="codeforceusername" type="text" component={this.renderInput} label="CodeForce Name" />
                    <Field name="facebook" type="text" component={this.renderInput} label="Facebook" />
                    <Field name="linkedin" type="text" component={this.renderInput} label="Linkedin" />
                    <Field name="twitter" type="text" component={this.renderInput} label="Twitter" />
                     <Field name="website" type="text" component={this.renderInput} label="Website" />
                    {/* <Field name="youtube" type="text" component={this.renderInput} label="Youtube" /> */}
                    <Field name="instagram" type="text" component={this.renderInput} label="Instagram" />
                    <div className="createProfile__btn">
                    {
                        this.state.button?<button type="submit" className="createProfile__btn--add">Add</button> : <button disabled className="createProfile__btn--add">Submitting</button>
                    }
                    </div>
                </form>
                    </div>
                </div>
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
        error.currentJob = "needed"
    }
    if (!formValue.about) {
        error.about = "About you needed"
    }
    if(!formValue.facebook){
        error.facebook="Need Facebook"
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