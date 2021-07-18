import React from 'react';
import '../CSS/AboutMe.css';
import { connect } from 'react-redux';
import {AlumniOwnProfile} from '../../../actions/alumni/index';
import GetGithub from './GetGithub';
import PostGitHub from './PostGitHub';
import GetCodeforce from './GetCodeforce';
import PostCodeForce from './PostCodeForce';
import GetExperience from './GetExperience';
import PostExperience from './PostExperience';
import GetEducation from './GetEducation';
import PostEducation from './PostEducation';

class AboutMe extends React.Component {
    constructor(props) {
        super(props);
        this.sidelineRef = React.createRef();
        this.state = {
            height: 0,
            Eduopen: false,
            Exuopen: false,
            Gitopen: false,
            cfopen: false,
        }
    }
    componentDidMount() {
        this.props.AlumniOwnProfile();
        if(this.sidelineRef.current){
            this.setState({ height: this.sidelineRef.current.clientHeight });
        }
    }
    render() {  
        if(this.props.ownProfile.alumniProfile&&!this.props.ownProfile.loading&&!this.props.alumni.loading){
        return (<div className="show-Dashboard">
            <h1>
                {this.props.alumni.alumni.name}
            </h1>
            <h2>
                {this.props.ownProfile.alumniProfile.alumniProfile.status}
            </h2>
            <h3>
                About Me
             </h3>
            <div className="quote_1">
                “
             </div>
            <p className="AboutMe">
                {this.props.ownProfile.alumniProfile.alumniProfile.about}
            </p>
            <div className="quote_2">
                ”
            </div>
            <div className="line">
            </div>
            <h3>
                Personal Info
            </h3>
            <div className="personal-info">
                <div>
                    <ul>
                        <li>
                            <h4>Name</h4>
                        </li>
                        <li>
                            <h4>Passing Year</h4>
                        </li>
                    </ul>
                   
                </div>
                <div>
                    <li>
                        <h4>{this.props.alumni.alumni.name}</h4>
                    </li>
                    <li>
                    <h4>{this.props.ownProfile.alumniProfile.alumniProfile.passingYear}</h4>
                    </li>
                </div>
            </div>
            <h3>
                Contact
        </h3>
            <div className="email-info">
                <div className="cent">
                    <ion-icon name="mail-open-outline" class="contact-icon"></ion-icon>
                    <p> {this.props.alumni.alumni.email}</p>
                </div>
            </div>

            <div className="professional-info">
                <div>
                    <ul>
                        {this.props.ownProfile.alumniProfile.alumniProfile.education.length > 0 ?
                            null : <li>
                                <h4>
                                    Add Education
                         </h4>
                            </li>}
                    </ul>
                </div>
                <div>
                    {this.props.ownProfile.alumniProfile.alumniProfile.education.length > 0 ?
                        null : <li>
                            <h4>
                                <ion-icon name="chevron-down-outline" onClick={() => {
                                    this.setState({ Eduopen: !(this.state.Eduopen) });
                                }}></ion-icon>
                            </h4>
                        </li>}
                </div>
                {this.state.Eduopen ? <PostEducation/> : null}
            </div>
            {
                this.props.ownProfile.alumniProfile.alumniProfile.education.length>0?
                <GetEducation edu={this.props.ownProfile.alumniProfile.alumniProfile.education}/>:null
            }
            <h3>
                Professional info
            </h3>
            <div className="professional-info" >
                <div style={{ height: `${this.state.height}px`, borderRight: '1px solid #e0e0dc', verticalAlign: 'center', marginBottom: '80px' }}>
                    <ul ref={this.sidelineRef}>
                        {this.props.ownProfile.alumniProfile.alumniProfile.currentJob ? <li><h4>Company</h4></li> : null}
                        {this.props.ownProfile.alumniProfile.alumniProfile.status ? <li><h4>Status</h4></li> : null}
                    </ul>
                </div>
                <div>
                    <ul>
                    {this.props.ownProfile.alumniProfile.alumniProfile.currentJob ? <li><h4>{this.props.ownProfile.alumniProfile.alumniProfile.currentJob}</h4></li> : null}
                    {this.props.ownProfile.alumniProfile.alumniProfile.status ? <li><h4>{this.props.ownProfile.alumniProfile.alumniProfile.status}</h4></li> : null}
                    </ul>
                </div>
            </div>
            <div className="professional-info">
                <div>
                    <ul>
                       
                       <li>
                                <h4>
                                    Create Experience
                         </h4>
                            </li>
                    </ul>
                </div>
                <div>
                    
                        <li>
                            <h4>
                                <ion-icon name="chevron-down-outline" onClick={() => {
                                    this.setState({ Exuopen: !(this.state.Exuopen) });
                                }}></ion-icon>
                            </h4>
                        </li>
                </div>
                {this.state.Exuopen ? <PostExperience/> : null}
            </div>
            {
                this.props.ownProfile.alumniProfile.alumniProfile.experience.length>0?
                <GetExperience exp={this.props.ownProfile.alumniProfile.alumniProfile.experience}/>:null
            }
            <div className="personal-info">
                <div>
                    <ul>
                        {this.props.ownProfile.alumniProfile.alumniProfile.githubusername ?
                            <li><h3>Repositories</h3></li> : <li>
                                <h4>
                                    Add Github User Name
                         </h4>
                            </li>}
                    </ul>
                </div>
                <div>
                    {this.props.ownProfile.alumniProfile.alumniProfile.githubusername ?
                        <li><GetGithub /></li> : <li>
                            <h4>
                                <ion-icon name="chevron-down-outline" onClick={() => {
                                    this.setState({ Gitopen: !(this.state.Gitopen) });
                                }}></ion-icon>
                            </h4>
                        </li>}
                </div>
                {this.state.Gitopen ? <PostGitHub force={this.forceUp}/> : null}
            </div>
            <div className="personal-info">
                <div>
                    <ul>
                        {this.props.ownProfile.alumniProfile.alumniProfile.codeforceusername ?
                            <li><h3>codeforceRatings</h3></li> : <li>
                                <h4>
                                    Add codeforce User Name
                         </h4>
                            </li>}
                    </ul>
                </div>
                <div>
                    {this.props.ownProfile.alumniProfile.alumniProfile.codeforceusername ?
                        <li><GetCodeforce /></li> : <li>
                            <h4>
                                <ion-icon name="chevron-down-outline" onClick={() => {
                                    this.setState({ cfopen: !(this.state.cfopen) });
                                }}></ion-icon>
                            </h4>
                        </li>}
                </div>
                {this.state.cfopen? <PostCodeForce/> : null}
            </div>

        </div>)
    }
    else{
        return(<div>Loading</div>)
    }
}
}
const mapStateToProps = (state) => {
    return ({alumni:state.AlumniAuth,
        ownProfile: state.AlumniProfile })
}

export default connect(mapStateToProps, {
    AlumniOwnProfile
})(AboutMe)
