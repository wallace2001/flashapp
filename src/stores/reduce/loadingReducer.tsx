/* eslint-disable prettier/prettier */

import { actionTypes } from '../action/loadingAction';

const initialState = {
    loading: false,
};

export const loadingReducer = (state = initialState, { type, payload }: any) => {
    switch (type) {

    case actionTypes.CHANGE:
        return {
            ...state,
            loading: payload,
        };

    default:
        return state;
    }
};
