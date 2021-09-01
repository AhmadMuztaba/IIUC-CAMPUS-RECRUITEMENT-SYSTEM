import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AlumniOwnProfile,updateAlumniInfo} from '../../../actions/alumni/index';
import moment from 'moment';
class EditInfo extends Component {
    state = {
        passingYear:'',currentJob: '',status: '', about: '',
        githubusername: '', codeforceusername: '', facebook: '', twitter: '', instagram: '', linkedin: '',
        website: '',sub:false
    };
    componentDidMount() {
        this.props.AlumniOwnProfile();
        console.log(this.props.profile.alumniProfile);
        if (this.props.profile.alumniProfile.alumniProfile.passingYear) {
            this.setState({ passingYear: this.props.profile.alumniProfile.alumniProfile.passingYear })
        }
        if (this.props.profile.alumniProfile.alumniProfile.currentJob) {
            this.setState({ currentJob: this.props.profile.alumniProfile.alumniProfile.currentJob })
        }
        if (this.props.profile.alumniProfile.alumniProfile.status) {
            this.setState({ status: this.props.profile.alumniProfile.alumniProfile.status })
        }
        if (this.props.profile.alumniProfile.alumniProfile.about) {
            this.setState({ about: this.props.profile.alumniProfile.alumniProfile.about })
        }
        if (this.props.profile.alumniProfile.alumniProfile.githubusername) {
            this.setState({ githubusername: this.props.profile.alumniProfile.alumniProfile.githubusername })
        }
        if (this.props.profile.alumniProfile.alumniProfile.codeforceusername) {
            this.setState({ codeforceusername: this.props.profile.alumniProfile.alumniProfile.codeforceusername })
        }
        if (this.props.profile.alumniProfile.alumniProfile.social.facebook) {
            this.setState({ facebook: this.props.profile.alumniProfile.alumniProfile.social.facebook })
        }
        if (this.props.profile.alumniProfile.alumniProfile.social.twitter) {
            this.setState({ twitter: this.props.profile.alumniProfile.alumniProfile.social.twitter })
        }
        if (this.props.profile.alumniProfile.alumniProfile.social.instagram) {
            this.setState({ instagram: this.props.profile.alumniProfile.alumniProfile.social.instagram })
        }
        if (this.props.profile.alumniProfile.alumniProfile.social.linkedin) {
            this.setState({ linkedin: this.props.profile.alumniProfile.alumniProfile.social.linkedin })
        }
        if (this.props.profile.alumniProfile.website) {
            this.setState({ website: this.props.profile.alumniProfile.website })
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

    render() {
        return (
            <div className="editInfo animation">
                <div className="editInfo__fields">
                <label htmlFor="passingYear">Passing Year</label>
                <input id="passingYear" name="passingYear" value={this.state.passingYear} onChange={(e) => {
                    this.setState({ passingYear: e.target.value })
                }} />
                </div>
                <div className="editInfo__fields">
                <label htmlFor="currentJob">Current Job</label>
                <input id="currentJob" type="text" value={this.state.currentJob} name="currentJob" onChange={(e) => {
                    this.setState({ currentJob: e.target.value });
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
               <label htmlFor="about">About</label>
                <input id="about" type="text" name="about" value={this.state.about} onChange={(e) => {
                    this.setState({ about: e.target.value });
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
                <button className="jobpost__eachpost--button--btn"
                 style={(this.state.about==='')||(this.state.sub)?{pointerEvents:'none'}:null} 
                 disabled={(this.state.about==='')||(this.state.sub)?true:false} onClick={(e)=>{
                    e.preventDefault();
                    this.setState({sub:true});
                    setTimeout(()=>{
                        this.setState({sub:false})
                    },10000)
                    this.props.updateAlumniInfo(this.state);
                }}>Edit</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        profile: state.AlumniProfile
    })
}
export default connect(mapStateToProps, { AlumniOwnProfile,updateAlumniInfo})(EditInfo);