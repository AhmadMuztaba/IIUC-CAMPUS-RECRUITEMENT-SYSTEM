import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {searchUsers} from '../../../actions/company/index';
import {Link} from 'react-router-dom';
import AdvancedSearch from './AdvancedSearch';
import '../CSS/SearchUser.css';
import AdVancedSearchResult from './AdVancedSearchResult';
const SearchUser = ({searchUsers,users}) => {
    const[name,setName]=useState('');
    const [adSearch,setadSearch]=useState(false);
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
        if(search){
            searchUsers(search);
        }
    },[search]);
  
    return (  
        <div>
            <form>
                <input type="text" className="search" placeholder="search" autoComplete="off" placeholder="" name="search" onChange={(e)=>{
                      setName(e.target.value);
                }}/>
            </form>
           {adSearch?null:<div onClick={()=>{
                setadSearch(true);
            }}><ion-icon name="search-circle-outline"></ion-icon>Advanced Search</div>}
            {adSearch?<AdvancedSearch/>:null}
            <div class="show-User">
                {search?<h2>Search Result</h2>:<h2>Search for an user</h2>}
                {users? search&&users.length<=0?<div className="EveryUser">No User found</div>: <div>
                   {users.map((user)=>{
                      return(<Link to={`/company/watch/userProfile/${user._id}`}><div class="EveryUser">{user.name}</div></Link>)
                   })}
               </div>:null}
               {adSearch?<AdVancedSearchResult/>:null}
            </div>
        </div>
    );
};

const mapStateToProps=(state)=>{
    return({
        users:state.CompanyProfile.users
    })
}
export default connect(mapStateToProps,{searchUsers})(SearchUser);