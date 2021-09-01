import {ALUMNI_AUTH_FAIL,ALUMNI_AUTH_SUCCESS,ALUMNI_REGISTRATION_SUCCESS,ALUMNI_REGISTRATION_FAIL,ALUMNI_SIGN_IN,ALUMNI_SIGN_OUT, NO_ALUMNI} from '../../actions/Type';
const INITIAL_STATE={
    token:localStorage.getItem('alumniToken'),
    alumni:null,
    isAuthenticated:false,
    loading:true,
    type:null
}

export const ALUMNIAuth=(state=INITIAL_STATE,action)=>{
     const {type,payload}=action;
     switch(type){
             case ALUMNI_REGISTRATION_SUCCESS:
                 return ({
                    ...state,
                    isAuthenticated:false,
                    loading:false,
                    type:null,
                 })
             case ALUMNI_SIGN_IN:
                 return({
                     ...state,
                     ...payload,
                     token:localStorage.setItem('alumniToken',payload.token),
                     isAuthenticated:true,
                     loading:false,
                     type:'Alumni'
                 })
        case ALUMNI_AUTH_SUCCESS:
            return({
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false,
                type:'Alumni'
            })
        
       case ALUMNI_REGISTRATION_FAIL:
           case ALUMNI_SIGN_OUT:
               case ALUMNI_AUTH_FAIL:
                   return({
                       ...state,
                       token:localStorage.removeItem('alumniToken'),
                       isAuthenticated:false,
                       loading:false,
                       alumni:null,
                       type:null
                   })
      case NO_ALUMNI:
        return({
           ...state,
            isAuthenticated:false,
            loading:false,
            alumni:null,
            type:null
        })
      default:
          return state
     }
}