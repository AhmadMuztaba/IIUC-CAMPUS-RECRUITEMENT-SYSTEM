import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Signin extends Component {
    state={selected:null}
    render() {
        const Names=[{name:'User',url:'/user/login'},{name:'Company',url:'/company/login'},{name:'Alumni',url:'/alumni/login'},{name:'Admin',url:'/admin/login'}]
        return (
            <div className="mainpage__signin">
                {
                    Names.map((name,index)=>{
                       return(<Link style={{textDecoration:'none'}} to={name.url}><div className="mainpage__signin--each" key={index}>{name.name}</div></Link>)
                    })
                }
            </div>
        );
    }
}

export default Signin;