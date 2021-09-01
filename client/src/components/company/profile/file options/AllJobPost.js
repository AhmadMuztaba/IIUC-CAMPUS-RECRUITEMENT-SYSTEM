import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchMyPosts} from '../../../actions/company/index';
import {Link} from 'react-router-dom';
import '../CSS/AllJob.scss';
class AllJobPost extends Component {
    componentDidMount(){
        this.props.fetchMyPosts();
    }
    render() {
        if(!this.props.jobs){
            return null;
        }
        else if(this.props.jobs){
            return(<div className="jobpost" style={{marginTop:'1rem'}}>
                {this.props.jobs.map((job,index)=>{
                    return(<div key={index} className="jobpost__eachpost">             
                        <div className="jobpost__eachpost--heading">
                            {job.title}
                        </div>
                        <div className="jobpost__eachpost--description">
                        {job.description}
                        </div>
                        <div>
                               <span style={{color:'#3b9da1'}}>Applied Users:</span>
                                <div className="all_appliedUsers">
                                {job.appliedUsers.map((user)=>{
                                    return(<Link key={user.user._id} to={`/company/watch/userProfile/${user.user._id}`}>
                                        <div className="applied_user">
                                        <div><ion-icon name="person-sharp"></ion-icon></div>
                                        <div>{user.user.name}</div>
                                        </div>
                                        </Link>)
                                })}
                                </div> 
                        </div>
                        </div>)
                })}
            </div>)
        }
    }
}

const mapStateToProps=(state)=>{
    console.log()
   return({jobs:Object.values(state.Job.JobPost)})
}
export default connect(mapStateToProps,{fetchMyPosts})(AllJobPost);