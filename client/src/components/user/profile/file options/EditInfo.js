import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserOwnProfile,updateUserInfo} from '../../../actions/user/index';
import moment from 'moment';
import '../CSS/editInfo.scss'
class EditInfo extends Component {
    state = {
        dateOfBirth: '', nationality: '', company: '', location: '', status: '', bio: '',
        githubusername: '', codeforceusername: '', facebook: '', twitter: '', instagram: '', linkedin: '',
        website: '',skills:[],skillshow:false,sub:false
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
            <div className="editInfo animation">
                <div className="editInfo__fields">
                <label htmlFor="dateofbirth">Date of Birth</label>
                <input id="dateofbirth" name="dateofBirth" type="date" asp-format="{0:yyyy-MM-dd}" value={this.state.dateOfBirth} />
                </div>
                <div className="editInfo__fields">
                <label htmlFor="nationality">Nationality</label>
                <input id="nationality" name="nationality" value={this.state.nationality} onChange={(e) => {
                    this.setState({ nationality: e.target.value })
                }} />
                </div>
                <div className="editInfo__fields">
                <label htmlFor="company">Company</label>
                <input id="company" type="text" value={this.state.company} name="company" onChange={(e) => {
                    this.setState({ company: e.target.value });
                }} />
                </div>
                <div className="editInfo__fields">
                <label htmlFor="location">Location</label>
                <input type="text" value={this.state.location} name="location" onChange={(e) => {
                    this.setState({ location: e.target.value})
                }} />
                </div>
                <div className="editInfo__fields">
                <label htmlFor="status">Status</label>
                <select id="status" onChange={(e) => {
                    this.setState({ status: e.target.value })
                }}>
                    <option >{this.state.status}</option>
                    {
                        this.optons.map((op) => {
                            return (<option value={op.value} key={op.key}>
                                {op.value}
                            </option>)
                        })
                    }
                </select>
                </div>
               <div className="editInfo__fields">
               <label htmlFor="bio">Bio</label>
                <input id="bio" type="text" name="bio" value={this.state.bio} onChange={(e) => {
                    this.setState({ bio: e.target.value });
                }} />
               </div>
               <div className="editInfo__fields">
               <label htmlFor="github">Github User name</label>
                <input id="github" type="text" name="githubusername" value={this.state.githubusername} onChange={(e) => {
                    this.setState({ githubusername: e.target.value })
                }} />
               </div>
               <div className="editInfo__fields">
               <label htmlFor="codeforce">CodeForce User name</label>
                <input id="codeforce" type="text" name="codeforceusername" value={this.state.codeforceusername} onChange={(e) => {
                    this.setState({ codeforceusername: e.target.value })
                }} />
               </div>
                <div className="editInfo__fields">
                <label htmlFor="facebook">
                    Facebook
                </label>
                <input id="facebook" type="text" name="facebook" value={this.state.facebook} onChange={(e) => {
                    this.setState({ facebook: e.target.value })
                }} />
                </div>
                <div className="editInfo__fields">
                <label htmlFor="twitter">Twitter</label>
                <input id="twitter"type="text" name="twitter" value={this.state.twitter} onChange={(e) => {
                    this.setState({ twitter: e.target.value })
                }} />
                </div>
               <div className="editInfo__fields">
               <label htmlFor="instagram">Instagram</label>
                <input id="instagram" type="text" name="instagram" value={this.state.instagram} onChange={(e) => {
                    this.setState({ instagram: e.target.value })
                }} />
               </div>
               <div className="editInfo__fields">
               <label htmlFor="linkedin">Linkedin</label>
                <input id="linkedin" type="text" name="linkedin" value={this.state.linkedin} onChange={(e) => {
                    this.setState({ linkedin: e.target.value })
                }} />
               </div>
                <div className="editInfo__fields">
                <label htmlFor="website">Website</label>
                <input id="website" type="text" name="website" value={this.state.website} onChange={(e) => {
                    this.setState({ website: e.target.value })
                }} />
                </div>
                <div className="editInfo__checkbox">
                <div className="createProfile__checkbox--label">
                        <div>
                            <label style={{fontSize:'2.4rem'}}>Skills</label></div>
                        <div className="createProfile__checkbox--label-icon" onClick={()=>{
                            this.setState({skillshow:!this.state.skillshow})
                        }}><ion-icon name="caret-down-circle-outline"></ion-icon></div>
                    </div>
                    {
                        this.state.skillshow?( <div className="createProfile__checkbox">
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
                        </div>):null
                    }
                </div>
               
               
                <button className="jobpost__eachpost--button--btn"
                 style={(this.state.skills.length<1)||(this.state.bio==='')||(this.state.location==='')||(this.state.sub)?{pointerEvents:'none'}:null} 
                 disabled={(this.state.skills.length<1)||(this.state.bio==='')||(this.state.location==='')||(this.state.sub)?true:false} onClick={(e)=>{
                    e.preventDefault();
                    this.setState({sub:true});
                    setTimeout(()=>{
                        this.setState({sub:false})
                    },10000)
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
export default connect(mapStateToProps, { UserOwnProfile,updateUserInfo })(EditInfo);