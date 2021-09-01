
import {NO_USER,USER_AUTH_SUCCESS,USER_AUTH_FAIL,NO_COMPANY,COMPANY_AUTH_SUCCESS,COMPANY_AUTH_FAIL,
        NO_ALUMNI,ALUMNI_AUTH_SUCCESS,ALUMNI_AUTH_FAIL,NO_ADMIN,ADMIN_AUTH_SUCCESS,ADMIN_AUTH_FAIL
} from './Type';
import axios from 'axios';
import {SetToken} from './utility/SetToken'

export const loadUser = () => async dispatch => {
    if(localStorage.getItem('userToken')===null){
        dispatch({
            type: NO_USER
        })
    }
    if (localStorage.getItem('userToken')) {
        try {
            SetToken(localStorage.getItem('userToken'));
           
            const response = await axios.get('/user/me');
            dispatch({
                type: USER_AUTH_SUCCESS,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
            dispatch({
                type: USER_AUTH_FAIL
            })
        }
    }
    if(localStorage.getItem('companyToken')===null){
        dispatch({
            type: NO_COMPANY
        })
    }
    if (localStorage.getItem('companyToken')) {
        try {
            SetToken(localStorage.getItem('companyToken'));
            const response = await axios.get('/company/me',);
            dispatch({
                type: COMPANY_AUTH_SUCCESS,
                payload: response.data,
            })
        } catch (err) {
            console.log(err);
            dispatch({
                type: COMPANY_AUTH_FAIL
            })
        }
    }

    if(localStorage.getItem('alumniToken')===null){
        dispatch({
            type: NO_ALUMNI
        })
    }

    
    if (localStorage.getItem('alumniToken')) {
        try {
            SetToken(localStorage.getItem('alumniToken'));
            const response = await axios.get('/alumni/me',);
            dispatch({
                type: ALUMNI_AUTH_SUCCESS,
                payload: response.data,
            })
        } catch (err) {
            console.log(err);
            dispatch({
                type: ALUMNI_AUTH_FAIL
            })
        }
    }
    if(localStorage.getItem('adminToken')===null){
        dispatch({
            type: NO_ADMIN
        })
    }
    if (localStorage.getItem('adminToken')) {
        try {
            SetToken(localStorage.getItem('adminToken'));
            const response = await axios.get('/admin/me',);
            dispatch({
                type: ADMIN_AUTH_SUCCESS,
                payload: response.data,
            })
        } catch (err) {
            console.log(err);
            dispatch({
                type: ADMIN_AUTH_FAIL
            })
        }
    }
}