import React, { Component } from 'react';
import './CSS/WatchUserProfile.css';
import {alumniProfileWatchAdmin,deleteAlumni} from '../../actions/admin/index';
import GetEducation from './file options/GetEducation';
import GetExperience from './file options/GetExperience';
import {connect} from 'react-redux';
import WatchAlumniGithub from './file options/WatchAlumniGithub';
import WatchAlumniCodeforceRating from './file options/WatchAlumniCodeforceRating';
import {Redirect,Link} from 'react-router-dom';
import history from '../../History/index';
class WatchAlumniProfileAdmin extends Component {
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
        this.props.alumniProfileWatchAdmin(this.props.match.params.userid);
        if(this.sidelineRef.current){
            this.setState({ height: this.sidelineRef.current.clientHeight });
        }
    }
    render() {
        if(this.props.error.length>0){
         return <Redirect to="/admin/showProfile"/>
        }

       if(this.props.AlumniProfile){
           return(<div clasName="WatchUserProfile">
               <div className="WatchUserProfile-Home">
               <Link to="/admin/showProfile">#HOME</Link>
               <button onClick={()=>{
                   this.props.deleteAlumni(this.props.AlumniProfile.alumni._id);
                   history.push('/admin/showProfile');
               }}>Delete</button>
               </div>              
              <div className="show-Dashboard">
            {this.props.AlumniProfile.profilePic?
             <img src={`data:image/png;base64,${new Buffer.from(this.props.AlumniProfile.profilePic.data).toString('base64')}`}/>
        :null}
           
            <h1>
                {this.props.AlumniProfile.alumni.name}
            </h1>
            <h2>
                {this.props.AlumniProfile.status}
            </h2>
            <h3>
                About Me
             </h3>
            <div className="quote_1">
                “
             </div>
            <p className="AboutMe">
                {this.props.AlumniProfile.about}
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
                        <h4>{this.props.AlumniProfile.alumni.name}</h4>
                    </li>
                    <li>
                    <h4>{this.props.AlumniProfile.passingYear}</h4>
                    </li>
                </div>
            </div>
            <h3>
                Contact
        </h3>
            <div className="email-info">
                <div className="cent">
                    <ion-icon name="mail-open-outline" class="contact-icon"></ion-icon>
                    <p> {this.props.AlumniProfile.alumni.email}</p>
                </div>
            </div>

            <div className="professional-info">
                <div>
                    <ul>
                        {this.props.AlumniProfile.education.length > 0 ?
                            null : <li>
                                <h4>
                                    Education
                         </h4>
                            </li>}
                    </ul>
                </div>
            </div>
            {
                this.props.AlumniProfile.education.length>0?
                <GetEducation edu={this.props.AlumniProfile.education}/>:null
            }
            <h3>
                Professional info
            </h3>
            <div className="professional-info" >
                <div style={{ height: `${this.state.height}px`, borderRight: '1px solid #e0e0dc', verticalAlign: 'center', marginBottom: '80px' }}>
                    <ul ref={this.sidelineRef}>
                        {this.props.AlumniProfile.currentJob ? <li><h4>Company</h4></li> : null}
                        {this.props.AlumniProfile.status ? <li><h4>Status</h4></li> : null}
                    </ul>
                </div>
                <div>
                    <ul>
                    {this.props.AlumniProfile.currentJob ? <li><h4>{this.props.AlumniProfile.currentJob}</h4></li> : null}
                    {this.props.AlumniProfile.status ? <li><h4>{this.props.AlumniProfile.status}</h4></li> : null}
                    </ul>
                </div>
            </div>
            <div className="professional-info">
                <div>
                    <ul>
                       
                       <li>
                                <h4>
                                     Experience
                         </h4>
                            </li>
                    </ul>
                </div>
            {
                this.props.AlumniProfile.experience.length>0?
                <GetExperience exp={this.props.AlumniProfile.experience}/>:"haven't given any info"
            }
            <div className="personal-info">
                <div>
                    <ul>
                        {this.props.AlumniProfile.githubusername ?
                            <li><h3>Repositories</h3></li> : <li>
                                <h4>
                                     Github 
                         </h4>
                            </li>}
                    </ul>
                </div>
                <div>
                    {this.props.AlumniProfile.githubusername ?
                        <li><WatchAlumniGithub id={this.props.AlumniProfile.alumni._id}/></li> : <li>
                            <h4>
                              haven\'t provided any info
                            </h4>
                        </li>}
                </div>
            </div>
            <div className="personal-info">
                <div>
                    <ul>
                        {this.props.AlumniProfile.codeforceusername ?
                            <li><h3>codeforceRatings</h3></li> : <li>
                                <h4>
                                    codeforce
                         </h4>
                            </li>}
                    </ul>
                </div>
                <div>

                </div>
                <div>
                    {this.props.AlumniProfile.codeforceusername ?
                        <li><WatchAlumniCodeforceRating id={this.props.AlumniProfile.alumni._id}/></li> : <li>
                            <h4>
                            haven\'t provided any info
                            </h4>
                        </li>}
                </div>
               <div>
                   
               </div>
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
    if(state.AdminProfile.alumniProfile===undefined){
        return({AlumniProfile:[],error:state.error})
    }
    return ({AlumniProfile:state.AdminProfile.alumniProfile[ownProps.match.params.userid],
    error:state.Error})
}

export default connect(mapStateToProps, {
    alumniProfileWatchAdmin,deleteAlumni
})(WatchAlumniProfileAdmin)