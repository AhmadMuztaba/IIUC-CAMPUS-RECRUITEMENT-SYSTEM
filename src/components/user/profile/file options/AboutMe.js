import React from 'react';
import '../CSS/AboutMe.scss';
import { connect } from 'react-redux';
import { UserOwnProfile } from '../../../actions/user/index';
import GetGithub from './GetGithub';
import PostGitHub from './PostGitHub';
import GetCodeforce from './GetCodeforce';
import PostCodeForce from './PostCodeForce';
import GetExperience from './GetExperience';
import PostExperience from './PostExperience';
import GetEducation from './GetEducation';
import PostEducation from './PostEducation';
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
        this.props.UserOwnProfile();
        if(this.sidelineRef.current){
            this.setState({ height: this.sidelineRef.current.clientHeight });
        }
    }
    render() {
        if(this.props.user.loading){
            return(<div>Loading</div>)
        }
        if(this.props.ownProfile.userProfile.user &&!this.props.ownProfile.userProfile.user.loading&!this.props.loading){
            let date=new Date( this.props.ownProfile.userProfile.dateOfBirth);
           date=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        return (<div className="AboutSection">
             <h1 className="AboutSection--heading">{this.props.user.user.name}</h1>
           <h2 className="AboutSection--heading-secondary utility-desktop">
            <Typewriter
            onInit={(typewriter)=>{
                typewriter.typeString(this.props.ownProfile.userProfile.status)
                .pauseFor(4500)
                .deleteAll()
                .start();
            }
        }
        options={{loop:true}}
            />
           </h2>
           <h2 className="AboutSection--heading-secondary utility-mobile">
            {this.props.ownProfile.userProfile.status}
           </h2>
           <div className="AboutSection--me">
           <h3 className="AboutSection--heading-Tertiary">About Me</h3>
           <p className="AboutSection__aboutme">
           {this.props.ownProfile.userProfile.bio}
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
                            Birthday
                        </div>
                        <div>
                            Nationality
                        </div>
                        <div>
                            Current Location
                        </div>
                    </div>
               <div className="AboutSection__personalInfo--desc">
                        <div>
                        {this.props.ownProfile.userProfile.user.name}
                        </div>
                        <div>
                            {date}
                        </div>
                        <div>
                            {this.props.ownProfile.userProfile.nationality}
                        </div>
                        <div>
                        {this.props.ownProfile.userProfile.location}
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
               {this.props.user.user.email}
               </div>
           </div>

            <div className="professional-info">
                <div>
                    <ul>
                        {this.props.ownProfile.userProfile.education.length > 0 ?
                            null : <li>
                                <h4>
                                    Add Education
                         </h4>
                            </li>}
                    </ul>
                </div>
                <div>
                    {this.props.ownProfile.userProfile.education.length > 0 ?
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
                this.props.ownProfile.userProfile.education.length>0?
                <GetEducation edu={this.props.ownProfile.userProfile.education}/>:null
            }
            <h3>
                Professional info
            </h3>
            <div className="professional-info" >
                <div style={{ height: `${this.state.height}px`, borderRight: '1px solid #e0e0dc', verticalAlign: 'center'}}>
                    <ul ref={this.sidelineRef}>
                        {this.props.ownProfile.userProfile.company ? <li><h4>Company</h4></li> : null}
                        {this.props.ownProfile.userProfile.skills.length > 0 ? <li><h4>Skills</h4></li> : null}
                    </ul>
                </div>
                <div>
                    <ul>
                        {this.props.ownProfile.userProfile.company ? <li><h4>{this.props.ownProfile.userProfile.company}</h4></li> : null}
                        {this.props.ownProfile.userProfile.skills.length > 0 ? <li><h4>{this.props.ownProfile.userProfile.skills}</h4></li> : null}
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
                this.props.ownProfile.userProfile.experience.length>0?
                <GetExperience exp={this.props.ownProfile.userProfile.experience}/>:null
            }
            <div className="personal-info">
                <div>
                    <ul>
                        {this.props.ownProfile.userProfile.githubusername ?
                            <li><h3>Repositories</h3></li> : <li>
                                <h4>
                                    Add Github User Name
                         </h4>
                            </li>}
                    </ul>
                </div>
                <div>
                    {this.props.ownProfile.userProfile.githubusername ?
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
                        {this.props.ownProfile.userProfile.codeforceusername ?
                            <li><h3>codeforceRatings</h3></li> : <li>
                                <h4>
                                    Add codeforce User Name
                         </h4>
                            </li>}
                    </ul>
                </div>
                <div>
                    {this.props.ownProfile.userProfile.codeforceusername ?
                        <li><GetCodeforce /></li> : <li>
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
        </div>)
    }
    else{
        return(<Loader/>)
    }
}
}
const mapStateToProps = (state) => {
    return ({ user:state.UserAuth,
        ownProfile: state.UserProfile })
}

export default connect(mapStateToProps, {
    UserOwnProfile
})(AboutMe)
