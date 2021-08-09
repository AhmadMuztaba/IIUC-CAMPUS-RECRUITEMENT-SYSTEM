import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {searchUsers} from '../../../actions/alumni/index';
import {Link} from 'react-router-dom';
import '../CSS/SearchUser.scss'
const SearchUser = ({searchUsers,users}) => {
    const[name,setName]=useState('');
    const [search,setSearch]=useState('');
    useEffect(()=>{
        const id=setTimeout(()=>{
                setSearch(name);
        },500)
        return ()=>{
             clearTimeout(id);
        }
    },[name])
    useEffect(()=>{
        if(search&&search!==''){
            searchUsers(search);
        }
    },[search]);
    return (  
        <div className="SearchUser">
            <form>
                <input type="text" className="SearchUser__search" placeholder="search" autoComplete="off" placeholder="" name="search" onChange={(e)=>{
                      setName(e.target.value);
                }}/>
            </form>
            <div class="show-User">
                {search?<h2>Search Result</h2>:<h2>Search for an user</h2>}
                {users? search&&users.length<=0?<div className="SearchUser__everyUser">No User found</div>: <div>
                   {users.map((user)=>{
                      return(<Link to={`/alumni/watch/userProfile/${user._id}`}><div class="EveryUser">{user.name}</div></Link>)
                   })}
               </div>:null}
               
            </div>
        </div>
    );
};

const mapStateToProps=(state)=>{
    return({
        users:state.AlumniProfile.users
    })
}
export default connect(mapStateToProps,{searchUsers})(SearchUser);