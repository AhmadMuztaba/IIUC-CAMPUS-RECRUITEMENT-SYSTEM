import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AllJobs} from '../../../actions/user/index';
import '../CSS/JobPost.scss'
import axios from 'axios';
class JobPost extends Component {
    constructor(props){
        super(props);
        this.state={disabled:false,page:0,index:[]}
        this.jobPosts=React.createRef();
    }
    componentDidMount(){
        this.props.AllJobs(this.state.page);
    }
    role=()=>{
        if(this.jobPosts.current.scrollHeight-this.jobPosts.current.scrollTop===this.jobPosts.current.clientHeight){
            this.setState({page:this.state.page+1})
            this.props.AllJobs(this.state.page);
        }
    }
    render() {
        if(this.props.jobs){
            return(<div className="jobpost" onScroll={this.roll} ref={this.jobPosts}>
                {this.props.jobs.map((job,index)=>{
                    return (<div key={index} className="jobpost__eachpost">
                        <div className="jobpost__eachpost--heading">
                            {job.title}
                        </div>
                        <div className="jobpost__eachpost--description">
                        {job.description}
                        </div>
                    <div className="jobpost__eachpost--postedby">
                    <ion-icon name="pencil-outline"></ion-icon>
                    <Link to={`/user/companyprofile/watch/${job.Author._id}`}>{job.Author.name}</Link>
                    </div>
                    <div className="jobpost__eachpost--button">
                    <button className="jobpost__eachpost--button--btn" disabled={job.appliedUsers.includes({user:this.props.user._id})?true:false}onClick={()=>{
                      axios.post(`/job/user/${job._id}`).then((response)=>{
                         console.log(response.data);
                         this.setState({disabled:true,index:[...this.state.index,index]})
                      }).catch((err)=>{
                          console.log(err);
                      })
                    }}>Apply</button>
                    </div>
                    </div>)
                })}
            </div>)
        }
    }
}
const mapStateToProps=(state)=>{
    return ({user:state.UserAuth.user,
        jobs:Object.values(state.Job.JobPost)})
}
export default connect(mapStateToProps,{AllJobs})(JobPost);