import axios from 'axios';
export const SetToken=(token)=>{
    if(token){
     axios.defaults.headers['Authorization']=`Bearer ${token}`
    }
    else{
        delete axios.defaults.headers['Authorization'];
    }
    return;
}