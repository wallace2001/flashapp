/* eslint-disable prettier/prettier */

import { HttpAuth } from '../../config/http';
import { changeLoading } from './loadingAction';

interface PropsFolderCreate{
    name: string;
    project_id: string;
    file_id?: string;
    folders?: string;
    folder_id?: string;
}

export const actionTypes = {
    CHANGE: 'CHANGE_FOLDER',
    ERROR: 'ERROR_FOLDER',
    SUCCESS: 'SUCCESS_FOLDER',
    LOADING: 'LOADING_FOLDER',
    SEARCH: 'LOADING_SEARCH',
};

export const change = (payload: any) => ({
    type: actionTypes.CHANGE,
    payload,
});

export const error = (payload: any) => ({
    type: actionTypes.ERROR,
    payload,
});

export const success = (payload: any) => ({
    type: actionTypes.SUCCESS,
    payload,
});

export const loading = (payload: any) => ({
    type: actionTypes.LOADING,
    payload,
});

export const search = (payload: any) => ({
    type: actionTypes.SEARCH,
    payload,
});

export const createFolder = (data: PropsFolderCreate) => async(dispatch: any) => {
    dispatch(changeLoading(true));
    dispatch(loading(true));
    console.log(data);
    await HttpAuth.post('/folder_create', data).then(res => {
        dispatch(changeLoading(false));
        dispatch(loading(false));

        if (!res.data.error){
            dispatch(requestFolder(data.project_id));
            dispatch(error(''));
            dispatch(success(true));
        } else {
            dispatch(error('Erro ao criar pasta'));
            dispatch(success(false));
        }
    });
};

export const requestFolder = (userId: string) => async(dispatch: any) => {
    dispatch(changeLoading(true));
    dispatch(loading(true));

    await HttpAuth.get(`/folders?project_id=${userId}`).then(res => {
        dispatch(changeLoading(false));
        dispatch(loading(false));

        if (!res.data.error){
            dispatch(change(res.data));
            dispatch(error(''));
            dispatch(success(true));
        } else {
            dispatch(error('Erro ao criar pasta'));
            dispatch(success(false));
        }
    });
};

export const deleteFolder = (id: string, userId: string) => async(dispatch: any) => {
    dispatch(changeLoading(true));
    dispatch(loading(true));

    await HttpAuth.delete(`/delete_folder?id=${id}`).then(res => {
        dispatch(changeLoading(false));
        dispatch(loading(false));

        if (!res.data.error){
            dispatch(requestFolder(userId));
            dispatch(error(''));
            dispatch(success(true));
        } else {
            dispatch(error('Erro ao deletar pasta'));
            dispatch(success(false));
        }
    });
};

export const searchFolder = (name: string) => async(dispatch: any) => {
    dispatch(loading(true));

    await HttpAuth.patch('/search_folder', {
        name,
    }).then(res => {
        dispatch(loading(false));

        if (!res.data.error){
            dispatch(search(res.data));
            dispatch(error(''));
            dispatch(success(true));
        } else {
            dispatch(error('Erro ao pesquisar pasta'));
            dispatch(success(false));
        }
    });
};
