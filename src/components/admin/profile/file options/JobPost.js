import React, { Component } from 'react';
import {connect} from 'react-redux';
import {allJobs,deleteJob} from '../../../actions/admin/index';
class JobPost extends Component {
    componentDidMount(){
        this.props.allJobs();
    }
    render() {
        if(this.props.jobs){
            return (
                <div>
                    {
                        this.props.jobs.map((job,index)=>{
                         return (<div key={index}>
                             <ul>
                          <li>{job.title}</li>
                         <li> {job.description}</li>
                         <li> {job.Author.name}</li>
                        <button onClick={()=>{
                           this.props.deleteJob(job._id);
                         }}>Delete</button>
                         </ul>
                         </div>)
                        })
                    }
                </div>
            );
        }
    }
}
const mapStateToProps=(state)=>{
    if(state.Job.JobPost===undefined){
     return({jobs:[]});
    }
   return({jobs:Object.values(state.Job.JobPost)})
}
export default connect(mapStateToProps,{allJobs,deleteJob})(JobPost);