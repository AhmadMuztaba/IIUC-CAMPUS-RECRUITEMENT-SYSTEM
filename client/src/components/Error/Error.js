import React, { Component } from 'react';
import {connect} from 'react-redux';
import './css/Error.css'
class Error extends Component {
    render() {
     if( this.props.error!==null&&this.props.error!==undefined&&this.props.error.length>0){
        return(this.props.error.map((error)=>{
            return(
                <div className="ERROR">
                {error.msg}
            </div>
            )   
     }))
     }
     else{
         return null ;
     }
    }
}
const mapStateToProps=(state)=>{
    return({error:state.Error})
}

export default connect(mapStateToProps)(Error);