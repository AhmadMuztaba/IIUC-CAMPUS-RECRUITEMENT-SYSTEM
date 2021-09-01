import {
   COMPANY_OWN_PROFILE,COMPANY_CREATE_PROFILE,COMPANY_PROFILE_FAILED,COMPANY_SEARCH_USER,
   COMPANY_WATCH_USER_PROFILE,COMPANY_WATCH_USER_GITHUB_REPOS,
   COMPANY_WATCH_USER_CODEFORCE_RATING,GET_COMPANY_PROFILE_PIC,POST_COMPANY_PROFILE_PIC,
   CLEAR_COMPANY_PROFILE,ADVANCED_SEARCH,CLEAR_EVERYTHING
 } from '../../actions/Type';
 
 const INITIAL_STATE = {
     companyProfile: null,
     usersProfiles: {},
     loading: true,
     GithubRepos: [],
     CodeForceRatings: [],
     profilePic:null,
     users:[],
     usersProfilesList:[],
 }
 
 export const CompanyProfile = (state = INITIAL_STATE, action) => {
     const { type, payload } = action;
     switch (type) {
         case COMPANY_OWN_PROFILE:
         case COMPANY_CREATE_PROFILE:
             return ({
                 ...state,
                 companyProfile: {...state.userProfile,...payload},
                 loading: false,
             })
         case COMPANY_PROFILE_FAILED:
             return ({
                 ...state,
                 loading: false
             })
             case COMPANY_WATCH_USER_GITHUB_REPOS:
             return ({
                 ...state,
                 GithubRepos:payload,
             })
             case COMPANY_WATCH_USER_CODEFORCE_RATING:
             return({
                  ...state,
                 CodeForceRatings:payload,
             })
         case GET_COMPANY_PROFILE_PIC:
             case POST_COMPANY_PROFILE_PIC:
                 return({
                     ...state,
                     profilePic:payload,
                 })
         case COMPANY_SEARCH_USER:{
             return({
                 ...state,
                  users:payload.user
             })
         }
         case ADVANCED_SEARCH:{
             return({
                 ...state,
                 usersProfilesList:payload.user,
             })
         }
         case CLEAR_EVERYTHING:
         case CLEAR_COMPANY_PROFILE:
             return ({
                companyProfile: null,
                usersProfiles: {},
                loading: true,
                GithubRepos: [],
                CodeForceRatings: [],
                profilePic:null,
                users:[],
                usersProfilesList:[],
             })
         case COMPANY_WATCH_USER_PROFILE:
             return({
                 ...state,
                 usersProfiles:{
                     [payload.user._id]:payload
                 }
             })
        
         default:
             return (state);
     }
 }