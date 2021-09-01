import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TemporaryAlumni} from '../../../actions/admin/index';
import axios from 'axios';
class ShowTemporaryAlumni extends Component {
    state={dontshow:[]}
   componentDidMount(){
       this.props.TemporaryAlumni();
   }
    render() {
        if(this.props.alumni){
            return(
                <div>
                <ul>
                    <li>Alumni Name</li>
                    <li>Alumni Email</li>
                </ul>
                {
                    this.props.alumni.map((com,index)=>{
                        if(this.state.dontshow.includes(index)){
                            return null;
                        }
                        return(<ul>
                            <li>{com.name}</li>
                            <li>{com.email}</li>
                            <li><button onClick={()=>{
                            axios.get(`/alumni/${com._id}/yes/signup`);
                            this.setState({dontshow:[...this.state.dontshow,index]})
                            }}><ion-icon name="checkmark-done-outline"></ion-icon></button></li>
                            <li><button onClick={()=>{
                            axios.get(`/alumni/${com._id}/No/signup`);
                            this.setState({dontshow:[...this.state.dontshow,index]})
                            }}><ion-icon name="close-outline"></ion-icon></button></li>
                            </ul>)
                    })
                }
            </div>)
        }
    }
}
const mapStateToProps=(state)=>{
    return({alumni:state.AdminProfile.alumni})
}
export default connect(mapStateToProps,{TemporaryAlumni})(ShowTemporaryAlumni);