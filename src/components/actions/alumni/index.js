import axios from 'axios';
import {ALUMNI_SIGN_IN,ALUMNI_AUTH_FAIL,ALUMNI_REGISTRATION_SUCCESS,ALUMNI_REGISTRATION_FAIL,
    ALUMNI_SIGN_OUT,CREATE_USER_BLOG_COMMENT_BY_ALUMNI,CREATE_ALUMNI_BLOG_COMMENT_BY_ALUMNI,
    ALUMNI_CREATE_PROFILE,ALUMNI_OWN_PROFILE,ALUMNI_PROFILE_FAILED,GET_ALUMNI_PROFILE_PIC,
    CREATE_ALUMNI_BLOG,UPLOAD_PERCENTAGE,FETCH_USER_BLOG,FETCH_USER_BLOGS,CREATE_ALUMNI_EDUCATION,
    CREATE_ALUMNI_EXPERIENCE,GET_ALUMNI_GITHUBREPOS,GET_ALUMNI_CODEFORCERATINGS,FETCH_ALUMNI_BLOG,
    FETCH_ALUMNI_BLOGS,FETCH_USER_BLOG_COMMENTS,FETCH_ALUMNI_BLOG_COMMENTS,POST_ALUMNI_PROFILE_PIC,
    SEARCH_USER,WATCH_USER_PROFILE,WATCH_USER_GITHUB_REPOS,WATCH_USER_CODEFORCE_RATING,CLEAR_EVERYTHING

} from '../Type';
import {SetError} from '../Error/index'
import { SetToken } from '../utility/SetToken';

export const AlumniSignIn = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    try {
        const body = JSON.stringify(email, password);
        const response = await axios.post('/alumni/login', body, config);
        dispatch({
            type: ALUMNI_SIGN_IN,
            payload: response.data
        })
    } catch (err) {
        dispatch(SetError(err.response.data.err));
        dispatch({
            type: ALUMNI_AUTH_FAIL
        })
    }
}

export const AlumniRegistration = (name, email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    }
    const body = JSON.stringify(name, email, password);
    try {
        const response = await axios.post('/temporary/alumni/signup', body, config);
        dispatch({
            type: ALUMNI_REGISTRATION_SUCCESS,
            payload: response.data,
        })
    } catch (err) {
        dispatch({
            type: ALUMNI_REGISTRATION_FAIL
        })
    }
}

export const AlumniSignOut = () => async dispatch => {
    try {
        await axios.get('/alumni/logout');
        dispatch({
            type: ALUMNI_SIGN_OUT,
        })
    }
    catch (err) {
        dispatch({
            type: ALUMNI_SIGN_OUT
        })
        dispatch({
            type:CLEAR_EVERYTHING
        })
    }
}

export const CreateAlumniProfile = data => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }
        const body = JSON.stringify(data);
        const response = await axios.post('/profile/alumni/me', body, config);
        dispatch({
            type: ALUMNI_CREATE_PROFILE,
            payload: response.data
        })
    } catch (err) {
         console.log(err.response.data);
    }
}

export const AlumniOwnProfile = () => async dispatch => {
    try {
        const response = await axios.get('/profile/alumni/me');
        dispatch({
            type: ALUMNI_OWN_PROFILE,
            payload: response.data
        })
    } catch (err) {
        dispatch({
            type:ALUMNI_PROFILE_FAILED,
        })
    }
}

export const AlumniOwnProfilePic = () => async dispatch => {
    try {
        const response = await axios.get('/profile/alumni/profile/me/profilePic');
        dispatch({
            type: GET_ALUMNI_PROFILE_PIC,
            payload: response.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const UploadAlumniProfilePic = data => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }
        const response = await axios.post('/profile/alumni/profile/me', data, {
            onUploadProgress: ProgressEvent => {
                console.log('uploaded ' + (ProgressEvent.loaded / ProgressEvent.total) * 100 + "%")
            }
        }, config);
        dispatch({
            type:POST_ALUMNI_PROFILE_PIC,
            payload: response.data
        })

    } catch (err) {
        console.log(err)
    }
}

export const CreateAlumniBlog = (fd) => async dispatch => {
    try {
        const response = await axios({
            method: 'post',
            url: '/blog/alumni',
            data: fd,
            headers: {
                'Content-Type': `multipart/form-data;`,
            },
            onUploadProgress: (ProgressEvent) => {
                dispatch({
                    type: UPLOAD_PERCENTAGE,
                    payload: Math.round(((ProgressEvent.loaded) / ProgressEvent.total) * 100)
                })
            }
        });
        dispatch({
            type: CREATE_ALUMNI_BLOG,
            payload: response.data,
        })

    }catch (err) {
        const Error=err.response.data.err;
        dispatch(SetError(Error));
    }
}

export const fetchUserBlogs = (page) => async dispatch => {
    try {
        if (!page) {
            page = 0;
        }
        const response = await axios.get('/blog/user/all/alumni', {
            params: {
                page: page
            }
        });
        dispatch({
            type: FETCH_USER_BLOGS,
            payload: response.data,
        })
    } catch (err) {
        console.log(err);
    }
}

export const fetchUserBlogById = (id) => async dispatch => {
    try {
        const response = await axios.get(`/blog/user/${id}/alumni`);
        dispatch({
            type: FETCH_USER_BLOG,
            payload: response.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const fetchAlumniBlogs=()=>async dispatch=>{
    try{
         const response=await axios.get('/blog/alumni/all/alumni');
         dispatch({
             type:FETCH_ALUMNI_BLOGS,
             payload:response.data
         })
    }catch(err){
        console.log(err);
    }
}

export const fetchAlumniBlogById=(id)=>async dispatch=>{
try{
    SetToken(localStorage.getItem('alumniToken'))
    const response=await axios.get(`/blog/alumni/${id}/alumni`);
    dispatch({
          type:FETCH_ALUMNI_BLOG,
          payload:response.data
    })
}catch(err){
    console.log(err.response.data);
}
}

export const CreateUserBlogCommentByAlumni = (id, comment) => async dispatch => {
    try {
        const response = await axios.post(`/blog/user/${id}/Alumnicomment`,{
            comment:comment
        });
        dispatch({
            type: CREATE_USER_BLOG_COMMENT_BY_ALUMNI,
            payload: response.data
        })
    } catch (err) {
        SetError(err.response.data.err);
    }
}

export const CreateAlumniBlogCommentByAlumni = (id, comment) => async dispatch => {
    try {
        const response = await axios.post(`/blog/Alumni/${id}/Alumnicomment`,{
            comment:comment
        });
        dispatch({
            type: CREATE_ALUMNI_BLOG_COMMENT_BY_ALUMNI,
            payload: response.data
        })
    } catch (err) {
        SetError(err.response.data.err);
    }
}

export const fetchUserBlogComments = (id) => async dispatch => {
    try {
        const response = await axios.get(`/blog/user/${id}/allComments/alumni`);
        dispatch({
            type: FETCH_USER_BLOG_COMMENTS,
            payload: response.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const fetchAlumniBlogComments = (id) => async dispatch => {
    try {
        const response = await axios.get(`/blog/alumni/${id}/allComments/alumni`);
        dispatch({
            type: FETCH_ALUMNI_BLOG_COMMENTS,
            payload: response.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const addAlumniEducation = (info) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    }
    const body = JSON.stringify(info);
    try {
        const response = await axios.post('/profile/alumni/education', body, config);
        dispatch({
            type:CREATE_ALUMNI_EDUCATION ,
            payload: response.data
        })

    }
    catch (err) {
        dispatch(SetError(err.response.data.err));
    }
}

export const addAlumniExperience = (info) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'Application/json'
        }
    }
    const body = JSON.stringify(info);
    try {
        const response = await axios.post('/profile/alumni/experience', body, config);
        dispatch({
            type: CREATE_ALUMNI_EXPERIENCE,
            payload: response.data
        })
    }
    catch (err) {
        dispatch(SetError(err.response.data.err));
    }
}


export const updateAlumniInfo = (info) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify(info);
    try {
        const response = await axios.post('/profile/alumni/me', body, config);
        dispatch({
            type: ALUMNI_CREATE_PROFILE,
            payload: response.data
        })

    } catch (err) {
        dispatch(SetError(err.response.data.err));
    }
}

export const AlumnigithubRepo = () => async dispatch => {
    try {
        const response = await axios.get('/profile/alumni/github');
        dispatch({
            type:GET_ALUMNI_GITHUBREPOS,
            payload: response.data
        })
    } catch (err) {
        console.log(err.response.data);
    }
}

export const AlumnicodeforceRatings = () => async dispatch => {
    try {   
        const response = await axios.get('/profile/alumni/cfRatings');
        dispatch({
            type:GET_ALUMNI_CODEFORCERATINGS,
            payload: response.data
        })
    }
    catch (err) {
        console.log(err.response.data.err);
    }
}

export const searchUsers=(search)=>async dispatch=>{
   try{
     const response=await axios.get('/search/user',{
         params:{
             search:search
         }
     })
     dispatch({
         type:SEARCH_USER,
         payload:response.data
     })
   }catch(err){
       console.log(err.response.data.err);
   }
}

export const SearchUserProfileById=(id)=>async dispatch=>{
    try{
        SetToken(localStorage.getItem('alumniToken'));
         const response=await axios.get(`/alumni/watch/user/${id}`);
         dispatch({
             type:WATCH_USER_PROFILE,
             payload:response.data
         })
    }catch(err){
        dispatch(SetError(err.response.data.err));
    }
}

export const UserGithubRepos=(id)=>async dispatch=>{
    try{
        SetToken(localStorage.getItem('alumniToken'));
      const response=await axios.get(`/alumni/watch/user/${id}/github`);
      const data=response.data;
      dispatch({
          type:WATCH_USER_GITHUB_REPOS,
          payload:data
      })
    }catch(err){
        dispatch(SetError(err.response.data.err));
    }
}
export const UserCodeforceRating=(id)=>async dispatch=>{
    try{
        SetToken(localStorage.getItem('alumniToken'));
       const response=await axios.get(`/alumni/watch/user/${id}/cfRatings`);
      const data=response.data;
      dispatch({
          type:WATCH_USER_CODEFORCE_RATING,
          payload:data
      })
    }catch(err){
        dispatch(SetError(err.response.data.err));
    }
}