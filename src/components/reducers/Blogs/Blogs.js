import {
  CREATE_USER_BLOG_BY_USER,
  FETCH_USER_BLOGS,
  FETCH_USER_BLOG,
  FETCH_USER_BLOG_COMMENTS,
  CREATE_USER_BLOG_COMMENT_BY_USER,
  FETCH_ALUMNI_BLOGS,
  FETCH_ALUMNI_BLOG,
  FETCH_ALUMNI_BLOG_COMMENTS,
  CREATE_ALUMNI_BLOG_COMMENT_BY_USER,
  CREATE_USER_BLOG_COMMENT_BY_ALUMNI,
  CREATE_ALUMNI_BLOG_COMMENT_BY_ALUMNI,
  CREATE_ALUMNI_BLOG,
  FETCH_ALL_ALUMNI_BLOG_BYADMIN,
  FETCH_ALL_USER_BLOG_BYADMIN,
  FETCH_USER_BLOG_BY_ID_BY_ADMIN,
  FETCH_ALUMNI_BLOG_BY_ID_BY_ADMIN,
  DELETE_ALUMNI_BLOG,
  DELETE_USER_BLOG,
  CLEAR_EVERYTHING
} from "../../actions/Type";
import _ from "lodash";
const INITIALSTATE = {
  Userblogs: {},
  AlumniBlogs: {},
  UserBlogComments: {},
  AlumniBlogComments: {},
};

export const Blogs = (state = INITIALSTATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USER_BLOGS:
    case FETCH_ALL_USER_BLOG_BYADMIN:
      return {
        ...state,
        Userblogs: { ...state.Userblogs, ..._.mapKeys(payload.blogs, "_id") },
      };
    case CREATE_USER_BLOG_BY_USER:
      return {
        ...state,
        Userblogs: {
          ...state.Userblogs,
          [payload._id]: payload,
        },
      };
    case FETCH_USER_BLOG:
    case FETCH_USER_BLOG_BY_ID_BY_ADMIN:
      return {
        ...state,
        Userblogs: {
          ...state.Userblogs,
          [payload.blog._id]: payload.blog,
        },
      };
    case FETCH_USER_BLOG_COMMENTS:
      return {
        ...state,
        UserBlogComments: {
          ...state.UserBlogComments,
          ..._.mapKeys(payload, "_id"),
        },
      };
    case CREATE_USER_BLOG_COMMENT_BY_ALUMNI:
    case CREATE_USER_BLOG_COMMENT_BY_USER:
      return {
        ...state,
        UserBlogComments: { [payload._id]: payload, ...state.UserBlogComments },
      };
    case FETCH_ALUMNI_BLOGS:
    case FETCH_ALL_ALUMNI_BLOG_BYADMIN:
      return {
        ...state,
        AlumniBlogs: {
          ...payload.AlumniBlogs,
          ..._.mapKeys(payload.blogs, "_id"),
        },
      };
    case CREATE_ALUMNI_BLOG:
      return {
        ...state,
        AlumniBlogs: {
          ...state.AlumniBlogs,
          [payload._id]: payload,
        },
      };
    case FETCH_ALUMNI_BLOG:
    case FETCH_ALUMNI_BLOG_BY_ID_BY_ADMIN:
      return {
        ...state,
        AlumniBlogs: {
          ...state.AlumniBlogs,
          [payload.blog._id]: payload.blog,
        },
      };
    case CREATE_ALUMNI_BLOG_COMMENT_BY_ALUMNI:
    case CREATE_ALUMNI_BLOG_COMMENT_BY_USER:
      return {
        ...state,
        AlumniBlogComments: {
          ...state.AlumniBlogComments,
          [payload._id]: payload,
        },
      };
    case FETCH_ALUMNI_BLOG_COMMENTS:
      return {
        ...state,
        AlumniBlogComments: {
          ...state.AlumniBlogComments,
          ..._.mapKeys(payload, "_id"),
        },
      };
    case DELETE_USER_BLOG:
      return {
        ..._.omit(state.Userblogs, payload.id),
      };
    case DELETE_ALUMNI_BLOG:
      return {
        ..._.omit(state.AlumniBlogs, payload.id),
      };
    case CLEAR_EVERYTHING:
        return{
            Userblogs: {},
            AlumniBlogs: {},
            UserBlogComments: {},
            AlumniBlogComments: {},
        }
    default:
      return state;
  }
};
