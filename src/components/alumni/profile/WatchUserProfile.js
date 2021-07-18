import React, { Component } from 'react';
import './CSS/WatchUserProfile.css';
import {SearchUserProfileById} from '../../actions/alumni/index';
import GetEducation from './file options/GetEducation';
import GetExperience from './file options/GetExperience';
import {connect} from 'react-redux';
import WatchUserGithub from './file options/WatchUserGithub';
import WatchUserCodeforceRating from './file options/WatchUserCodeforceRating';
import {Redirect,Link} from 'react-router-dom';
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
        let date=new Date( this.props.userProfile.user.dateOfBirth);
        date=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
           return(<div clasName="WatchUserProfile">
               <div className="WatchUserProfile-Home">
               <Link to="/alumni/showProfile">#HOME</Link>
               </div>   
              <div className="show-Dashboard">
            <h1>
               {this.props.userProfile.user.user.name}
            </h1>
            <h2>
                {this.props.userProfile.user.skills.map((skill, index) => {
                    let e = "";
                    if (index > 0) {
                        e = " , "
                    }
                    return (e + skill);
                })}
            </h2>
            <h3>
                About
             </h3>
            <div className="WatchUserProfile-quote_1">
                “
             </div>
            <p className="WatchUserProfile-AboutMe">
                {this.props.userProfile.user.bio}
            </p>
            <div className="WatchUserProfile-quote_2">
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
                            <h4>Birthday</h4>
                        </li>
                        <li>
                            <h4> Nationality</h4>
                        </li>
                        <li>
                            <h4>Current Location</h4>
                        </li>
                    </ul>
                    <div className="side-line"></div>
                </div>
                <div>
                    <li>
                        <h4>{this.props.userProfile.user.user.name}</h4>
                    </li>
                    <li>
                        <h4>{
                            date
                       }</h4>
                    </li>
                    <li>
                        <h4>{this.props.userProfile.user.nationality}</h4>
                    </li>
                    <li>
                        <h4>{this.props.userProfile.user.location}</h4>
                    </li>
                </div>
            </div>
            <h3>
                Contact
        </h3>
            <div className="email-info">
                <div className="cent">
                    <ion-icon name="mail-open-outline" class="WatchUserProfile-contact-icon"></ion-icon>
                    <p> {this.props.userProfile.user.user.email}</p>
                </div>
            </div>

            <div className="professional-info">
            <div>
            {this.props.userProfile.user.education.length>0?null:<ul>
                       <li><h4>Education</h4></li>
                       </ul>}  
             </div>
             {this.props.userProfile.user.education.length>0?null:<div><h5>User Haven't given any info about education</h5></div>}
            </div>
            {
                this.props.userProfile.user.education.length>0?
                <GetEducation edu={this.props.userProfile.user.education}/>:null
            }
            <h3>
                Professional info
            </h3>
            <div className="professional-info" >
                <div style={{ height: `${this.state.height}px`, borderRight: '1px solid #e0e0dc', verticalAlign: 'center', marginBottom: '80px' }}>
                    <ul ref={this.sidelineRef}>
                        {this.props.userProfile.user.company ? <li><h4>Company</h4></li> : null}
                        {this.props.userProfile.user.status ? <li><h4>Status</h4></li> : null}
                        {this.props.userProfile.user.skills.length > 0 ? <li><h4>Skills</h4></li> : null}
                    </ul>
                </div>
                <div>
                    <ul>
                        {this.props.userProfile.user.company ? <li><h4>{this.props.userProfile.user.company}</h4></li> : null}
                        {this.props.userProfile.user.status ? <li><h4>{this.props.userProfile.user.status}</h4></li> : null}
                        {this.props.userProfile.user.skills.length > 0 ? <li><h4>{this.props.userProfile.user.skills}</h4></li> : null}
                    </ul>
                </div>
            </div>
            <div className="professional-info">
            <div>
            {this.props.userProfile.user.experience.length>0?null:<ul>
                       <li><h4>Experience</h4></li>
                       </ul>}  
             </div>
             {this.props.userProfile.user.experience.length>0?null:<div><h5>User Haven't given any info about experience</h5></div>}
            </div>
            {
                this.props.userProfile.user.experience.length>0?
                <GetExperience exp={this.props.userProfile.user.experience}/>:null
            }
            <div className="personal-info">
                <div>
                    <ul>
                      
                            <li><h3>Repositories</h3></li>
                    </ul>
                </div>
                <div>
                    {this.props.userProfile.user.githubusername ?
                        <li><WatchUserGithub id={this.props.match.params.userid}/></li> : <li>
                           <h5>User didn't provide any github info</h5>
                        </li>}
                </div>
            </div>
            <div className="personal-info">
                <div>
                    <ul>
                       
                            <li><h3>codeforceRatings</h3></li>
                    </ul>
                </div>
                <div>
                    {this.props.userProfile.user.codeforceusername ?
                        <li><WatchUserCodeforceRating id={this.props.match.params.userid}/></li> : <li>
                             <h5>User didn't provide any codeforce Info</h5>
                        </li>}
                </div>
            </div>

        </div>
           </div>)
       
    }
    else{
        return(<div>Loading</div>)
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