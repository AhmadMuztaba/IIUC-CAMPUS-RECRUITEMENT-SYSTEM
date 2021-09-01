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
import Social from './Social';
import Typewriter from 'typewriter-effect';
import Loader from '../../../utility/Loader';
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
        if(this.props.alumni.loading){
            return(<div>Loading</div>)
        }
        if(this.props.ownProfile.alumniProfile&&!this.props.ownProfile.loading&&!this.props.alumni.loading){
        return (<div style={{display:'flex'}}>
<div className="AboutSection">
             <h1 className="AboutSection--heading">{this.props.alumni.alumni.name}</h1>
           <h2 className="AboutSection--heading-secondary utility-desktop">
            <Typewriter
            onInit={(typewriter)=>{
                typewriter.typeString(this.props.ownProfile.alumniProfile.alumniProfile.status)
                .pauseFor(4500)
                .deleteAll()
                .start();
            }
        }
        options={{loop:true}}
            />
           </h2>
           <h2 className="AboutSection--heading-secondary utility-mobile">
            {this.props.ownProfile.alumniProfile.alumniProfile.status}
           </h2>
           <div className="AboutSection--me">
           <h3 className="AboutSection--heading-Tertiary">About Me</h3>
           <p className="AboutSection__aboutme">
           {this.props.ownProfile.alumniProfile.alumniProfile.about}
           </p>
           </div>
            <div className="AboutSection__personalInfo">
           <h3 className="AboutSection--heading-Tertiary">Persononal Info</h3>
               <div className="AboutSection__personalInfo--info">
                    <div className="AboutSection__personalInfo--name">
                        <div>
                            Name
                        </div>
                        <div>
                            Passing Year
                        </div>
                    </div>
               <div className="AboutSection__personalInfo--desc">
                        <div>
                        {this.props.alumni.alumni.name}
                        </div>
                        <div>
                            {this.props.ownProfile.alumniProfile.alumniProfile.passingYear}
                        </div>
               </div>
               </div>
           </div>  
        <h3 className="AboutSection--heading-Tertiary">Contact</h3>
           <div className="contact__box">
               <div className="contact__box--icon">
               <ion-icon name="mail-open-outline"></ion-icon>
               </div>
               <div className="contact__box--email">
               {this.props.alumni.alumni.email}
               </div>
           </div>

            <div className="professional-info">
                <div>
                    <ul>
                        { this.props.ownProfile.alumniProfile.alumniProfile.education.length > 0 ?
                            null : <li>
                                <h4>
                                    Add Education
                         </h4>
                            </li>}
                    </ul>
                </div>
                <div>
                    { this.props.ownProfile.alumniProfile.alumniProfile.education.length > 0 ?
                        null : <li>
                            <h4 onClick={() => {
                                    this.setState({ Eduopen: !(this.state.Eduopen) });
                                }}>
                                <ion-icon name="chevron-down-outline"></ion-icon>
                            </h4>
                        </li>}
                </div>
                
            </div>
            <div className="AboutSection__utility-margin">
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
                <div style={{ height: `${this.state.height}px`, borderRight: '1px solid #e0e0dc', verticalAlign: 'center'}}>
                    <ul ref={this.sidelineRef}>
                        {this.props.ownProfile.alumniProfile.alumniProfile.currentJob? <li><h4>Company</h4></li> : null}
                    </ul>
                </div>
                <div>
                    <ul>
                        {this.props.ownProfile.alumniProfile.alumniProfile.currentJob? <li><h4>{this.props.ownProfile.alumniProfile.alumniProfile.currentJob}</h4></li> : null}
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
                            <h4 onClick={() => {
                                    this.setState({ Exuopen: !(this.state.Exuopen) });
                                }}>
                                <ion-icon name="chevron-down-outline" ></ion-icon>
                            </h4>
                        </li>
                </div>
            </div>
            <div className="">
            {this.state.Exuopen ? <PostExperience force={this.forceUp}/> : null}
            </div>
            
            {
                this.props.ownProfile.alumniProfile.alumniProfile.experience.length>0?
                <GetExperience exp={this.props.ownProfile.alumniProfile.alumniProfile.experience}/>:null
            }
            <div className="personal-info">
                <div>
                    <ul>
                        {this.props.ownProfile.alumniProfile.alumniProfile.githubusername?
                            <li><h3>Repositories</h3></li> : <li>
                                <h4>
                                    Add Github User Name
                         </h4>
                            </li>}
                    </ul>
                </div>
                <div>
                    {this.props.ownProfile.alumniProfile.alumniProfile.githubusername ?
                        <li><GetGithub/></li> : <li>
                            <h4 onClick={() => {
                                    this.setState({ Gitopen: !(this.state.Gitopen) });
                                }}>
                                <ion-icon name="chevron-down-outline" ></ion-icon>
                            </h4>
                        </li>}
                </div>
            </div>
            <div>
            {this.state.Gitopen ? <PostGitHub force={this.forceUp}/> : null}
            </div>
            <div className="personal-info">
                <div>
                    <ul>
                        {this.props.ownProfile.alumniProfile.alumniProfile.codeforceusername?
                            <li><h3>Codeforce Rating</h3></li> : <li>
                                <h4>
                                    Add codeforce User Name
                         </h4>
                            </li>}
                    </ul>
                </div>
                <div>
                    {this.props.ownProfile.alumniProfile.alumniProfile.codeforceusername ?
                        <GetCodeforce /> : <li>
                            <h4 onClick={() => {
                                    this.setState({ cfopen: !(this.state.cfopen) });
                                }}>
                                <ion-icon name="chevron-down-outline" ></ion-icon>
                            </h4>
                        </li>}
                </div>
            </div>
            <div>
            {this.state.cfopen? <PostCodeForce force={this.forceUp}/> : null}
            </div>
        </div>
        <Social social={this.props.ownProfile.alumniProfile.alumniProfile.social} website={this.props.ownProfile.alumniProfile.alumniProfile.website }/>
        </div>
        )
    }
    else{
        return(<Loader/>)
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
