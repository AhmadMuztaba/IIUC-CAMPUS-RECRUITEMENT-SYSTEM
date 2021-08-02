import {
  USER_OWN_PROFILE,
  USER_PROFILE_FAILED,
  USER_CREATE_PROFILE,
  CLEAR_USER_PROFILE,
  CREATE_USER_EDUCATION,
  CREATE_USER_EXPERIENCE,
  GET_USER_GITHUBREPOS,
  GET_USER_CODEFORCERATINGS,
  GET_USER_PROFILE_PIC,
  POST_USER_PROFILE_PIC,
  UPDATE_USER_PROFILE,
  WATCH_COMPANY_PROFILE,
  WATCH_ALUMNI_GITHUB_REPO,
  WATCH_ALUMNI_CF_RATINGS,
  WATCH_ALUMNI_PROFILE,
  CLEAR_EVERYTHING,
  UPDATE_USER_EDUCATION,
  UPDATE_USER_EXPERIENCE
} from "../../actions/Type";

//import _ from 'lodash';
const INITIAL_STATE = {
  userProfile: null,
  usersProfiles: [],
  loading: true,
  company: {},
  alumni: {},
  GithubRepos: [],
  CodeForceRatings: [],
  profilePic: null,
};

export const UserProfile = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_OWN_PROFILE:
    case USER_CREATE_PROFILE:
      return {
        ...state,
        userProfile: { ...state.userProfile, ...payload },
        loading: false,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        userProfile: { ...state.userProfile, ...payload.profile },
        loading: false,
      };
      
    case UPDATE_USER_EXPERIENCE:
    case UPDATE_USER_EDUCATION:
    case CREATE_USER_EDUCATION:
    case CREATE_USER_EXPERIENCE:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          ...payload.profile,
        },
        loading: false,
      };
    case USER_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
      };
    case WATCH_ALUMNI_GITHUB_REPO:
    case GET_USER_GITHUBREPOS:
      return {
        ...state,
        GithubRepos: payload,
      };
    case WATCH_ALUMNI_CF_RATINGS:
    case GET_USER_CODEFORCERATINGS:
      return {
        ...state,
        CodeForceRatings: payload,
      };
    case GET_USER_PROFILE_PIC:
    case POST_USER_PROFILE_PIC:
      return {
        ...state,
        profilePic: payload,
      };
    case CLEAR_EVERYTHING:
    case CLEAR_USER_PROFILE:
      return {
        userProfile: null,
        usersProfiles: [],
        loading: true,
        company: {},
        alumni: {},
        GithubRepos: [],
        CodeForceRatings: [],
        profilePic: null,
      };
    case WATCH_COMPANY_PROFILE:
      return {
        ...state,
        company: {
          [payload.companyProfile.company._id]: payload.companyProfile,
        },
      };
    case WATCH_ALUMNI_PROFILE:
      return {
        ...state,
        alumni: {
          [payload.alumniProfile.alumni._id]: payload.alumniProfile,
        },
      };
    default:
      return state;
  }
};
