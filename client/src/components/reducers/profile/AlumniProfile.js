import {
  ALUMNI_OWN_PROFILE,
  ALUMNI_CREATE_PROFILE,
  CREATE_ALUMNI_EDUCATION,
  CREATE_ALUMNI_EXPERIENCE,
  ALUMNI_PROFILE_FAILED,
  GET_ALUMNI_GITHUBREPOS,
  GET_ALUMNI_CODEFORCERATINGS,
  GET_ALUMNI_PROFILE_PIC,
  POST_ALUMNI_PROFILE_PIC,
  CLEAR_ALUMNI_PROFILE,
  SEARCH_USER,
  WATCH_USER_PROFILE,
  WATCH_USER_GITHUB_REPOS,
  WATCH_USER_CODEFORCE_RATING,
  EDIT_ALUMNI_EDUCATION,
  EDIT_ALUMNI_EXPERIENCE,
  CLEAR_EVERYTHING,
  ALUMNI_SIGN_OUT
} from "../../actions/Type";

const INITIAL_STATE = {
  alumniProfile: null,
  usersProfiles: {},
  loading: true,
  GithubRepos: [],
  CodeForceRatings: [],
  profilePic: null,
  users: [],
};

export const AlumniProfile = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALUMNI_OWN_PROFILE:
    case ALUMNI_CREATE_PROFILE:
    case CREATE_ALUMNI_EXPERIENCE:
    case CREATE_ALUMNI_EDUCATION:
      case EDIT_ALUMNI_EXPERIENCE:
        case EDIT_ALUMNI_EDUCATION:
      return {
        ...state,
        alumniProfile: { ...state.userProfile, ...payload },
        loading: false,
      };
    case ALUMNI_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
      };

    case GET_ALUMNI_GITHUBREPOS:
    case WATCH_USER_GITHUB_REPOS:
      return {
        ...state,
        GithubRepos: payload,
      };
    case GET_ALUMNI_CODEFORCERATINGS:
    case WATCH_USER_CODEFORCE_RATING:
      return {
        ...state,
        CodeForceRatings: payload,
      };
    case GET_ALUMNI_PROFILE_PIC:
    case POST_ALUMNI_PROFILE_PIC:
      return {
        ...state,
        profilePic: payload,
      };
    case SEARCH_USER: {
      return {
        ...state,
        users: payload.user,
      };
    }
    case CLEAR_EVERYTHING:
    case CLEAR_ALUMNI_PROFILE:
      case ALUMNI_SIGN_OUT:
      return {
        alumniProfile: null,
        usersProfiles: {},
        loading: true,
        GithubRepos: [],
        CodeForceRatings: [],
        profilePic: null,
        users: [],
      };
    case WATCH_USER_PROFILE:
      return {
        ...state,
        usersProfiles: {
          [payload.user.user._id]: payload,
        },
      };
    default:
      return state;
  }
};
