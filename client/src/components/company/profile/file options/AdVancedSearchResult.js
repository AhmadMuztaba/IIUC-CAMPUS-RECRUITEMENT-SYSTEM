import React, { Component } from 'react';
import {connect} from 'react-redux';
import GetEducation from './GetEducation';
import GetExperience from './GetExperience';
import Typewriter from 'typewriter-effect';
import WatchUserGithub from './WatchUserGithub';
import GetCodeforce from './WatchUserCodeforceRating';
import Social from './Social';
import '../CSS/AdvancedSearchResult.scss';
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
            image:null
        }
    }
    render() {
        return (
            <div className="AdvancedSearchResult">
              {
                  this.props.users.map((user)=>{
                      let image
                      if(user.profilePic){
                        image=new Buffer.from(user.profilePic.data).toString('base64');
                        image='data:image/png;base64,'+image;
                      }
                    let date=new Date( user.dateOfBirth);
           date=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        return (<div style={{display:'flex'}}>
          
<div className="AboutSection" style={{marginLeft:0}}>
    <div>
{user.profilePic?<div><img src={image}/></div>:null}
<div>
             <h1 className="AboutSection--heading">{user.user.name}</h1>
            
           <h2 className="AboutSection--heading-secondary utility-desktop">
            <Typewriter
            onInit={(typewriter)=>{
                typewriter.typeString(user.status)
                .pauseFor(4500)
                .deleteAll()
                .start();
            }
        }
        options={{loop:true}}
            />
           </h2>
           <h2 className="AboutSection--heading-secondary utility-mobile">
            {user.status}
           </h2>
           </div>
           </div>
           <div className="AboutSection--me">
           <h3 className="AboutSection--heading-Tertiary">About Me</h3>
           <p className="AboutSection__aboutme">
           {user.bio}
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
                        {user.name}
                        </div>
                        <div>
                            {date}
                        </div>
                        <div>
                            {user.nationality}
                        </div>
                        <div>
                        {user.location}
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
               {user.user.email}
               </div>
           </div>

            <div className="professional-info">
            </div>
            <div className="AboutSection__utility-margin">
            </div>
            {
                user.education.length>0?
                <GetEducation edu={user.education}/>:null
            }
            <h3>
                Professional info
            </h3>
            <div className="professional-info" >
                <div style={{ height: `${this.state.height}px`, borderRight: '1px solid #e0e0dc', verticalAlign: 'center'}}>
                    <ul ref={this.sidelineRef}>
                        {user.company ? <li><h4>Company</h4></li> : null}
                        {user.skills.length > 0 ? <li><h4>Skills</h4></li> : null}
                    </ul>
                </div>
                <div>
                    <ul>
                        {user.company ? <li><h4>{user.company}</h4></li> : null}
                        {user.skills.length > 0 ? <li><h4>{user.skills.map((skill,index)=>{
                            if(user.skills.length-1===index){
                                return skill
                            }else{
                                return(skill+",");
                            }
                        }
                        )}</h4></li> : null}
                    </ul>
                </div>
            </div> 
            {
                user.experience.length>0?
                <GetExperience exp={user.experience}/>:null
            }
            <div className="personal-info">
                <div>
                    <ul>
                        {user.githubusername ?
                            <li><h3>Repositories</h3></li> : 
                                null
                            }
                    </ul>
                </div>
                <div>
                    {user.githubusername ?
                        <li><WatchUserGithub id={user.user._id}/></li> : null}
                </div>
            </div>
            <div className="personal-info">
                <div>
                    <ul>
                        {user.codeforceusername ?
                            <li><h3>Codeforce Rating</h3></li> : <li>
                                <h4>
                                    Add codeforce User Name
                         </h4>
                            </li>}
                    </ul>
                </div>
                <div>
                    {user.codeforceusername ?
                        <GetCodeforce id={user.user._id} /> : null}
                </div>
            </div>
        </div>
        <Social social={user.social} website={user.website}/>
        </div>
        )
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