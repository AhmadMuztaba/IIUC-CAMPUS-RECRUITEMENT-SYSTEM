import {
  TEMPORARY_ALUMNI,
  TEMPORARY_COMPANIES,
  SEARCH_USER_BY_ADMIN,
  SEARCH_ALUMNI_BY_ADMIN,
  SEARCH_COMPANY_BY_ADMIN,
  USER_PROFILE_WATCH_ADMIN,
  ALUMNI_PROFILE_WATCH_ADMIN,
  COMPANY_PROFILE_WATCH_ADMIN,
  USER_WATCH_CODEFORCE_BY_ADMIN,
  USER_WATCH_GITHUB_BY_ADMIN,
  ALUMNI_WATCH_CODEFORCE_BY_ADMIN,
  ALUMNI_WATCH_GITHUB_BY_ADMIN,
  DELETE_USER,
  DELETE_ALUMNI,
  DELETE_COMPANY,
  CLEAR_EVERYTHING,
} from "../../actions/Type";
import _ from "lodash";
const INITIAL_STATE = {
  companies: [],
  alumni: [],
  searchUsers: [],
  searchAlumni: [],
  searchCompany: [],
  userProfile: {},
  alumniProfile: {},
  companyProfile: {},
  GithubRepos: [],
  CodeForceRatings: [],
};
export const AdminProfile = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case TEMPORARY_COMPANIES:
      return {
        ...state,
        companies: payload,
      };
    case TEMPORARY_ALUMNI:
      return {
        ...state,
        alumni: payload,
      };
    case SEARCH_USER_BY_ADMIN:
      return {
        ...state,
        searchUsers: payload,
      };
    case SEARCH_ALUMNI_BY_ADMIN:
      return {
        ...state,
        searchAlumni: payload,
      };
    case SEARCH_COMPANY_BY_ADMIN:
      return {
        ...state,
        searchCompany: payload.company,
      };
    case USER_PROFILE_WATCH_ADMIN:
      return {
        ...state,
        userProfile: {
          [payload.user._id]: payload,
        },
      };
    case ALUMNI_PROFILE_WATCH_ADMIN:
      return {
        ...state,
        alumniProfile: {
          [payload.alumni._id]: payload,
        },
      };
    case COMPANY_PROFILE_WATCH_ADMIN:
      return {
        ...state,
        companyProfile: {
          [payload.company._id]: payload,
        },
      };
    case USER_WATCH_GITHUB_BY_ADMIN:
    case ALUMNI_WATCH_GITHUB_BY_ADMIN:
      return {
        ...state,
        GithubRepos: payload,
      };
    case USER_WATCH_CODEFORCE_BY_ADMIN:
    case ALUMNI_WATCH_CODEFORCE_BY_ADMIN:
      return {
        ...state,
        CodeForceRatings: payload,
      };
    case DELETE_USER:
      return {
        ...state,
        ..._.omit(state.userProfile, payload.id),
        searchUsers: [],
      };
    case DELETE_ALUMNI:
      return {
        ...state,
        ..._.omit(state.alumniProfile, payload.id),
        searchAlumni: [],
      };
    case DELETE_COMPANY:
      return {
        ...state,
        ..._.omit(state.companyProfile, payload.id),
        searchCompany: [],
      };
    case CLEAR_EVERYTHING:
      return {
        companies: [],
        alumni: [],
        searchUsers: [],
        searchAlumni: [],
        searchCompany: [],
        userProfile: {},
        alumniProfile: {},
        companyProfile: {},
        GithubRepos: [],
        CodeForceRatings: [],
      };
    default:
      return state;
  }
};
