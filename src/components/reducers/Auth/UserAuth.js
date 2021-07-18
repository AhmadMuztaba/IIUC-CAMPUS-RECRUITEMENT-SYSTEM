import {USER_REGISTRATION_SUCCESS,USER_REGISTRATION_FAIL,USER_AUTH_SUCCESS,USER_AUTH_FAIL,USER_SIGN_IN,USER_SIGN_OUT, NO_USER} from '../../actions/Type';
const INITIAL_STATE={
    token:localStorage.getItem('userToken'),
    user:null,
    isAuthenticated:false,
    loading:true,
    type:null,
}

export const UserAuth=(state=INITIAL_STATE,action)=>{
     const {type,payload}=action;
     switch(type){
         case USER_REGISTRATION_SUCCESS:
             case USER_SIGN_IN:
             return({
                 ...state,
                ...payload,
                 token:localStorage.setItem('userToken',payload.token),
                 isAuthenticated:true,
                 loading:false,
                 type:'User'
             })
        case USER_AUTH_SUCCESS:
             return({
                 ...state,
                 ...payload,
                  isAuthenticated:true,
                  loading:false,
                  type:'User'
             })
         case USER_AUTH_FAIL:
             case USER_REGISTRATION_FAIL:
                 case USER_SIGN_OUT:
                     return({
                         token:localStorage.removeItem('userToken'),
                         ...state,
                         user:null,
                         loading:false,
                         isAuthenticated:false,
                         type:null
                     })
        case NO_USER:
            return({
                ...state,
                user:null,
                loading:false,
                isAuthenticated:false,
                type:null
            })
        default:
            return state;
     }
}