import React, { Component } from 'react';
import axios from 'axios';
import { SetToken } from '../../actions/utility/SetToken';
import './CSS/Settings.scss';
class Settings extends Component {
    state={password:''}
    render() {
        return (
            <div className="settings">
                <label htmlFor="password">
                    Change password
                </label>
                <input id="password" type="password" name="password" onChange={(e)=>{
                    this.setState({password:e.target.value});
                }}/>
                <button disabled={this.state.password?false:true} onClick={async(e)=>{
                    e.preventDefault();
                    SetToken(localStorage.getItem('userToken'));
                const response=await axios.patch('/user/me/passwordChange',this.state)
                console.log(response.data);
                }}>Submit</button>
            </div>
        );
    }
}

export default Settings;