import axios from "axios";
import { SetError } from "../Error";
import {
  ADMIN_REGISTRATION_SUCCESS,
  ADMIN_REGISTRATION_FAIL,
  ADMIN_SIGN_IN,
  ADMIN_SIGN_OUT,
  ADMIN_AUTH_FAIL,
  TEMPORARY_COMPANIES,
  TEMPORARY_ALUMNI,
  FETCH_ALL_USER_BLOG_BYADMIN,
  FETCH_ALL_ALUMNI_BLOG_BYADMIN,
  FETCH_ALUMNI_BLOG_BY_ID_BY_ADMIN,
  FETCH_USER_BLOG_BY_ID_BY_ADMIN,
  DELETE_ALUMNI_BLOG,
  DELETE_USER_BLOG,
  ALL_JOB_POST_SEE_BY_ADMIN,
  DELETE_JOB_BYADMIN,
  SEARCH_USER_BY_ADMIN,
  SEARCH_COMPANY_BY_ADMIN,
  SEARCH_ALUMNI_BY_ADMIN,
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
  CLEAR_EVERYTHING
} from "../Type";
import { SetToken } from "../utility/SetToken";

export const AdminSignIn = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const body = JSON.stringify(email, password);
    const response = await axios.post("/login/admin", body, config);
    dispatch({
      type: ADMIN_SIGN_IN,
      payload: response.data,
    });
  } catch (err) {
    dispatch(SetError(err.response.data.err));
    dispatch({
      type: ADMIN_AUTH_FAIL,
    });
  }
};

export const AdminRegistration = (name, email, password) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = JSON.stringify(name, email, password);
  try {
    const response = await axios.post("/signup/admin", body, config);
    console.log(response);
    dispatch({
      type: ADMIN_REGISTRATION_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data.err.msg);
    dispatch({
      type: ADMIN_REGISTRATION_FAIL,
    });
  }
};

export const AdminSignOut = () => async (dispatch) => {
  try {
    await axios.get("/admin/logout");
    dispatch({
      type: ADMIN_SIGN_OUT,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_SIGN_OUT,
    });
    dispatch({
        type:CLEAR_EVERYTHING
    })
  }
};

export const TemporaryCompanies = () => async (dispatch) => {
  try {
    SetToken(localStorage.getItem("adminToken"));
    const response = await axios.get("/temporary/company");
    dispatch({
      type: TEMPORARY_COMPANIES,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const TemporaryAlumni = () => async (dispatch) => {
  try {
    SetToken(localStorage.getItem("adminToken"));
    const response = await axios.get("/temporary/alumni");
    dispatch({
      type: TEMPORARY_ALUMNI,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const fetchAllUserBlogsByAdmin = (page) => async (dispatch) => {
  try {
    if (!page) {
      page = 0;
    }
    const response = await axios.get("/admin/UserBlog/all", {
      params: {
        page: page,
      },
    });
    dispatch({
      type: FETCH_ALL_USER_BLOG_BYADMIN,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const fetchAllAlumniBlogsByAdmin = (page) => async (dispatch) => {
  try {
    if (!page) {
      page = 0;
    }
    const response = await axios.get("/admin/AlumniBlog/all", {
      params: {
        page: page,
      },
    });
    dispatch({
      type: FETCH_ALL_ALUMNI_BLOG_BYADMIN,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const fetchUserBlogByIdAdmin = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/admin/UserBlog/${id}`);
    dispatch({
      type: FETCH_USER_BLOG_BY_ID_BY_ADMIN,
      data: response.data,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const fetchAlumniBlogByIdAdmin = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/admin/AlumniBlog/${id}`);
    dispatch({
      type: FETCH_ALUMNI_BLOG_BY_ID_BY_ADMIN,
      data: response.data,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const deleteUserBlogById = (id) => async (dispatch) => {
  try {
    SetToken(localStorage.getItem("adminToken"));
    const response = await axios.delete(`/delete/admin/UserBlog/${id}`);
    console.log(response);
    dispatch({
      type: DELETE_USER_BLOG,
      payload:{id},
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const deleteAlumniBlogById = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/delete/admin/AlumniBlog/${id}`);
    console.log(response);
    dispatch({
      type: DELETE_ALUMNI_BLOG,
      payload:{id},
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const allJobs = () => async (dispatch) => {
  try {
    const response = await axios.get("/admin/allJobs");
    dispatch({
      type: ALL_JOB_POST_SEE_BY_ADMIN,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const deleteJob = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/delete/admin/JobPost/${id}`);
    dispatch({
      type: DELETE_JOB_BYADMIN,
      payload: id,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const UserSearch = (name) => async (dispatch) => {
  try {
    const response = await axios.get("/admin/search/user", {
      search: name,
    });
    dispatch({
      type: SEARCH_USER_BY_ADMIN,
      payload: response.data,
    });
  } catch (err) {
    dispatch(SetError(err.response.data.err));
  }
};

export const AlumniSearch = (name) => async (dispatch) => {
  try {
    const response = await axios.get("/admin/search/alumni", {
      search: name,
    });
    dispatch({
      type: SEARCH_ALUMNI_BY_ADMIN,
      payload: response.data,
    });
  } catch (err) {
    dispatch(SetError(err.response.data.err));
  }
};

export const CompanySearch = (name) => async (dispatch) => {
  try {
    const response = await axios.get("/admin/search/company", {
      search: name,
    });
    dispatch({
      type: SEARCH_COMPANY_BY_ADMIN,
      payload: response.data,
    });
  } catch (err) {
    dispatch(SetError(err.response.data.err));
  }
};

export const userProfileWatchAdmin = (id) => async (dispatch) => {
  try {
    SetToken(localStorage.getItem("adminToken"));
    const response = await axios.get(`/admin/watch/user/profile/${id}`);
    dispatch({
      type: USER_PROFILE_WATCH_ADMIN,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const alumniProfileWatchAdmin = (id) => async (dispatch) => {
  try {
    SetToken(localStorage.getItem("adminToken"));
    const response = await axios.get(`/admin/watch/alumni/profile/${id}`);
    console.log(response.data);
    dispatch({
      type: ALUMNI_PROFILE_WATCH_ADMIN,
      payload: response.data.alumniProfile,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const CompanyProfileWatchAdmin = (id) => async (dispatch) => {
  try {
    SetToken(localStorage.getItem("adminToken"));
    const response = await axios.get(`/admin/watch/company/profile/${id}`);
    dispatch({
      type: COMPANY_PROFILE_WATCH_ADMIN,
      payload: response.data.companyProfile,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const watchUsercfrating = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `/admin/watch/user/profile/${id}/codeforceRatings`
    );
    dispatch({
      type: USER_WATCH_CODEFORCE_BY_ADMIN,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const watchUsergithubrating = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `/admin/watch/user/profile/${id}/githubRepos`
    );
    dispatch({
      type: USER_WATCH_GITHUB_BY_ADMIN,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const watchAlumnicfrating = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `/admin/watch/alumni/profile/${id}/codeforceRatings`
    );
    dispatch({
      type: ALUMNI_WATCH_CODEFORCE_BY_ADMIN,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const watchAlumnigithubrating = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `/admin/watch/alumni/profile/${id}/githubRepos`
    );
    dispatch({
      type: ALUMNI_WATCH_GITHUB_BY_ADMIN,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/delete/admin/user/${id}`);
    dispatch({
      type: DELETE_USER,
      payload: { id },
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const deleteAlumni = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/delete/admin/alumni/${id}`);
    dispatch({
      type: DELETE_ALUMNI,
      payload: { id },
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const deleteCompany = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/delete/admin/company/${id}`);
    dispatch({
      type: DELETE_COMPANY,
      payload: { id },
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};
