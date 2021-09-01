import {ADMIN_AUTH_FAIL,ADMIN_AUTH_SUCCESS,ADMIN_REGISTRATION_SUCCESS,ADMIN_REGISTRATION_FAIL,ADMIN_SIGN_IN,ADMIN_SIGN_OUT, NO_ADMIN} from '../../actions/Type';
const INITIAL_STATE={
    token:localStorage.getItem('adminToken'),
    admin:null,
    isAuthenticated:false,
    loading:true,
    type:null,
}

export const ADMINAuth=(state=INITIAL_STATE,action)=>{
     const {type,payload}=action;
     switch(type){
         case ADMIN_REGISTRATION_SUCCESS:
             case ADMIN_SIGN_IN:
                 return({
                     ...state,
                     ...payload,
                     token:localStorage.setItem('adminToken',payload.token),
                     isAuthenticated:true,
                     loading:false,
                     type:'Admin',
                 })
        case ADMIN_AUTH_SUCCESS:
            return({
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false,
                type:'Admin'
            })
        
       case ADMIN_REGISTRATION_FAIL:
           case ADMIN_SIGN_OUT:
               case ADMIN_AUTH_FAIL:
                   return({
                       ...state,
                       token:localStorage.removeItem('adminToken'),
                       isAuthenticated:false,
                       loading:false,
                       admin:null,
                       type:null
                   })
    case NO_ADMIN:
        return({
            ...state,
            isAuthenticated:false,
            loading:false,
            admin:null,
            type:null
        })
      default:
          return state
     }
}