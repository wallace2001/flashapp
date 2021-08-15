/* eslint-disable prettier/prettier */

import { actionTypes } from '../action/folderAction';

const initialState = {
    folders: [
        {
            id: '',
            name: '',
            project_id: '',
            file_id: [
                {
                    id: '',
                    question: '',
                    response: '',
                    images: [
                        {
                            id: '',
                            url: '',
                        },
                    ],
                },
            ],
            folders: [
                {
                    id: '',
                    name: '',
                    project_id: '',
                    file_id: [],
                    folders_id: [],
                },
            ],

        },
    ],
    foldersSearch: [
        {
            id: '',
            name: '',
            project_id: '',
            file_id: [
                {
                    id: '',
                    question: '',
                    response: '',
                    images: [
                        {
                            id: '',
                            url: '',
                        },
                    ],
                },
            ],
            folders: [
                {
                    id: '',
                    name: '',
                    project_id: '',
                    file_id: [],
                    folders_id: [],
                },
            ],

        },
    ],
    error: '',
    loading: false,
    success: false,
};

export const folderReducer = (state = initialState, { type, payload }: any) => {
    switch (type) {

    case actionTypes.CHANGE:
        return {
            ...state,
            folders: payload,
        };

    case actionTypes.LOADING:
        return {
            ...state,
            loading: payload,
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

    case actionTypes.SEARCH:
        return {
            ...state,
            foldersSearch: payload,
        };

    default:
        return state;
    }
};
