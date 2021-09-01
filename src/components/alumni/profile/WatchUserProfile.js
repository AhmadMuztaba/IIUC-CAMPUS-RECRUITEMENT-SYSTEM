import React, { Component } from 'react';
import './CSS/WatchUserProfile.css';
import {SearchUserProfileById} from '../../actions/alumni/index';
import GetEducation from './file options/GetEducation';
import GetExperience from './file options/GetExperience';
import {connect} from 'react-redux';
import WatchUserGithub from './file options/WatchUserGithub';
import Typewriter from 'typewriter-effect';
import GetCodeforce from './file options/WatchUserCodeforceRating';
import Social from './file options/Social';
import {Redirect,Link} from 'react-router-dom';
import Loader from '../../utility/Loader';
class WatchUserProfile extends Component {
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
        this.props.SearchUserProfileById(this.props.match.params.userid);
        if(this.sidelineRef.current){
            this.setState({ height: this.sidelineRef.current.clientHeight });
        }
    }
    render() {
        if(this.props.error.length>0){
         return <Redirect to="/alumni/showProfile"/>
        }

       if(this.props.userProfile){

        let date = new Date(this.props.userProfile.user.dateOfBirth);
        date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        return (
            <div className="watchUser">
                <Link to="/alumni/showProfile">#HOME</Link>
                <div className="AboutSection" style={{ marginLeft: 0,flex:1 }}>
                    <div>  
                        <div>
                            <h1 className="AboutSection--heading">{this.props.userProfile.user.user.name}</h1>

                            <h2 className="AboutSection--heading-secondary utility-desktop">
                                <Typewriter
                                    onInit={(typewriter) => {
                                        typewriter.typeString(this.props.userProfile.user.status)
                                            .pauseFor(4500)
                                            .deleteAll()
                                            .start();
                                    }
                                    }
                                    options={{ loop: true }}
                                />
                            </h2>
                            <h2 className="AboutSection--heading-secondary utility-mobile">
                                {this.props.userProfile.user.status}
                            </h2>
                        </div>
                    </div>
                    <div className="AboutSection--me">
                        <h3 className="AboutSection--heading-Tertiary">About Me</h3>
                        <p className="AboutSection__aboutme">
                            {this.props.userProfile.user.bio}
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
                                    {this.props.userProfile.user.user.name}
                                </div>
                                <div>
                                    {date}
                                </div>
                                <div>
                                    {this.props.userProfile.user.nationality}
                                </div>
                                <div>
                                    {this.props.userProfile.user.location}
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
                            {this.props.userProfile.user.user.email}
                        </div>
                    </div>

                    <div className="professional-info">
                    </div>
                    <div className="AboutSection__utility-margin">
                    </div>
                    {
                        this.props.userProfile.user.education.length > 0 ?
                            <GetEducation edu={this.props.userProfile.user.education} /> : null
                    }
                    <h3>
                        Professional info
                    </h3>
                    <div className="professional-info" >
                        <div style={{ height: `${this.state.height}px`, borderRight: '1px solid #e0e0dc', verticalAlign: 'center' }}>
                            <ul ref={this.sidelineRef}>
                                {this.props.userProfile.user.company ? <li><h4>Company</h4></li> : null}
                                {this.props.userProfile.user.skills.length > 0 ? <li><h4>Skills</h4></li> : null}
                            </ul>
                        </div>
                        <div>
                            <ul>
                                {this.props.userProfile.user.company ? <li><h4>{this.props.userProfile.user.company}</h4></li> : null}
                                {this.props.userProfile.user.skills.length > 0 ? <li><h4>{this.props.userProfile.user.skills.map((skill, index) => {
                                    if (this.props.userProfile.user.skills.length - 1 === index) {
                                        return skill
                                    } else {
                                        return (skill + ",");
                                    }
                                }
                                )}</h4></li> : null}
                            </ul>
                        </div>
                    </div>
                    {
                        this.props.userProfile.user.experience.length > 0 ?
                            <GetExperience exp={this.props.userProfile.user.experience} /> : null
                    }
                    <div className="personal-info">
                        <div>
                            <ul>
                                {this.props.userProfile.user.githubusername ?
                                    <li><h3>Repositories</h3></li> :
                                    null
                                }
                            </ul>
                        </div>
                        <div>
                            {this.props.userProfile.user.githubusername ?
                                <li><WatchUserGithub id={this.props.userProfile.user.user._id} /></li> : null}
                        </div>
                    </div>
                    <div className="personal-info">
                        <div>
                            <ul>
                                {this.props.userProfile.user.codeforceusername ?
                                    <li><h3>Codeforce Rating</h3></li> : <li>
                                        <h4>
                                            Add codeforce User Name
                                        </h4>
                                    </li>}
                            </ul>
                        </div>
                        <div>
                            {this.props.userProfile.user.codeforceusername ?
                                <GetCodeforce id={this.props.userProfile.user.user._id} /> : null}
                        </div>
                    </div>
                </div>
                <Social social={this.props.userProfile.user.social} website={this.props.userProfile.user.website} />
            </div>
        )
    }
    else{
        return(<Loader/>)
    }
  
}
}
const mapStateToProps = (state,ownProps) => {
    return ({userProfile:state.AlumniProfile.usersProfiles[ownProps.match.params.userid],
    error:state.Error})
}

export default connect(mapStateToProps, {
    SearchUserProfileById
})(WatchUserProfile)