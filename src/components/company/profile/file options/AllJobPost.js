import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchMyPosts} from '../../../actions/company/index'
class AllJobPost extends Component {
    componentDidMount(){
        this.props.fetchMyPosts();
    }
    render() {
        if(!this.props.jobs){
            return null;
        }
        else if(this.props.jobs){
            return(<div className="jobpost">
                {this.props.jobs.map((job,index)=>{
                    return(<div key={index} className="jobpost__eachpost">             
                        <div className="jobpost__eachpost--heading">
                            {job.title}
                        </div>
                        <div className="jobpost__eachpost--description">
                        {job.description}
                        </div>
                        <div>
                            <ul>
                                Applied Users:
                                {job.appliedUsers.map((user)=>{
                                    return(<li>{user.user.name}</li>)
                                })}
                            </ul>
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