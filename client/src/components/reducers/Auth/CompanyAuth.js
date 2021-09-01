import {COMPANY_AUTH_FAIL,COMPANY_AUTH_SUCCESS,COMPANY_REGISTRATION_SUCCESS,COMPANY_REGISTRATION_FAIL,COMPANY_SIGN_IN,COMPANY_SIGN_OUT, NO_COMPANY} from '../../actions/Type';
const INITIAL_STATE={
    token:localStorage.getItem('companyToken'),
    company:null,
    isAuthenticated:false,
    loading:true,
    type:null
}

export const CompanyAuth=(state=INITIAL_STATE,action)=>{
     const {type,payload}=action;
     switch(type){
             case COMPANY_REGISTRATION_SUCCESS:{
                 return ({
                     ...state,
                     company:null,
                    isAuthenticated:false,
                    loading:false,
                    type:null,
                    });
             }
             case COMPANY_SIGN_IN:
                 return({
                     ...state,
                     ...payload,
                     token:localStorage.setItem('companyToken',payload.token),
                     isAuthenticated:true,
                     loading:false,
                     type:'Company'
                 })
        case COMPANY_AUTH_SUCCESS:
            return({
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false,
                type:'Company'
            })
        
       case COMPANY_REGISTRATION_FAIL:
           case COMPANY_SIGN_OUT:
               case COMPANY_AUTH_FAIL:
                   return({
                       ...state,
                       token:localStorage.removeItem('companyToken'),
                       isAuthenticated:false,
                       loading:false,
                       company:null,
                   })
      case NO_COMPANY:
        return({
            ...state,
            isAuthenticated:false,
            loading:false,
            comapny:null,
        })
      default:
          return state;
     }
}