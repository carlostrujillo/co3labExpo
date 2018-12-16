import { put, call, fork, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/types';
import * as loginApis from '../services/loginApis';
import { setUserInfo } from '../actions/loginActions';
//import { setToken } from '../services/api';


export function getDetails(token) {
    return fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`)
    .then(response => response.json());
}
export  function* login(action) {
 try {
    debugger;   
    const userInfo = yield call(getDetails, actions.params);
    debugger;
    yield put(types.SET_USER_INFO, userInfo);

 } catch (error) {
    action.onError(error)
 }
}

export function* watchLogin() {
    yield takeLatest(types.LOGIN, login)
}

export function* fetchUserInfo(action) {
    try {
        const data = yield call(loginApis.fetchUserInfo)
        action.onSuccess(data.data)
        yield put(setUserInfo(data.data))
    } catch (error) {
        action.onError(error)
    }
}

export function* watchFetchUserInfo() {
    yield takeLatest(types.FETCH_USER_INFO, fetchUserInfo)
}