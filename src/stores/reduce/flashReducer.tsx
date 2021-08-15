/* eslint-disable prettier/prettier */

import { acionTypes } from '../action/flashAction';

const initialState = {
    progress: 1,
    flashDetails: {
        folder_id: '',
        sub_folder_id: '',
        question: '',
        response: '',
        photos: [],
    },
};

export const flashReducer = (state = initialState, { type, payload }: any) => {
    switch (type) {

    case acionTypes.CHANGE:
        return {
            ...state,
            progress: payload,
        };

    case acionTypes.CREATE:
        return {
            ...state,
            flashDetails: payload,
        };

    default:
        return state;
    }
};
