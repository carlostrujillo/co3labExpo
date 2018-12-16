import { combineReducers } from 'redux';
import loginReducers from './loginReducers';
import placeReducer from './placeReducer'


const allReducers = combineReducers({
    //login: loginReducers
    place: placeReducer
   
})
export default allReducers