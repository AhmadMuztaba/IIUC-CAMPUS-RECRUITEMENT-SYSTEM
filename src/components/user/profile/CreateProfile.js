import React from 'react';
import { connect } from 'react-redux';
import {Redirect } from 'react-router-dom';
import { CreateOwnProfile, UserOwnProfile } from '../../actions/user/index'
import { reduxForm, Field } from 'redux-form';
import Dashboard from './Dashboard';
import './CSS/createprofile.scss';
import Loader from '../../utility/Loader';
class CreateProfile extends React.Component {
    state = { button: true,skillshow:false}
    componentDidMount() {
        this.props.UserOwnProfile();
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
    skills=[{
        name:'C/C++'
    },{
        name:'Java'
    },
    {
        name:'Python'
    },{
        name:'JavaScript'
    },
    {
        name:'PHP'
    },{
        name:'C#'
    },{
        name:'Ruby'
    },{
        name:'NodeJs'
    },
    {
        name:'ReactJs'
    },
    {
        name:'Angular'
    },
    {
        name:'Vue'
    },
    {
        name:'Laravel'
    },{
        name:'.NET'
    },{
        name:'Django'
    },{
        name:'Advanced CSS'
    },{
        name:'Cisco packet tracer'
    },{
        name:'Robotics'
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

    renderCheck=({ input, label, meta, type})=>{
        if (this.props.userProfile) {
            return (<Dashboard/>)
        }
        return (
            <div >
                <div>
                <div className="utility__flex">
                <label htmlFor={label} className="createProfile__checkboxinput--label">{label}</label>
                </div>
               <input id={label} className="createProfile__checkboxinput" {...input} type={type} />
               <label htmlFor={label} className="createProfile__customisedInput">
               <div className="createProfile__customisedInput--checked"></div>
               </label>
               </div>
                {this.renderError(meta)}
            </div>
        )
    }
    HandleSubmit = (formValues) => {
        this.setState({ button: false })
        this.forceUpdate();
        let newskills = [];
        if (formValues['C/C++']) {
            newskills.push("C/C++");
        }
        if (formValues.Java) {
            newskills.push("Java")
        }
        if (formValues.Python) {
            newskills.push("Python");
        }
        if (formValues.JavaScript) {
            newskills.push("JavaScript");
        }
        if (formValues.PHP) {
            newskills.push("PHP");
        }
        if (formValues.Ruby) {
            newskills.push("Ruby");
        }
        if (formValues.NodeJs) {
            newskills.push("NodeJs");
        }
        if (formValues.ReactJs) {
            newskills.push("ReactJs");
        }
        if (formValues.Angular) {
            newskills.push("Angular");
        }
        if (formValues.Vue) {
            newskills.push("Vue");
        }
        if (formValues.Laravel) {
            newskills.push("Laravel");
        }
        if (formValues['.NET']) {
            newskills.push(".NET");
        }
        if (formValues.Django) {
            newskills.push("Django");
        }
        if (formValues['Advanced CSS']) {
            newskills.push("Advanced CSS");
        }
        if(formValues['Cisco packet tracer']){
            newskills.push("Cisco packet tracer");
        }
        if (formValues.Robotics) {
            newskills.push("Robotics");
        }
        let skills=newskills.toString();
        const values = { ...formValues, skills };
        this.props.CreateOwnProfile(values);

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
        else if (!this.props.profile.userProfile && !this.props.profile.loading) {
            return (
                <div className="createProfile">
                    <div className="createProfile__formBackground">
                    <form onSubmit={this.props.handleSubmit(this.HandleSubmit)}>
                    <Field name="dateOfBirth" type="date" component={this.renderInput} label="Date Of Birth" />
                    <Field name="nationality" type="text" component={this.renderInput} label="Nationality" />
                    <Field name="company" type="text" component={this.renderInput} label="Company" />
                    <Field name="location" type="text" component={this.renderInput} label="location" />
                    <div>Status</div>
                    <Field name="status"component={this.renderSelect} label="status" /> 
                    <Field name="bio" type="text" component={this.renderInput} label="bio" />
                    <Field name="githubusername" type="text" component={this.renderInput} label="GitHub Name" />
                    <Field name="codeforceusername" type="text" component={this.renderInput} label="CodeForce Name" />
                    <Field name="facebook" type="text" component={this.renderInput} label="Facebook" />
                    <Field name="linkedin" type="text" component={this.renderInput} label="Linkedin" />
                    <Field name="twitter" type="text" component={this.renderInput} label="Twitter" />
                    {/* <Field name="website" type="text" component={this.renderInput} label="Website" /> */}
                    {/* <Field name="youtube" type="text" component={this.renderInput} label="Youtube" /> */}
                    <Field name="instagram" type="text" component={this.renderInput} label="Instagram" />
                    <div className="createProfile__checkbox--label">
                        <div>Skills</div>
                        <div className="createProfile__checkbox--label-icon" onClick={()=>{
                            this.setState({skillshow:!this.state.skillshow})
                        }}><ion-icon name="caret-down-circle-outline"></ion-icon></div>
                    </div>
                    {
                        this.state.skillshow?(
                            <div className="createProfile__checkbox">
                            {
                               this.skills.map((skill)=>{
                                return(<Field name={skill.name} type="checkbox" component={this.renderCheck} label={skill.name} value={skill.name} />)
                               })
                           }
                            </div>
                        ):null
                    }
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
        else if (this.props.profile.userProfile && !this.props.profile.loading) {
            return (<div>
                <Redirect to="/user/showprofile"/>
            </div>)
        }


    }
}

const validate = (formValue) => {
    const error = {};
    if (!formValue.status) {
        error.status = "needed"
    }
    if(!formValue.status){error.status="select options"}
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