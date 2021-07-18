import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AllJobs} from '../../../actions/user/index';
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
            return(<div onScroll={this.roll} ref={this.jobPosts}>
                {this.props.jobs.map((job,index)=>{
                    
                    return (<div>{job.title}
                    {job.description}
                    posted by <Link to={`/user/companyprofile/watch/${job.Author._id}`}>{job.Author.name}</Link>
                    <button disabled={job.appliedUsers.toString().includes({user:this.props.user._id})?'true':''}onClick={()=>{
                      axios.post(`/job/user/${job._id}`).then((response)=>{
                         console.log(response.data);
                         this.setState({disabled:true,index:[...this.state.index,index]})
                      }).catch((err)=>{
                          console.log(err);
                      })
                    }}>Apply</button>
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