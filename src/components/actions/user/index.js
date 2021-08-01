import {
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAIL,
  USER_SIGN_IN,
  USER_SIGN_OUT,
  USER_AUTH_FAIL,
  USER_OWN_PROFILE,
  USER_PROFILE_FAILED,
  USER_CREATE_PROFILE,
  CREATE_USER_EDUCATION,
  CREATE_USER_EXPERIENCE,
  UPDATE_USER_PROFILE,
  GET_USER_GITHUBREPOS,
  GET_USER_CODEFORCERATINGS,
  GET_USER_PROFILE_PIC,
  POST_USER_PROFILE_PIC,
  CREATE_USER_BLOG_BY_USER,
  UPLOAD_PERCENTAGE,
  FETCH_USER_BLOGS,
  FETCH_USER_BLOG,
  FETCH_USER_BLOG_COMMENTS,
  CREATE_USER_BLOG_COMMENT_BY_USER,
  FETCH_ALUMNI_BLOGS,
  FETCH_ALUMNI_BLOG,
  FETCH_ALUMNI_BLOG_COMMENTS,
  CREATE_ALUMNI_BLOG_COMMENT_BY_USER,
  USER_FETCH_JOB_POSTS,
  WATCH_COMPANY_PROFILE,
  WATCH_ALUMNI_PROFILE,
  WATCH_ALUMNI_GITHUB_REPO,
  WATCH_ALUMNI_CF_RATINGS,
  CLEAR_EVERYTHING,
} from "../Type";
import axios from "axios";
import { SetToken } from "../utility/SetToken";
import { SetError } from "../Error/index";

export const UserSignIn = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const body = JSON.stringify(email, password);
    const response = await axios.post("/user/login", body, config);
    dispatch({
      type: USER_SIGN_IN,
      payload: response.data,
    });
  } catch (err) {
    const error = err.response.data.err;
    dispatch(SetError(error));
    dispatch({
      type: USER_AUTH_FAIL,
    });
  }
};

export const UserRegistration = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = JSON.stringify(name, email, password);
  try {
    const response = await axios.post("/user/signUp", body, config);
    dispatch({
      type: USER_REGISTRATION_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    const error = err.response.data.err;
    dispatch(SetError(error));
    dispatch({
      type: USER_REGISTRATION_FAIL,
    });
  }
};

export const UserOwnProfile = () => async (dispatch) => {
  try {
    SetToken(localStorage.getItem("userToken"));
    const response = await axios.get("/profile/me");
    dispatch({
      type: USER_OWN_PROFILE,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: USER_PROFILE_FAILED,
    });
  }
};

export const CreateOwnProfile = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify(data);
    const response = await axios.post("/profile/me", body, config);
    dispatch({
      type: USER_CREATE_PROFILE,
      payload: response.data,
    });
  } catch (err) {
    dispatch(SetError(err.response.data.err));
  }
};

export const UserOwnProfilePic = () => async (dispatch) => {
  try {
    SetToken(localStorage.getItem("userToken"));
    const response = await axios.get("/profile/me/profilePic");
    dispatch({
      type: GET_USER_PROFILE_PIC,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const CreateUserBlog = (fd) => async (dispatch) => {
  try {
    SetToken(localStorage.getItem('userToken'));
    const response=await axios.post('/blog/user',fd);
    dispatch({
      type:CREATE_USER_BLOG_BY_USER,
      payload:response.data
    })
  }catch (err) {
    dispatch(SetError(err.response.data.err));
  }
};

export const fetchUserBlogs = (page) => async (dispatch) => {
  try {
    SetToken(localStorage.getItem("userToken"));
    if (!page) {
      page = 0;
    }
    const response = await axios.get("/blog/user/all/user", {
      params: {
        page: page,
      },
    });
    dispatch({
      type: FETCH_USER_BLOGS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserBlogById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/blog/user/${id}/user`);
    dispatch({
      type: FETCH_USER_BLOG,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const CreateUserBlogCommentByUsers = (id, data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify({ comment: data });
    const response = await axios.post(
      `/blog/user/${id}/usercomment`,
      body,
      config
    );
    dispatch({
      type: CREATE_USER_BLOG_COMMENT_BY_USER,
      payload: response.data,
    });
  } catch (err) {}
};

export const fetchUserBlogComments = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/blog/user/${id}/allComments/user`);
    dispatch({
      type: FETCH_USER_BLOG_COMMENTS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchAlumniBlogs = () => async (dispatch) => {
  try {
    const response = await axios.get("/blog/alumni/all/user");
    dispatch({
      type: FETCH_ALUMNI_BLOGS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchAlumniBlogById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/blog/alumni/${id}/user`);
    dispatch({
      type: FETCH_ALUMNI_BLOG,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const CreateAlumniBlogCommentByUsers = (id, data) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify({ comment: data });
    const response = await axios.post(
      `/blog/Alumni/${id}/usercomment`,
      body,
      config
    );
    dispatch({
      type: CREATE_ALUMNI_BLOG_COMMENT_BY_USER,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchAlumniBlogComments = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/blog/alumni/${id}/allComments/user`);
    dispatch({
      type: FETCH_ALUMNI_BLOG_COMMENTS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UploadOwnProfilePic = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await axios.post(
      "/profile/me/profilePic",
      data,
      {
        onUploadProgress: (ProgressEvent) => {
          console.log(
            "uploaded " +
              (ProgressEvent.loaded / ProgressEvent.total) * 100 +
              "%"
          );
        },
      },
      config
    );
    dispatch({
      type: POST_USER_PROFILE_PIC,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addEducation = (info) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = JSON.stringify(info);
  SetToken(localStorage.getItem("userToken"));
  try {
    const response = await axios.post("/profile/me/education", body, config);
    dispatch({
      type: CREATE_USER_EDUCATION,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addExperience = (info) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };
  const body = JSON.stringify(info);
  try {
    const response = await axios.post("/profile/me/experience", body, config);
    dispatch({
      type: CREATE_USER_EXPERIENCE,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateUserInfo = (info) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  SetToken(localStorage.getItem("userToken"));
  console.log(info);
  try {
    const response = await axios.patch("/profile/me", info, config);
    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const githubRepo = () => async (dispatch) => {
  try {
    SetToken(localStorage.getItem("userToken"));
    const response = await axios.get("/profile/me/githubRepos");
    dispatch({
      type: GET_USER_GITHUBREPOS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const codeforceRatings = () => async (dispatch) => {
  try {
    SetToken(localStorage.getItem("userToken"));
    const response = await axios.get("/profile/me/codeforceRatings");
    dispatch({
      type: GET_USER_CODEFORCERATINGS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UserSignOut = () => async (dispatch) => {
  try {
    await axios.get("/user/logout");
    dispatch({
      type: USER_SIGN_OUT,
    });
  } catch (err) {
    dispatch({
      type: USER_SIGN_OUT,
    });
    dispatch({
      tpe:CLEAR_EVERYTHING
    })
  }
};

export const AllJobs = (page) => async (dispatch) => {
  try {
    const response = await axios.get("/allJobs",{
        params:{
            page:page
        }
    });
    dispatch({
      type: USER_FETCH_JOB_POSTS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const UserWatchCompanyProfile = (id) => async (dispatch) => {
  try {
    SetToken(localStorage.getItem("userToken"));
    const response = await axios.get(`/profile/watch/company/${id}`);
    dispatch({
      type: WATCH_COMPANY_PROFILE,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const UserWatchAlumniProfile = (id) => async (dispatch) => {
  try {
    SetToken(localStorage.getItem("userToken"));
    const response = await axios.get(`/profile/watch/alumni/${id}`);
    dispatch({
      type: WATCH_ALUMNI_PROFILE,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
}

export const UserWatchAlumniGithubRep = (id) => async (dispatch) => {
  try {
      SetToken(localStorage.getItem('userToken'));
    const response = await axios.get(`/user/watch/alumni/githubrepo/${id}`);
   dispatch({
       type:WATCH_ALUMNI_GITHUB_REPO,
       payload:response.data
   })
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const UserWatchAlumniCodeForceRatings = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/user/watch/alumni/cfrating/${id}`);
   
    dispatch({
      type: WATCH_ALUMNI_CF_RATINGS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};
