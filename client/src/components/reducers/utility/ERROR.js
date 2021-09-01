import {ADD_ERROR,REMOVE_ERROR} from '../../actions/Type'
const INITIAL_STATE=[]
export const ERROR=(state=INITIAL_STATE,action)=>{
     const {type,payload}=action;
     switch(type){
         case ADD_ERROR:
             return([
                 ...state,payload
             ])
        case REMOVE_ERROR:
            return(
                state.filter((err=>{
                     return(err.id!=payload);
                }
                )
            )
            )
        default:
            return state
            }
}