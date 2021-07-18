import _ from 'lodash';
import {CREATE_JOB_POST,COMPANY_ALL_JOB_POST,USER_FETCH_JOB_POSTS,ALL_JOB_POST_SEE_BY_ADMIN,DELETE_JOB_BYADMIN} from '../../actions/Type';
const INITIAL_STATE={
    JobPost:{},
}
export const Job=(state=INITIAL_STATE,action)=>{
    const {type,payload}=action;
    switch(type){
        case COMPANY_ALL_JOB_POST:
            case USER_FETCH_JOB_POSTS:
                case ALL_JOB_POST_SEE_BY_ADMIN:
            return{
            ...state,
            JobPost:{...state.JobPost,..._.mapKeys(payload,'_id')}
            }
        case CREATE_JOB_POST:
            return{
                ...state,
                JobPost:{
                    [payload._id]:payload
                }
            }
        case DELETE_JOB_BYADMIN:
            return{
                ..._.omit(state.JobPost,payload.id)
            }
        default:
            return state;
    }
}