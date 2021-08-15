/* eslint-disable prettier/prettier */

import { actionTypes } from '../action/authAction';

const initialState = {
    account: {
        id: '',
        name: '',
        telphone: '',
        email: '',
        image: '',
        refresh_token: '',
        project_id: '',
        confirmation: false,
    },
    error: '',
    success: false,
    loading: false,
    credentials: {
        name: '',
        telphone: '',
        email: '',
        image: '',
        password: '',
    },
    idCreate: '',
};

export const authReducer = (state = initialState, { type, payload }: any) => {
    switch (type) {

    case actionTypes.CHANGE:
        return {
            ...state,
            account: payload,
        };
    case actionTypes.CREATE:
        return {
            ...state,
            credentials: payload,
        };
    case actionTypes.CREATENOW:
        return {
            ...state,
            idCreate: payload,
        };
    case actionTypes.ERROR:
        return {
            ...state,
            error: payload,
        };
    case actionTypes.SUCCESS:
        return {
            ...state,
            success: payload,
        };
    case actionTypes.LOADING:
        return {
            ...state,
            loading: payload,
        };

    default:
        return state;
    }
};
