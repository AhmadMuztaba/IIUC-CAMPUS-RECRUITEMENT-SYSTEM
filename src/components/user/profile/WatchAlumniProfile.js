import React, { Component } from 'react';
import './CSS/WatchUserProfile.css';
import {UserWatchAlumniProfile} from '../../actions/user/index';
import GetEducation from './file options/GetEducation';
import GetExperience from './file options/GetExperience';
import {connect} from 'react-redux';
import WatchUserGithub from './file options/WatchUserGithub';
import WatchUserCodeforceRating from './file options/WatchUserCodeforceRating';
import {Redirect,Link} from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import Social from './file options/Social';
class WatchAlumniProfile extends Component {
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
        this.props.UserWatchAlumniProfile(this.props.match.params.userid);
        if(this.sidelineRef.current){
            this.setState({ height: this.sidelineRef.current.clientHeight });
        }
    }
    render() {
        if(this.props.error.length>0){
         return <Redirect to="/user/showProfile"/>
        }
       if(this.props.AlumniProfile){
           let img;
           if(this.props.AlumniProfile.profilePic){
            img=new Buffer.from(this.props.AlumniProfile.profilePic.data).toString('base64');
            img=`data:image/png;base64,`+img;
           }
        return (<div className="watchUser">
        <Link to="/user/showProfile">#HOME</Link>
           {this.props.AlumniProfile.profilePic ? <div><img className="watchUser__image" src={img} /></div> : null}
   <div className="AboutSection" style={{marginLeft:0}}>
                     <h1 className="AboutSection--heading">{this.props.AlumniProfile.alumni.name}</h1>
                   <h2 className="AboutSection--heading-secondary utility-desktop">
                    <Typewriter
                    onInit={(typewriter)=>{
                        typewriter.typeString(this.props.AlumniProfile.status)
                        .pauseFor(4500)
                        .deleteAll()
                        .start();
                    }
                }
                options={{loop:true}}
                    />
                   </h2>
                   <h2 className="AboutSection--heading-secondary utility-mobile">
                    {this.props.AlumniProfile.status}
                   </h2>
                   <div className="AboutSection--me">
                   <h3 className="AboutSection--heading-Tertiary">About Me</h3>
                   <p className="AboutSection__aboutme">
                   {this.props.AlumniProfile.about}
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
                                {this.props.AlumniProfile.alumni.name}
                                </div>
                                <div>
                                    {this.props.AlumniProfile.passingYear}
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
                       {this.props.AlumniProfile.alumni.email}
                       </div>
                   </div>
                    <div className="AboutSection__utility-margin">
                    </div>
                    {
                        this.props.AlumniProfile.education.length>0?
                        <GetEducation edu={this.props.AlumniProfile.education}/>:null
                    }
                    <h3>
                        Professional info
                    </h3>
                    <div className="professional-info" >
                        <div style={{ height: `${this.state.height}px`, borderRight: '1px solid #e0e0dc', verticalAlign: 'center'}}>
                            <ul ref={this.sidelineRef}>
                                {this.props.AlumniProfile.currentJob? <li><h4>Company</h4></li> : null}
                            </ul>
                        </div>
                        <div>
                            <ul>
                                {this.props.AlumniProfile.currentJob? <li><h4>{this.props.AlumniProfile.currentJob}</h4></li> : null}
                            </ul>
                        </div>
                    </div>
                    {
                        this.props.AlumniProfile.experience.length>0?
                        <GetExperience exp={this.props.AlumniProfile.experience}/>:null
                    }
                    <div className="personal-info">
                        <div>
                            <ul>
                                {this.props.AlumniProfile.githubusername?
                                    <li><h3>Repositories</h3></li> : null}
                            </ul>
                        </div>
                        <div>
                            {this.props.AlumniProfile.githubusername ?
                                <li><WatchUserGithub id={this.props.AlumniProfile.alumni._id}/></li> : null}
                        </div>
                    </div>
                    <div className="personal-info">
                        <div>
                            <ul>
                                {this.props.AlumniProfile.codeforceusername?
                                    <li><h3>Codeforce Rating</h3></li> : null}
                            </ul>
                        </div>
                        <div>
                            {this.props.AlumniProfile.codeforceusername ?
                                <WatchUserCodeforceRating id={this.props.AlumniProfile.alumni._id}/>: null}
                        </div>
                    </div>
                </div>
                <Social social={this.props.AlumniProfile.social} website={this.props.AlumniProfile.website }/>
                </div>
                )
            }
    
    else{
        return(<div>Loading</div>)
    }
  
}
}
const mapStateToProps = (state,ownProps) => {
    return ({AlumniProfile:state.UserProfile.alumni[ownProps.match.params.userid],
    error:state.Error})
}

export default connect(mapStateToProps, {
    UserWatchAlumniProfile
})(WatchAlumniProfile)