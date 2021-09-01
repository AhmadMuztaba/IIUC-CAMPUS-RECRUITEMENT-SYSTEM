import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class JoinUs extends Component {
    render() {
        const Names=[{name:'User',url:'/user/signup'},{name:'Company',url:'/company/signup'},{name:'Alumni',url:'/alumni/signup'}]
        return (
            <div className="mainpage__joinus">
               {
                    Names.map((name,index)=>{
                       return(<Link style={{textDecoration:'none'}} to={name.url}><div className="mainpage__joinus--each" key={index}>{name.name}</div></Link>)
                    })
                }
            </div>
        );
    }
}

export default JoinUs;