import React, { Component } from 'react';
import {connect} from 'react-redux';
import {TemporaryCompanies} from '../../../actions/admin/index';
import axios from 'axios';
class ShowTemporaryCompany extends Component {
    state={dontshow:[]}
    componentDidMount(){
        this.props.TemporaryCompanies();
    }
    render() {
         if(this.props.company){
             return(
                 <div>
                 <ul>
                     <li> Company Name</li>
                     <li>Company Email</li>
                 </ul>
                 {
                     this.props.company.map((com,index)=>{
                         if(this.state.dontshow.includes(index)){
                             return null;
                         }
                         return(<ul>
                             <li>{com.name}</li>
                             <li>{com.email}</li>
                             <li><button onClick={()=>{
                             axios.get(`/company/${com._id}/yes/signup`);
                             this.setState({dontshow:[...this.state.dontshow,index]})
                             }}><ion-icon name="checkmark-done-outline"></ion-icon></button></li>
                             <li><button onClick={()=>{
                             axios.get(`/company/${com._id}/No/signup`);
                             this.setState({dontshow:[...this.state.dontshow,index]})
                             }}><ion-icon name="close-outline"></ion-icon></button></li>
                             </ul>)
                     })
                 }
             </div>)
         }
         else{
             return 'loading';
         }
    
    }
}
const mapStateToProps=(state)=>{
    return({company:state.AdminProfile.companies})
}
export default connect(mapStateToProps,{TemporaryCompanies})(ShowTemporaryCompany);