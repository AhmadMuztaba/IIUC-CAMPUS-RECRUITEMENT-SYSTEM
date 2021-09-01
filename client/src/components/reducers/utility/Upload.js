import {UPLOAD_PERCENTAGE} from '../../actions/Type'
export const upload=(state=[],action)=>{
    const{type,payload}=action;
    switch(type){
        case UPLOAD_PERCENTAGE:{
            return(payload);
        }
        default:
            return state;
    }
}