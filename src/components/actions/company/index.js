import axios from "axios";
import {
  COMPANY_REGISTRATION_SUCCESS,
  COMPANY_REGISTRATION_FAIL,
  COMPANY_SIGN_IN,
  COMPANY_SIGN_OUT,
  COMPANY_AUTH_FAIL,
  COMPANY_OWN_PROFILE,
  COMPANY_CREATE_PROFILE,
  COMPANY_PROFILE_FAILED,
  COMPANY_SEARCH_USER,
  COMPANY_WATCH_USER_PROFILE,
  COMPANY_WATCH_USER_GITHUB_REPOS,
  COMPANY_WATCH_USER_CODEFORCE_RATING,
  GET_COMPANY_PROFILE_PIC,
  POST_COMPANY_PROFILE_PIC,
  CLEAR_COMPANY_PROFILE,
  UPDATE_COMPANY_INFO,
  ADVANCED_SEARCH,
  CREATE_JOB_POST,
  COMPANY_ALL_JOB_POST,
  CLEAR_EVERYTHING
} from "../Type";
import { SetError } from "../Error/index";
import { SetToken } from "../utility/SetToken";

export const CompanySignIn = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const body = JSON.stringify(email, password);
    const response = await axios.post("/company/login", body, config);
    dispatch({
      type: COMPANY_SIGN_IN,
      payload: response.data,
    });
  } catch (err) {
    dispatch(SetError(err.response.data.err));
    dispatch({
      type: COMPANY_AUTH_FAIL,
    });
  }
};

export const CompanyRegistration = (name, email, password) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = JSON.stringify(name, email, password);
  try {
    const response = await axios.post(
      "/temporary/company/signup",
      body,
      config
    );
    console.log(response);
    dispatch({
      type: COMPANY_REGISTRATION_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch(SetError(err.response.data.err));
    dispatch({
      type: COMPANY_REGISTRATION_FAIL,
    });
  }
};

export const CompanySignOut = () => async (dispatch) => {
  try {
    await axios.get("/company/logout");
    dispatch({
      type: COMPANY_SIGN_OUT,
    });
  } catch (err) {
    dispatch({
      type: COMPANY_SIGN_OUT,
    });
    dispatch({
      type:CLEAR_EVERYTHING
    })
  }
};

export const CreateCompanyProfile = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify(data);
    const response = await axios.post("/profile/company/me", body, config);
    dispatch({
      type: COMPANY_CREATE_PROFILE,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const CompanyOwnProfile = () => async (dispatch) => {
  SetToken(localStorage.getItem('companyToken'));
  try {
    const response = await axios.get("/profile/company/me");
    dispatch({
      type: COMPANY_OWN_PROFILE,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: COMPANY_PROFILE_FAILED,
    });
  }
};

export const CompanyOwnProfilePic = () => async (dispatch) => {
  try {
    const response = await axios.get("/profile/company/me/profilePic");
    dispatch({
      type: GET_COMPANY_PROFILE_PIC,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UploadCompanyProfilePic = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await axios.post(
      "/profile/company/uploadProfilePic",
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
      type: POST_COMPANY_PROFILE_PIC,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateCompanyInfo = (info) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = JSON.stringify(info);
  try {
    const response = await axios.post("/profile/company/me", body, config);
    dispatch({
      type: UPDATE_COMPANY_INFO,
      payload: response.data,
    });
  } catch (err) {
    dispatch(SetError(err.response.data.err));
  }
};

export const searchUsers = (search) => async (dispatch) => {
  try {
    const response = await axios.get("/company/search/user", {
      params: {
        search: search,
      },
    });
    dispatch({
      type: COMPANY_SEARCH_USER,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response.data.err);
  }
};

export const searchSpecificUser = (search) => async (dispatch) => {
  try {
    const response = await axios.get("/search/specificUser", {
      params: {
        skills: search,
      },
    });
    dispatch({
      type: ADVANCED_SEARCH,
      payload: response.data,
    });
  } catch (err) {
    dispatch(SetError(err.response.data.err));
  }
};

export const SearchUserProfileById = (id) => async (dispatch) => {
  try {
    SetToken(localStorage.getItem("companyToken"));
    const response = await axios.get(`/profile/${id}`);
    dispatch({
      type: COMPANY_WATCH_USER_PROFILE,
      payload: response.data,
    });
  } catch (err) {
    dispatch(SetError(err.response.data.err));
  }
};

export const UserGithubRepos = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/profile/${id}/githubRepos`);
    const data = response.data;
    dispatch({
      type: COMPANY_WATCH_USER_GITHUB_REPOS,
      payload: data,
    });
  } catch (err) {
    dispatch(SetError(err.response.data.err));
  }
};

export const UserCodeforceRating = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/profile/${id}/codeforceRatings`);
    const data = response.data;
    dispatch({
      type: COMPANY_WATCH_USER_CODEFORCE_RATING,
      payload: data,
    });
  } catch (err) {
    dispatch(SetError(err.response.data.err));
  }
};

export const createJobPost = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/job/jobPost", data);
    dispatch({
      type: CREATE_JOB_POST,
      payload: response.data,
    });
  } catch (err) {
    dispatch(SetError(err.response.data.err));
  }
};
export const fetchMyPosts=()=>async dispatch=>{
    try{
   const response=await axios.get('/job/myJobsPost');
    dispatch({
        type:COMPANY_ALL_JOB_POST,
        payload:response.data
    })
    }catch(err){
        console.log(err.response.data.err);
    }
}
