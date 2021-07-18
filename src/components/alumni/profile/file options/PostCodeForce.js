import React, { Component } from 'react';
import {connect} from 'react-redux';
import {CreateAlumniProfile} from '../../../actions/alumni/index';


class PostCodeForce extends Component {
    state={
        value:'',
        button:true
    }
    onHandleSubmit=(e)=>{
        e.preventDefault();
        this.setState({button:false});
       this.props.CreateAlumniProfile({codeforceusername:this.state.value})
    }
    
     render() {
        if(!this.props.profile.loading&&this.props.profile.alumniProfile.alumniProfile.codeforceusername){
            return null
        }
         return (
             <div>
                 <form onSubmit={this.onHandleSubmit}>
                     <input type="text"name="codeforceusername" value={this.state.value}  required={true} onChange={(e)=>{
                      this.setState({value:e.target.value}); 
                     }}/>
                     {
                       this.state.button?<button type="submit">Add</button>:<button disabled >Submitting</button>
                    }
                 </form>
             </div>
         );
     }
}
const mapStateToProps=(state)=>{
    return({profile:state.AlumniProfile})
}
export default connect(mapStateToProps,{CreateAlumniProfile})(PostCodeForce);