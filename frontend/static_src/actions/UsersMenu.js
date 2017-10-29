import {CALL_API, getJSON} from 'redux-api-middleware';
import {normalize} from 'normalizr';

// import { post } from './../utils/schemas';

export const CHANGE_ITEM = 'CHANGE_ITEM';


export const changeItem = (item, name) => {
    return {
        type: CHANGE_ITEM,
        payload: name,
    }
};