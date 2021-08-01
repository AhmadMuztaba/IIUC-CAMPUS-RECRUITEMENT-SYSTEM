import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserOwnProfile,updateUserInfo} from '../../actions/user/index';
import moment from 'moment';
class EditProfile extends Component {
    state = {
        dateOfBirth: '', nationality: '', company: '', location: '', status: '', bio: '',
        githubusername: '', codeforceusername: '', facebook: '', twitter: '', instagram: '', linkedin: '',
        website: '',skills:[]
    };
    componentDidMount() {
        this.props.UserOwnProfile();
        let cur = moment.utc(this.props.profile.userProfile.dateOfBirth).format("yyyy-MM-DD");
        this.setState({
            dateOfBirth: cur
        });
        if (this.props.profile.userProfile.nationality) {
            this.setState({ nationality: this.props.profile.userProfile.nationality })
        }
        if (this.props.profile.userProfile.company) {
            this.setState({ nationality: this.props.profile.userProfile.company })
        }
        if (this.props.profile.userProfile.status) {
            this.setState({ status: this.props.profile.userProfile.status })
        }
        if (this.props.profile.userProfile.location) {
            this.setState({ location: this.props.profile.userProfile.location })
        }
        if (this.props.profile.userProfile.bio) {
            this.setState({ bio: this.props.profile.userProfile.bio })
        }
        if (this.props.profile.userProfile.githubusername) {
            this.setState({ githubusername: this.props.profile.userProfile.githubusername })
        }
        if (this.props.profile.userProfile.codeforceusername) {
            this.setState({ codeforceusername: this.props.profile.userProfile.codeforceusername })
        }
        if (this.props.profile.userProfile.social.facebook) {
            this.setState({ facebook: this.props.profile.userProfile.social.facebook })
        }
        if (this.props.profile.userProfile.social.twitter) {
            this.setState({ twitter: this.props.profile.userProfile.social.twitter })
        }
        if (this.props.profile.userProfile.social.instagram) {
            this.setState({ instagram: this.props.profile.userProfile.social.instagram })
        }
        if (this.props.profile.userProfile.social.linkedin) {
            this.setState({ linkedin: this.props.profile.userProfile.social.linkedin })
        }
        if (this.props.profile.userProfile.website) {
            this.setState({ website: this.props.profile.userProfile.website })
        }
        if (this.props.profile.userProfile.skills) {
            this.setState({ skills: this.props.profile.userProfile.skills })
        }
    }
    optons = [
        {
            key: 'Web Developer',
            value: "Web Developer"
        },
        {
            key: 'Android Developer',
            value: 'Android Developer'
        }, {
            key: 'IOS Developer',
            value: 'IOS Deveoper'
        }, {
            key: 'Full-Stack Web Deveoper',
            value: 'Full-Stack Web Deveoper'
        }, {
            key: 'Full-Stack App Developer',
            value: 'Full-Stack App Developer'
        }, {
            key: 'Frontend Developer',
            value: 'Frontend Developer'
        }, {
            key: 'Problem Solver',
            value: 'Problem Solver'
        }, {
            key: 'Data Scientist',
            value: 'Data Scientist'
        }, {
            key: 'Content Writter',
            value: 'Content Writter'
        }, {
            key: 'Network Engineer',
            value: 'Network Engineer'
        }, {
            key: 'Robotics Engineer',
            value: 'Robotics Engineer'
        }, {
            key: 'SQA Engineer',
            value: 'SQA Engineer'
        }
    ]

    skills = [{
        name: 'C/C++'
    }, {
        name: 'Java'
    },
    {
        name: 'Python'
    }, {
        name: 'JavaScript'
    },
    {
        name: 'PHP'
    }, {
        name: 'C#'
    }, {
        name: 'Ruby'
    }, {
        name: 'NodeJs'
    },
    {
        name: 'ReactJs'
    },
    {
        name: 'Angular'
    },
    {
        name: 'Vue'
    },
    {
        name: 'Laravel'
    }, {
        name: '.NET'
    }, {
        name: 'Django'
    }, {
        name: 'Advanced CSS'
    }, {
        name: 'Cisco packet tracer'
    }, {
        name: 'Robotics'
    }
    ]
    render() {
        return (
            <div style={{ marginLeft: '34rem' }}>
                <label htmlFor="dateofbirth">Date of Birth</label>
                <input id="dateofbirth" name="dateofBirth" type="date" asp-format="{0:yyyy-MM-dd}" value={this.state.dateOfBirth} />
                <label>Nationality</label>
                <input name="nationality" value={this.state.nationality} onChange={(e) => {
                    this.setState({ nationality: e.target.value })
                }} />
                <label>Company</label>
                <input type="text" value={this.state.company} name="company" onChange={(e) => {
                    this.setState({ company: e.target.value });
                }} />
                <label>Location</label>
                <input type="text" value={this.state.location} name="location" onChange={(e) => {
                    this.setState({ location: e.target.value})
                }} />
                <label>Status</label>
                <select onChange={(e) => {
                    this.setState({ status: e.target.value })
                }}>
                    <option>{this.state.status}</option>
                    {
                        this.optons.map((op) => {
                            return (<option value={op.value} key={op.key}>
                                {op.value}
                            </option>)
                        })
                    }
                </select>
                <label>Bio</label>
                <input type="text" name="bio" value={this.state.bio} onChange={(e) => {
                    this.setState({ bio: e.target.value });
                }} />
                <label>Github User name</label>
                <input type="text" name="githubusername" value={this.state.githubusername} onChange={(e) => {
                    this.setState({ githubusername: e.target.value })
                }} />
                <label>CodeForce User name</label>
                <input type="text" name="codeforceusername" value={this.state.codeforceusername} onChange={(e) => {
                    this.setState({ codeforceusername: e.target.value })
                }} />
                <label>
                    Facebook
                </label>
                <input type="text" name="facebook" value={this.state.facebook} onChange={(e) => {
                    this.setState({ facebook: e.target.value })
                }} />
                <label>Twitter</label>
                <input type="text" name="twitter" value={this.state.twitter} onChange={(e) => {
                    this.setState({ twitter: e.target.value })
                }} />
                <label>Instagram</label>
                <input type="text" name="instagram" value={this.state.instagram} onChange={(e) => {
                    this.setState({ instagram: e.target.value })
                }} />
                <label>Linkedin</label>
                <input type="text" name="linkedin" value={this.state.linkedin} onChange={(e) => {
                    this.setState({ linkedin: e.target.value })
                }} />
                <label>Website</label>
                <input type="text" name="website" value={this.state.website} onChange={(e) => {
                    this.setState({ website: e.target.value })
                }} />
                {
                    this.skills.map((skill) => {
                        return (<div key={skill.name}>
                            <div>
                                <div className="utility__flex">
                                    <label htmlFor={skill.name} className="createProfile__checkboxinput--label">{skill.name}</label>
                                </div>
                                <input id={skill.name} value={skill.name} className="createProfile__checkboxinput" type="checkbox" checked={this.state.skills.includes(skill.name)?true:false} onChange={()=>{
                                    if(this.state.skills.includes(skill.name)){
                                        this.setState({skills:this.state.skills.filter((skl)=>skl!==skill.name)})
                                    }else{
                                        this.setState({skills:[...this.state.skills,skill.name]})
                                    }
                                    
                                }}/>
                                <label htmlFor={skill.name} className="createProfile__customisedInput">
                                    <div className="createProfile__customisedInput--checked"></div>
                                </label>
                            </div>
                        </div>)
                    })
                }
                <button disabled={(this.state.skills.length<1)||(this.state.bio==='')||(this.state.location==='')?true:false} onClick={(e)=>{
                    e.preventDefault();
                    this.props.updateUserInfo({...this.state,skills:this.state.skills.toLocaleString()});
                }}>Edit</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        profile: state.UserProfile
    })
}
export default connect(mapStateToProps, { UserOwnProfile,updateUserInfo })(EditProfile);