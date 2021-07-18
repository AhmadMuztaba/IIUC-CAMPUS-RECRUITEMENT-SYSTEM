import React, { Component } from 'react';
import {connect} from 'react-redux';
import GetEducation from './GetEducation';
import GetExperience from './GetExperience';
import WatchUserGithub from './WatchUserGithub';
import WatchUserCodeforceRating from './WatchUserCodeforceRating';
class AdVancedSearchResult extends Component {
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
    render() {
        return (
            <div>
              {
                  this.props.users.map((user)=>{
                    let image=new Buffer.from(user.profilePic.data).toString('base64');
                    image='data:image/png;base64,'+image;
                    let date=new Date(user.dateOfBirth);
                    date=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
                       return(<div clasName="WatchUserProfile">
                            <img src={image} alt="profilePic"/>
                          <div className="show-Dashboard">
                        <h1>
                           {user.user.name}
                        </h1>
                      
                        <h2>
                            {user.skills.map((skill, index) => {
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
                            {user.bio}
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
                                    <h4>{user.user.name}</h4>
                                </li>
                                <li>
                                    <h4>{
                                        date
                                   }</h4>
                                </li>
                                <li>
                                    <h4>{user.nationality}</h4>
                                </li>
                                <li>
                                    <h4>{user.location}</h4>
                                </li>
                            </div>
                        </div>
                        <h3>
                            Contact
                    </h3>
                        <div className="email-info">
                            <div className="cent">
                                <ion-icon name="mail-open-outline" class="WatchUserProfile-contact-icon"></ion-icon>
                                <p> {user.user.email}</p>
                            </div>
                        </div>
            
                        <div className="professional-info">
                        <div>
                        {user.education.length>0?null:<ul>
                                   <li><h4>Education</h4></li>
                                   </ul>}  
                         </div>
                         {user.education.length>0?null:<div><h5>User Haven't given any info about education</h5></div>}
                        </div>
                        {
                            user.education.length>0?
                            <GetEducation edu={user.education}/>:null
                        }
                        <h3>
                            Professional info
                        </h3>
                        <div className="professional-info" >
                            <div style={{ height: `${this.state.height}px`, borderRight: '1px solid #e0e0dc', verticalAlign: 'center', marginBottom: '80px' }}>
                                <ul ref={this.sidelineRef}>
                                    {user.company ? <li><h4>Company</h4></li> : null}
                                    {user.status ? <li><h4>Status</h4></li> : null}
                                    {user.skills.length > 0 ? <li><h4>Skills</h4></li> : null}
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    {user.company ? <li><h4>{user.company}</h4></li> : null}
                                    {user.status ? <li><h4>{user.status}</h4></li> : null}
                                    {user.skills.length > 0 ? <li><h4>{user.skills}</h4></li> : null}
                                </ul>
                            </div>
                        </div>
                        <div className="professional-info">
                        <div>
                        {user.experience.length>0?null:<ul>
                                   <li><h4>Experience</h4></li>
                                   </ul>}  
                         </div>
                         {user.experience.length>0?null:<div><h5>User Haven't given any info about experience</h5></div>}
                        </div>
                        {
                            user.experience.length>0?
                            <GetExperience exp={user.experience}/>:null
                        }
                        <div className="personal-info">
                            <div>
                                <ul>
                                  
                                        <li><h3>Repositories</h3></li>
                                </ul>
                            </div>
                            <div>
                                {user.githubusername ?
                                    <li><WatchUserGithub id={user.user._id}/></li> : <li>
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
                                {user.codeforceusername ?
                                    <li><WatchUserCodeforceRating id={user.user._id}/></li> : <li>
                                         <h5>User didn't provide any codeforce Info</h5>
                                    </li>}
                            </div>
                        </div>
            
                    </div>
                       </div>)
                  })
              }
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return ({users:state.CompanyProfile.usersProfilesList})
}
export default connect(mapStateToProps)(AdVancedSearchResult);